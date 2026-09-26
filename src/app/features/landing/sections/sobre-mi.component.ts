import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  template: `
    <section id="sobre-mi" class="py-24 bg-cream">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div
          class="aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300
                    flex items-center justify-center text-slate-500 shadow-md"
        >
          <p class="text-sm">Foto del abogado (placeholder)</p>
        </div>
        <div>
          <p class="text-xs font-semibold text-gold uppercase tracking-widest">Sobre mí</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-primary mt-3">
            Dr. Andrés Felipe Vargas
          </h2>
          <p class="text-slate-600 mt-5 leading-relaxed">
            Abogado especialista en Derecho Laboral y Seguridad Social, con más de 15 años
            acompañando a trabajadores y familias colombianas ante Colpensiones, ADRES, la UGPP y
            las Juntas de Calificación de Invalidez.
          </p>
          <ul class="mt-6 space-y-3 text-sm text-slate-700">
            <li class="flex gap-2">
              <span class="text-gold">✓</span> T.P. 245.876 — Consejo Superior de la Judicatura
            </li>
            <li class="flex gap-2">
              <span class="text-gold">✓</span> Especialización en Derecho Laboral — Universidad
              Externado
            </li>
            <li class="flex gap-2">
              <span class="text-gold">✓</span> Miembro de la Asociación Colombiana de Abogados
              Laboralistas
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class SobreMiComponent {}
