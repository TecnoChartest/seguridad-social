import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoBannerComponent } from '../../shared/components/demo-banner.component';
import { PIPELINE_CO } from '../../data/pipeline.mock';

interface Tarjeta {
  id: string;
  nombre: string;
  servicio: string;
  depto: string;
  urgente: boolean;
}

interface Columna {
  id: string;
  titulo: string;
  color: string;
  tarjetas: Tarjeta[];
}

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [CommonModule, DemoBannerComponent],
  template: `
    <app-demo-banner />

    <div class="min-h-screen bg-cream">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header class="mb-8">
          <h1 class="font-serif text-3xl text-primary">Pipeline de Leads</h1>
          <p class="text-slate-600 text-sm mt-1">
            Arrastra las tarjetas entre columnas para cambiar el estado (demo visual).
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          @for (col of columnas(); track col.id) {
            <div
              class="rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col"
              (dragover)="onDragOver($event)"
              (drop)="onDrop($event, col.id)"
            >
              <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span
                    class="w-2.5 h-2.5 rounded-full"
                    [class.bg-slate-400]="col.color === 'slate'"
                    [class.bg-blue-500]="col.color === 'blue'"
                    [class.bg-amber-500]="col.color === 'amber'"
                    [class.bg-green-500]="col.color === 'green'"
                  ></span>
                  <h2 class="font-semibold text-primary text-sm">{{ col.titulo }}</h2>
                </div>
                <span
                  class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
                >
                  {{ col.tarjetas.length }}
                </span>
              </div>

              <div class="p-3 space-y-2 min-h-[120px] flex-1">
                @for (t of col.tarjetas; track t.id) {
                  <article
                    draggable="true"
                    (dragstart)="onDragStart(t, col.id)"
                    (click)="seleccionada.set(t)"
                    class="p-3 rounded-xl bg-white border border-slate-200 hover:border-gold
                                  hover:shadow-md transition cursor-grab active:cursor-grabbing"
                  >
                    <div class="flex items-start justify-between gap-2">
                      <p class="font-semibold text-sm text-primary">{{ t.nombre }}</p>
                      @if (t.urgente) {
                        <span
                          class="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700"
                        >
                          URGENTE
                        </span>
                      }
                    </div>
                    <p class="text-xs text-slate-500 mt-1">{{ t.servicio }}</p>
                    <p class="text-xs text-slate-400">{{ t.depto }}</p>
                  </article>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Panel lateral de detalle -->
    @if (seleccionada(); as t) {
      <div
        class="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm"
        (click)="seleccionada.set(null)"
      >
        <aside
          class="w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
          (click)="$event.stopPropagation()"
          style="animation: slideUp .25s ease-out"
        >
          <div
            class="sticky top-0 bg-primary text-white px-6 py-5 flex items-center justify-between"
          >
            <div>
              <p class="text-xs opacity-70">Lead {{ t.id }}</p>
              <h3 class="font-serif text-xl">{{ t.nombre }}</h3>
            </div>
            <button (click)="seleccionada.set(null)" class="p-2 rounded-lg hover:bg-white/10">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-5">
            <div>
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Servicio</p>
              <p class="text-primary mt-1">{{ t.servicio }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Departamento
              </p>
              <p class="text-primary mt-1">{{ t.depto }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Urgencia</p>
              <p class="text-primary mt-1">
                {{ t.urgente ? 'Sí — plazo abierto' : 'Sin urgencia' }}
              </p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notas</p>
              <p class="text-slate-600 text-sm mt-1">
                Cliente contactado por WhatsApp. Pendiente de enviar historia laboral y
                certificaciones médicas. Cita virtual agendada para revisión preliminar.
              </p>
            </div>

            <div class="pt-4 border-t border-slate-100 flex gap-2">
              <button
                class="flex-1 py-2.5 rounded-xl bg-gold text-primary font-semibold text-sm hover:bg-gold-dark transition"
              >
                Llamar
              </button>
              <button
                class="flex-1 py-2.5 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition"
              >
                Agendar cita
              </button>
            </div>
          </div>
        </aside>
      </div>
    }
  `,
})
export class PipelineComponent {
  columnas = signal<Columna[]>(JSON.parse(JSON.stringify(PIPELINE_CO)) as Columna[]);
  seleccionada = signal<Tarjeta | null>(null);

  private dragging: { tarjeta: Tarjeta; origen: string } | null = null;

  onDragStart(t: Tarjeta, origen: string) {
    this.dragging = { tarjeta: t, origen };
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDrop(e: DragEvent, destino: string) {
    e.preventDefault();
    if (!this.dragging || this.dragging.origen === destino) return;

    this.columnas.update((cols) => {
      const copy = cols.map((c) => ({ ...c, tarjetas: [...c.tarjetas] }));
      const origen = copy.find((c) => c.id === this.dragging!.origen);
      const dest = copy.find((c) => c.id === destino);
      if (!origen || !dest) return cols;

      const idx = origen.tarjetas.findIndex((x) => x.id === this.dragging!.tarjeta.id);
      if (idx > -1) {
        const [movida] = origen.tarjetas.splice(idx, 1);
        dest.tarjetas.push(movida);
      }
      return copy;
    });

    this.dragging = null;
  }
}
