import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemoBannerComponent } from '../../shared/components/demo-banner.component';
import { PLANTILLAS } from '../../data/plantillas-escritos.mock';

@Component({
  selector: 'app-escritos',
  standalone: true,
  imports: [CommonModule, FormsModule, DemoBannerComponent],
  template: `
    <app-demo-banner />

    <div class="min-h-screen bg-cream">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header class="mb-8">
          <h1 class="font-serif text-3xl text-primary">Generación de escritos</h1>
          <p class="text-slate-600 text-sm mt-1">
            Selecciona una plantilla y autocompleta con los datos del expediente.
          </p>
        </header>

        <div class="grid lg:grid-cols-[320px_1fr] gap-6">
          <!-- Selector de plantillas -->
          <aside class="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Plantillas disponibles
            </p>
            <ul class="space-y-2">
              @for (p of plantillas; track p.id) {
                <li>
                  <button
                    (click)="seleccionar(p.id)"
                    class="w-full text-left px-3 py-3 rounded-xl border transition"
                    [class.border-gold]="seleccionadaId() === p.id"
                    [class.bg-gold]="seleccionadaId() === p.id"
                    [class.bg-opacity-10]="seleccionadaId() === p.id"
                    [class.border-slate-200]="seleccionadaId() !== p.id"
                    [class.hover:border-slate-300]="seleccionadaId() !== p.id"
                  >
                    <p class="text-sm font-semibold text-primary">{{ p.titulo }}</p>
                    <p class="text-xs text-slate-500 mt-0.5">{{ p.categoria }}</p>
                  </button>
                </li>
              }
            </ul>
          </aside>

          <!-- Preview -->
          <section class="rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col">
            <div
              class="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3"
            >
              <div class="min-w-0">
                <p class="text-xs text-slate-500">Vista previa</p>
                <p class="font-semibold text-primary truncate">{{ plantillaActual()?.titulo }}</p>
              </div>
              <div class="flex gap-2 shrink-0">
                <button
                  (click)="descargar()"
                  class="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50 transition"
                >
                  Descargar PDF
                </button>
                <button
                  (click)="enviarAFirma()"
                  class="px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition"
                >
                  Enviar a firma
                </button>
              </div>
            </div>

            <div class="p-6 flex-1">
              <pre class="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">{{
                cuerpoPreview()
              }}</pre>
            </div>

            @if (toast()) {
              <div class="px-6 py-3 border-t border-slate-100 bg-green-50 text-green-700 text-sm">
                {{ toast() }}
              </div>
            }
          </section>
        </div>
      </div>
    </div>
  `,
})
export class EscritosComponent {
  plantillas = PLANTILLAS;
  seleccionadaId = signal<string>(PLANTILLAS[0].id);
  toast = signal<string>('');

  // Datos mock del expediente para autocompletar
  private datosMock: Record<string, string> = {
    nombre: 'María Fernanda Ríos',
    cedula: '43.123.456',
    direccion: 'Cra. 45 # 12-34, Medellín, Antioquia',
    email: 'mf.rios@example.com',
    dictamen: 'JNCI-2024-0456',
    fechaDictamen: '18 de junio de 2024',
    pcl: '62',
    semanas: '780',
    fechaSolicitud: '10 de marzo de 2024',
    radicado: '2024-0587',
    tipoPension: 'invalidez',
    hechos:
      '1. El demandante fue calificado con PCL del 62% por la Junta Nacional de Calificación de Invalidez.\n' +
      '2. Cotizó 780 semanas al Sistema General de Seguridad Social.\n' +
      '3. Colpensiones negó la prestación mediante Resolución SUB-123456 del 5 de julio de 2024.',
  };

  plantillaActual = computed(() => this.plantillas.find((p) => p.id === this.seleccionadaId()));

  cuerpoPreview = computed(() => {
    const plantilla = this.plantillaActual();
    if (!plantilla) return '';
    let texto = plantilla.cuerpo;
    for (const [clave, valor] of Object.entries(this.datosMock)) {
      texto = texto.replace(new RegExp(`{{${clave}}}`, 'g'), valor);
    }
    return texto;
  });

  seleccionar(id: string) {
    this.seleccionadaId.set(id);
    this.toast.set('');
  }

  descargar() {
    this.mostrarToast('PDF generado (demo — sin descarga real).');
  }

  enviarAFirma() {
    this.mostrarToast('Documento enviado a firma electrónica (demo).');
  }

  private mostrarToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(''), 3000);
  }
}
