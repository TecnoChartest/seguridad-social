import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-[#0B1F3A] text-slate-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <!-- Marca -->
          <div class="sm:col-span-2 lg:col-span-1">
            <p class="font-serif text-2xl text-white tracking-tight">
              Lex Social <span class="text-[#C9A961]">Colombia</span>
            </p>
            <p class="text-sm mt-4 leading-relaxed text-slate-400 max-w-xs">
              Despacho especializado en Seguridad Social. Colpensiones, ADRES, UGPP y fondos
              privados.
            </p>
            <div class="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                class="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C9A961] hover:text-[#0B1F3A] text-slate-300 flex items-center justify-center transition"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4V9z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                class="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C9A961] hover:text-[#0B1F3A] text-slate-300 flex items-center justify-center transition"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                class="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C9A961] hover:text-[#0B1F3A] text-slate-300 flex items-center justify-center transition"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Servicios -->
          <div>
            <p class="font-semibold text-white text-sm uppercase tracking-widest mb-4">Servicios</p>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#servicios" class="hover:text-[#C9A961] transition"
                  >Pensión de Invalidez</a
                >
              </li>
              <li>
                <a href="#servicios" class="hover:text-[#C9A961] transition">Pensión de Vejez</a>
              </li>
              <li>
                <a href="#servicios" class="hover:text-[#C9A961] transition">Sobrevivientes</a>
              </li>
              <li>
                <a href="#servicios" class="hover:text-[#C9A961] transition"
                  >Reclamaciones y Tutelas</a
                >
              </li>
              <li>
                <a href="#servicios" class="hover:text-[#C9A961] transition">Renta Ciudadana</a>
              </li>
            </ul>
          </div>

          <!-- Contacto -->
          <div>
            <p class="font-semibold text-white text-sm uppercase tracking-widest mb-4">Despacho</p>
            <ul class="space-y-3 text-sm text-slate-400">
              <li class="flex gap-3">
                <svg
                  class="w-4 h-4 mt-0.5 shrink-0 text-[#C9A961]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Cra. 7 # 71-21, Torre B<br />Of. 1102, Bogotá D.C.</span>
              </li>
              <li class="flex gap-3">
                <svg
                  class="w-4 h-4 mt-0.5 shrink-0 text-[#C9A961]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2L8.6 10.5a11 11 0 005 5l1.1-1.6a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
                  />
                </svg>
                <a href="tel:+576017458800" class="hover:text-[#C9A961] transition"
                  >+57 601 745 8800</a
                >
              </li>
              <li class="flex gap-3">
                <svg
                  class="w-4 h-4 mt-0.5 shrink-0 text-[#C9A961]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:contacto@lexsocial.co"
                  class="hover:text-[#C9A961] transition break-all"
                  >contacto&#64;lexsocial.co</a
                >
              </li>
              <li class="flex gap-3">
                <svg
                  class="w-4 h-4 mt-0.5 shrink-0 text-[#C9A961]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" d="M12 7v5l3 2" />
                </svg>
                <span>Lun a Vie · 8:00 a 18:00</span>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <p class="font-semibold text-white text-sm uppercase tracking-widest mb-4">Legal</p>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" class="hover:text-[#C9A961] transition">Aviso legal</a></li>
              <li>
                <a href="#" class="hover:text-[#C9A961] transition">Política de privacidad</a>
              </li>
              <li>
                <a href="#" class="hover:text-[#C9A961] transition"
                  >Tratamiento de datos (Ley 1581)</a
                >
              </li>
              <li><a href="#" class="hover:text-[#C9A961] transition">Cookies</a></li>
            </ul>
          </div>
        </div>

        <!-- Línea inferior -->
        <div
          class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500"
        >
          <p>© {{ currentYear }} Lex Social Colombia. Todos los derechos reservados.</p>
          <p>T.P. 245.876 — Consejo Superior de la Judicatura · Bogotá D.C.</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
