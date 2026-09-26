import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TESTIMONIOS } from '../../../data/testimonios.mock';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-primary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-xs font-semibold text-gold uppercase tracking-widest">Testimonios</p>
        <h2 class="font-serif text-4xl sm:text-5xl mt-3">Casos reales, resultados reales</h2>

        <div class="mt-14 min-h-[220px]">
          @if (actual(); as t) {
            <blockquote class="space-y-5">
              <p class="text-lg sm:text-xl italic leading-relaxed text-slate-100">
                "{{ t.texto }}"
              </p>
              <div class="flex items-center justify-center gap-3 mt-6">
                <span
                  class="w-12 h-12 rounded-full bg-gold text-primary font-semibold
                             flex items-center justify-center"
                  >{{ t.avatar }}</span
                >
                <div class="text-left">
                  <p class="font-semibold">{{ t.nombre }}</p>
                  <p class="text-xs text-slate-300">{{ t.ciudad }} · {{ t.servicio }}</p>
                </div>
              </div>
              <p class="text-sm text-gold">→ {{ t.resultado }}</p>
            </blockquote>
          }
        </div>

        <div class="flex justify-center gap-2 mt-8">
          @for (t of testimonios; track t.nombre; let i = $index) {
            <button
              (click)="ir(i)"
              class="w-2.5 h-2.5 rounded-full transition"
              [class.bg-gold]="i === indice()"
              [class.bg-white/30]="i !== indice()"
            ></button>
          }
        </div>
      </div>
    </section>
  `,
})
export class TestimoniosComponent implements OnDestroy {
  testimonios = TESTIMONIOS;
  indice = signal(0);
  actual = () => this.testimonios[this.indice()];

  private timer = setInterval(() => this.siguiente(), 6000);

  ir(i: number) {
    this.indice.set(i);
  }
  siguiente() {
    this.indice.update((i) => (i + 1) % this.testimonios.length);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
