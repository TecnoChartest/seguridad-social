import { Component } from '@angular/core';

@Component({
  selector: 'app-proceso',
  standalone: true,
  template: `
    <section class="py-24 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="max-w-2xl mb-14">
          <p class="text-xs font-semibold text-gold uppercase tracking-widest">Cómo trabajo</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-primary mt-3">
            Un proceso claro, sin sorpresas
          </h2>
        </header>

        <ol class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (p of pasos; track p.n; let i = $index) {
            <li class="relative rounded-2xl border border-slate-100 bg-cream p-6">
              <span
                class="w-10 h-10 rounded-full bg-primary text-gold font-serif text-lg
                           flex items-center justify-center mb-4"
                >{{ p.n }}</span
              >
              <h3 class="font-serif text-lg text-primary">{{ p.titulo }}</h3>
              <p class="text-sm text-slate-600 mt-2">{{ p.desc }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class ProcesoComponent {
  pasos = [
    {
      n: 1,
      titulo: 'Contacto y análisis gratuito',
      desc: 'Revisamos tu caso sin coste y te decimos si es viable.',
    },
    {
      n: 2,
      titulo: 'Recopilación de documentación',
      desc: 'Historia laboral, certificaciones médicas y resoluciones.',
    },
    {
      n: 3,
      titulo: 'Reclamación y demanda',
      desc: 'Radicamos ante Colpensiones o demandamos ante la Jurisdicción Laboral.',
    },
    {
      n: 4,
      titulo: 'Resolución y seguimiento',
      desc: 'Te acompañamos hasta el reconocimiento y pago efectivo.',
    },
  ];
}
