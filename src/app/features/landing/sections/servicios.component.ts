import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICIOS } from '../../../data/servicios.mock';
import { Servicio } from '../../../core/models/servicio.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="servicios" class="py-24 bg-cream">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="max-w-2xl mb-14">
          <p class="text-xs font-semibold text-gold uppercase tracking-widest">Servicios</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-primary mt-3">
            Áreas en las que te defendemos
          </h2>
          <p class="text-slate-600 mt-4">
            Especialización exclusiva en Seguridad Social colombiana. Sin dispersión, sin
            improvisación.
          </p>
        </header>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (s of servicios; track s.id) {
            <article
              (click)="abierto.set(s)"
              class="group cursor-pointer rounded-2xl bg-white border border-slate-100
                            p-7 shadow-sm hover:shadow-lg hover:border-gold transition-all"
            >
              <div
                class="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5
                          group-hover:bg-gold group-hover:text-primary transition"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                  />
                </svg>
              </div>
              <h3 class="font-serif text-xl text-primary">{{ s.titulo }}</h3>
              <p class="text-sm text-slate-600 mt-2 leading-relaxed">{{ s.resumen }}</p>
              <span
                class="inline-block mt-5 text-sm font-semibold text-primary group-hover:text-gold transition"
              >
                Saber más →
              </span>
            </article>
          }
        </div>
      </div>
    </section>

    @if (abierto(); as s) {
      <div
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        (click)="abierto.set(null)"
      >
        <div
          class="max-w-2xl w-full bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
          (click)="$event.stopPropagation()"
        >
          <div
            class="sticky top-0 bg-primary text-white px-6 py-5 flex items-center justify-between"
          >
            <h3 class="font-serif text-xl">{{ s.titulo }}</h3>
            <button (click)="abierto.set(null)" class="p-2 rounded-lg hover:bg-white/10">
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
          <div class="p-6 space-y-5 text-sm text-slate-700">
            <p class="leading-relaxed">{{ s.detalle }}</p>
            <div>
              <p class="font-semibold text-primary mb-2">Requisitos</p>
              <ul class="space-y-1 list-disc list-inside">
                @for (r of s.requisitos; track r) {
                  <li>{{ r }}</li>
                }
              </ul>
            </div>
            <div>
              <p class="font-semibold text-primary mb-1">Plazos</p>
              <p>{{ s.plazo }}</p>
            </div>
            <a
              href="#contacto"
              (click)="abierto.set(null)"
              class="block text-center py-3 rounded-xl bg-gold text-primary font-semibold hover:bg-gold-dark transition"
            >
              Consultar mi caso
            </a>
          </div>
        </div>
      </div>
    }
  `,
})
export class ServiciosComponent {
  servicios = SERVICIOS;
  abierto = signal<Servicio | null>(null);
}
