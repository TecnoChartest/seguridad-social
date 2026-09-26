import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculadoraService, ResultadoInvalidez } from '../../core/services/calculadora.service';
import { CopCurrencyPipe } from '../../shared/pipes/cop-currency.pipe';

@Component({
  selector: 'app-estimador-invalidez',
  standalone: true,
  imports: [CommonModule, FormsModule, CopCurrencyPipe],
  template: `
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Tipo de enfermedad o lesión</label>
        <select [(ngModel)]="tipo" class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]">
          <option value="accidente-laboral">Accidente laboral (ARL)</option>
          <option value="enfermedad-laboral">Enfermedad laboral</option>
          <option value="accidente-transito">Accidente de tránsito</option>
          <option value="enfermedad-comun">Enfermedad común</option>
        </select>
      </div>

      <div>
        <label class="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
          <span>Grado de afectación (PCL estimada)</span>
          <span class="text-[#C9A961] font-bold">{{ pcl() }}%</span>
        </label>
        <input type="range" min="0" max="100" step="1" [(ngModel)]="pcl"
               class="w-full accent-[#C9A961]" />
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0%</span><span>50% (mínimo invalidez)</span><span>100%</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Edad actual</label>
          <input type="number" [(ngModel)]="edad" min="18" max="80"
                 class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Semanas cotizadas</label>
          <input type="number" [(ngModel)]="semanas" min="0"
                 class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">IBL estimado (COP/mes)</label>
        <input type="number" [(ngModel)]="ibl" min="0" step="100000"
               class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]" />
      </div>

      <button (click)="calcular()"
              class="w-full py-3 rounded-xl bg-[#0B1F3A] text-white font-semibold hover:bg-[#12325E] transition">
        Calcular estimación
      </button>

      @if (resultado(); as r) {
        <div class="rounded-2xl border-2 p-6 transition-all"
             [class.border-green-200]="r.viable"
             [class.bg-green-50]="r.viable"
             [class.border-amber-200]="!r.viable"
             [class.bg-amber-50]="!r.viable">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
                  [class.bg-green-600]="r.viable"
                  [class.text-white]="r.viable"
                  [class.bg-amber-500]="!r.viable"
                  [class.text-white]="!r.viable">
              {{ r.grado }}
            </span>
            <span class="text-xs text-slate-500">PCL: {{ r.pcl }}%</span>
          </div>
          <p class="text-sm text-slate-700 mb-3">{{ r.mensaje }}</p>
          @if (r.viable) {
            <div class="flex items-baseline gap-2">
              <span class="font-serif text-3xl text-[#0B1F3A]">{{ r.cuantiaMensual | cop }}</span>
              <span class="text-sm text-slate-500">/mes</span>
            </div>
            <p class="mt-3 text-xs text-slate-500">
              * Estimación orientativa. La cuantía real la determina Colpensiones/ADRES con base en tu IBL
              y el dictamen de la Junta de Calificación de Invalidez.
            </p>
            <a href="#contacto" class="mt-4 inline-block text-sm font-semibold text-[#0B1F3A] hover:text-[#C9A961]">
              Revisar mi caso con un abogado →
            </a>
          }
        </div>
      }
    </div>
  `,
})
export class EstimadorInvalidezComponent {
  tipo = 'accidente-laboral';
  pcl = signal(60);
  edad = 45;
  semanas = 750;
  ibl = 2_500_000;
  resultado = signal<ResultadoInvalidez | null>(null);

  constructor(private calc: CalculadoraService) {}

  calcular() {
    this.resultado.set(
      this.calc.calcularInvalidez({
        pcl: this.pcl(),
        semanasCotizadas: this.semanas,
        edad: this.edad,
        ibl: this.ibl,
      })
    );
  }
}
