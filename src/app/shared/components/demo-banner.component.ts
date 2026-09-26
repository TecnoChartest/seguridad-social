import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="sticky top-0 z-40 bg-amber-500 text-white text-sm">
      <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 min-w-0">
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 4a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z"
            />
          </svg>
          <span class="truncate">
            <strong>Vista previa del área privada</strong> — Demo sin datos reales
          </span>
        </div>
        <a
          routerLink="/"
          class="shrink-0 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition font-medium"
        >
          Volver a la landing
        </a>
      </div>
    </div>
  `,
})
export class DemoBannerComponent {}
