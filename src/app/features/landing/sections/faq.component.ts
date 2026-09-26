import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQS } from '../../../data/faq.mock';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-cream">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-12">
          <p class="text-xs font-semibold text-gold uppercase tracking-widest">
            Preguntas frecuentes
          </p>
          <h2 class="font-serif text-4xl sm:text-5xl text-primary mt-3">Resolvemos tus dudas</h2>
        </header>

        <div class="space-y-3">
          @for (f of faqs; track f.pregunta; let i = $index) {
            <div class="rounded-2xl bg-white border border-slate-100 overflow-hidden">
              <button
                (click)="toggle(i)"
                class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
              >
                <span class="font-semibold text-primary pr-4">{{ f.pregunta }}</span>
                <svg
                  class="w-5 h-5 shrink-0 text-gold transition-transform"
                  [class.rotate-180]="abierto() === i"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              @if (abierto() === i) {
                <div class="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                  {{ f.respuesta }}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqComponent {
  faqs = FAQS;
  abierto = signal<number | null>(null);
  toggle(i: number) {
    this.abierto.set(this.abierto() === i ? null : i);
  }
}
