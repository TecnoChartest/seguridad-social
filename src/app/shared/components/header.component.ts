import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header
      class="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60"
      [class.shadow-sm]="scrolled()"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <a routerLink="/" class="flex items-center gap-2 group">
            <svg
              class="w-8 h-8 text-[#C9A961]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                d="M12 3v18M5 7l7-4 7 4M5 7l-3 8a3 3 0 0 0 6 0l-3-8zM19 7l-3 8a3 3 0 0 0 6 0l-3-8z"
              />
            </svg>
            <span
              class="font-serif text-xl md:text-2xl font-semibold text-[#0B1F3A] group-hover:text-[#C9A961] transition"
            >
              Lex Social <span class="text-[#C9A961]">Colombia</span>
            </span>
          </a>

          <nav class="hidden md:flex items-center gap-8">
            @for (item of nav; track item.href) {
              <a
                [href]="item.href"
                class="text-sm font-medium text-slate-700 hover:text-[#0B1F3A] transition-colors relative
                        after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5
                        after:bg-[#C9A961] after:transition-all hover:after:w-full"
              >
                {{ item.label }}
              </a>
            }
          </nav>

          <div class="hidden md:block">
            <a
              href="#contacto"
              class="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#C9A961] text-[#0B1F3A]
                      font-semibold text-sm hover:bg-[#b8955a] transition shadow-sm hover:shadow-md"
            >
              Consulta gratuita
            </a>
          </div>

          <button
            (click)="menuOpen.set(!menuOpen())"
            class="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            [attr.aria-expanded]="menuOpen()"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              @if (!menuOpen()) {
                <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
              } @else {
                <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
              }
            </svg>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div class="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur" [@slideDown]>
          <nav class="px-4 py-4 flex flex-col gap-3">
            @for (item of nav; track item.href) {
              <a
                [href]="item.href"
                (click)="menuOpen.set(false)"
                class="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                {{ item.label }}
              </a>
            }
            <a
              href="#contacto"
              (click)="menuOpen.set(false)"
              class="mt-2 text-center px-4 py-3 rounded-xl bg-[#C9A961] text-[#0B1F3A] font-semibold"
            >
              Consulta gratuita
            </a>
          </nav>
        </div>
      }
    </header>
  `,
  animations: [
    // trigger('slideDown', [...]) — importa desde @angular/animations si lo deseas
  ],
})
export class HeaderComponent {
  menuOpen = signal(false);
  scrolled = signal(false);

  nav = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Herramientas', href: '#herramientas' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Contacto', href: '#contacto' },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => this.scrolled.set(window.scrollY > 10));
    }
  }
}
