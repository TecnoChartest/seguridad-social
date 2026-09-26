import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section
      class="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#12325E] to-[#1B4A80] text-white"
    >
      <!-- Patrón geométrico SVG -->
      <svg
        class="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="white" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A961]/15
                         text-[#C9A961] text-xs font-semibold tracking-wide uppercase border border-[#C9A961]/30"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-[#C9A961]"></span>
              Abogado especialista en Seguridad Social
            </span>

            <h1
              class="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-semibold"
            >
              Tu pensión, en las <br class="hidden sm:block" />
              <span class="text-[#C9A961] italic">mejores manos</span>.
            </h1>

            <p class="mt-6 text-lg text-slate-200/90 max-w-2xl leading-relaxed">
              Defendemos tus derechos ante
              <strong class="text-white">Colpensiones, ADRES, la UGPP y fondos privados</strong>.
              Más de 15 años acompañando a trabajadores y familias colombianas en el reconocimiento
              de sus prestaciones.
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#contacto"
                class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#C9A961]
                        text-[#0B1F3A] font-semibold hover:bg-[#b8955a] transition shadow-lg hover:shadow-xl
                        transform hover:-translate-y-0.5"
              >
                Solicitar consulta gratuita
              </a>
              <a
                href="#herramientas"
                class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl
                        border border-white/25 text-white font-semibold hover:bg-white/10 transition"
              >
                Ver calculadoras
              </a>
            </div>

            <dl class="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
              @for (badge of badges; track badge.label) {
                <div>
                  <dt class="font-serif text-2xl sm:text-3xl text-[#C9A961] font-semibold">
                    {{ badge.valor }}
                  </dt>
                  <dd class="text-xs sm:text-sm text-slate-300 mt-1">{{ badge.label }}</dd>
                </div>
              }
            </dl>
          </div>

          <!-- Placeholder elegante del abogado -->
          <div class="lg:col-span-5 relative">
            <div
              class="relative aspect-[4/5] rounded-3xl overflow-hidden
                        bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl ring-1 ring-white/10"
            >
              <div
                class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8"
              >
                <svg
                  class="w-24 h-24 mb-4 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
                <p class="text-sm font-medium">Foto del abogado</p>
                <p class="text-xs opacity-70">(placeholder 4:5)</p>
              </div>
              <div
                class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B1F3A] to-transparent"
              >
                <p class="font-serif text-lg text-white">Dr. Andrés Felipe Vargas</p>
                <p class="text-xs text-slate-300">
                  T.P. 245.876 — C.S. de la J. · Especialista en Derecho Laboral y Seguridad Social
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  badges = [
    { valor: '+1.200', label: 'Casos ganados' },
    { valor: '15+', label: 'Años de experiencia' },
    { valor: '24h', label: 'Respuesta hábil' },
  ];
}
