import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimadorInvalidezComponent } from '../../calculadoras/estimador-invalidez.component';

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [CommonModule, EstimadorInvalidezComponent],
  template: `
    <section id="herramientas" class="py-24 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="max-w-2xl mb-12">
          <p class="text-xs font-semibold text-gold uppercase tracking-widest">Herramientas</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-primary mt-3">
            Calcula tu prestación en 2 minutos
          </h2>
          <p class="text-slate-600 mt-4">
            Estimaciones orientativas, sin registro. No sustituyen el dictamen oficial.
          </p>
        </header>

        <div class="rounded-2xl border border-slate-200 bg-cream p-6 sm:p-8">
          <app-estimador-invalidez />
        </div>
      </div>
    </section>
  `,
})
export class HerramientasComponent {}
