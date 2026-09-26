import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DEPARTAMENTOS_CO } from '../../../data/departamentos.mock';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contacto" class="py-24 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 class="font-serif text-4xl sm:text-5xl text-[#0B1F3A] text-center">
          Cuéntanos tu caso
        </h2>
        <p class="mt-4 text-center text-slate-600">
          Analizamos tu situación sin costo y sin compromiso. Respondemos en menos de 24 horas
          hábiles.
        </p>

        @if (!enviado()) {
          <form [formGroup]="form" (ngSubmit)="enviar()" class="mt-12 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2"
                >Nombre completo *</label
              >
              <input
                formControlName="nombre"
                class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                ¿Cómo prefieres que te contactemos? *
              </label>
              <div class="flex gap-3">
                <button
                  type="button"
                  (click)="canal.set('telefono')"
                  class="flex-1 py-2.5 rounded-xl border transition font-medium text-sm"
                  [class.bg-[#0B1F3A]]="canal() === 'telefono'"
                  [class.text-white]="canal() === 'telefono'"
                  [class.border-[#0B1F3A]]="canal() === 'telefono'"
                  [class.border-slate-300]="canal() !== 'telefono'"
                >
                  Teléfono
                </button>
                <button
                  type="button"
                  (click)="canal.set('email')"
                  class="flex-1 py-2.5 rounded-xl border transition font-medium text-sm"
                  [class.bg-[#0B1F3A]]="canal() === 'email'"
                  [class.text-white]="canal() === 'email'"
                  [class.border-[#0B1F3A]]="canal() === 'email'"
                  [class.border-slate-300]="canal() !== 'email'"
                >
                  Correo
                </button>
              </div>
            </div>

            @if (canal() === 'telefono') {
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2"
                  >Teléfono / WhatsApp *</label
                >
                <input
                  formControlName="telefono"
                  placeholder="+57 300 123 4567"
                  class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                />
              </div>
            } @else {
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2"
                  >Correo electrónico *</label
                >
                <input
                  type="email"
                  formControlName="email"
                  class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                />
              </div>
            }

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2"
                  >Tipo de prestación *</label
                >
                <select
                  formControlName="tipoPrestacion"
                  class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                >
                  <option value="">Selecciona…</option>
                  <option value="invalidez">Pensión de Invalidez</option>
                  <option value="vejez">Pensión de Vejez</option>
                  <option value="sobrevivientes">Pensión de Sobrevivientes</option>
                  <option value="renta-ciudadana">Renta Ciudadana / Beneficios</option>
                  <option value="reclamacion">Reclamación / Tutela</option>
                  <option value="historia-laboral">Historia Laboral</option>
                  <option value="otra">Otra</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2"
                  >Departamento *</label
                >
                <select
                  formControlName="departamento"
                  class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                >
                  <option value="">Selecciona…</option>
                  @for (d of departamentos; track d) {
                    <option [value]="d">{{ d }}</option>
                  }
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2"
                >Cuéntanos brevemente tu caso</label
              >
              <textarea
                formControlName="mensaje"
                rows="4"
                class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
              ></textarea>
            </div>

            <label
              class="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50"
            >
              <input
                type="checkbox"
                formControlName="urgente"
                class="mt-1 rounded text-[#C9A961] focus:ring-[#C9A961]"
              />
              <span class="text-sm text-slate-700">
                <strong>¿Tienes plazo abierto o resolución reciente?</strong>
                <span class="block text-xs text-slate-500 mt-0.5">
                  Recursos de 10 días hábiles, tutelas por mora o notificaciones recientes.
                </span>
              </span>
            </label>

            <label class="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                formControlName="aceptaRgpd"
                class="mt-1 rounded text-[#C9A961] focus:ring-[#C9A961]"
              />
              <span>
                Autorizo el tratamiento de mis datos personales conforme a la
                <a href="#" class="text-[#0B1F3A] underline">Ley 1581 de 2012</a> y la política de
                privacidad del despacho. *
              </span>
            </label>

            <button
              type="submit"
              [disabled]="form.invalid || cargando()"
              class="w-full py-4 rounded-xl bg-[#C9A961] text-[#0B1F3A] font-semibold text-lg
                           hover:bg-[#b8955a] transition disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-md hover:shadow-lg"
            >
              @if (cargando()) {
                <span class="inline-flex items-center gap-2">
                  <svg class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      class="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                  Enviando…
                </span>
              } @else {
                Quiero que revisen mi caso
              }
            </button>
          </form>
        } @else {
          <div
            class="mt-12 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 text-center"
          >
            <div
              class="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl text-[#0B1F3A]">Hemos recibido tu consulta</h3>
            <p class="mt-3 text-slate-600">
              Te llamamos en menos de <strong>24 horas hábiles</strong> al número registrado. Revisa
              también tu correo por si te escribimos antes.
            </p>
            <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                [href]="waLink()"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1eb355] transition"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"
                  />
                </svg>
                Continuar por WhatsApp
              </a>
              <a
                href="#agenda"
                class="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#0B1F3A] text-[#0B1F3A] font-semibold hover:bg-[#0B1F3A] hover:text-white transition"
              >
                Agendar consulta
              </a>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ContactoComponent {
  private fb = new FormBuilder();
  departamentos = DEPARTAMENTOS_CO;
  canal = signal<'telefono' | 'email'>('telefono');
  cargando = signal(false);
  enviado = signal(false);

  form = this.fb.group({
    nombre: ['', Validators.required],
    telefono: [''],
    email: [''],
    tipoPrestacion: ['', Validators.required],
    departamento: ['', Validators.required],
    mensaje: [''],
    urgente: [false],
    aceptaRgpd: [false, Validators.requiredTrue],
  });

  enviar() {
    if (this.form.invalid) return;
    this.cargando.set(true);
    setTimeout(() => {
      this.cargando.set(false);
      this.enviado.set(true);
    }, 1500);
  }

  waLink() {
    const nombre = this.form.value.nombre ?? '';
    const txt = `Hola, soy ${nombre}. Acabo de enviar el formulario en la web y quiero ampliar información sobre mi caso de Seguridad Social.`;
    return `https://wa.me/573001234567?text=${encodeURIComponent(txt)}`;
  }
}
