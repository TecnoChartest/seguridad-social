import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Slot {
  hora: string;
  disponible: boolean;
}

interface Cita {
  dia: Date;
  hora: string;
  modalidad: 'presencial' | 'telefonica' | 'videollamada';
  nombre: string;
  telefono: string;
  email: string;
  motivo: string;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="agenda" class="py-24 bg-gradient-to-b from-cream to-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Encabezado -->
        <header class="text-center max-w-2xl mx-auto mb-14">
          <p class="text-xs font-semibold text-[#C9A961] uppercase tracking-widest">Agenda</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-[#0B1F3A] mt-3">
            Reserva tu consulta gratuita
          </h2>
          <p class="text-slate-600 mt-4 leading-relaxed">
            Elige día, hora y modalidad. Recibirás confirmación por WhatsApp y correo en menos de 2
            horas hábiles.
          </p>
        </header>

        <!-- Contenedor principal -->
        <div class="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div class="grid lg:grid-cols-[1.1fr_1fr]">
            <!-- ══ Calendario ══ -->
            <div class="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
              <!-- Header del mes -->
              <div class="flex items-center justify-between mb-6">
                <button
                  (click)="mesAnterior()"
                  [disabled]="!puedeRetroceder()"
                  class="p-2 rounded-lg hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Mes anterior"
                >
                  <svg
                    class="w-5 h-5 text-[#0B1F3A]"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div class="text-center">
                  <p class="font-serif text-lg sm:text-xl text-[#0B1F3A] capitalize">
                    {{ mesActualTexto() }}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">Zona horaria: Bogotá (GMT-5)</p>
                </div>

                <button
                  (click)="mesSiguiente()"
                  [disabled]="!puedeAvanzar()"
                  class="p-2 rounded-lg hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Mes siguiente"
                >
                  <svg
                    class="w-5 h-5 text-[#0B1F3A]"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Días de la semana -->
              <div class="grid grid-cols-7 gap-1 mb-2">
                @for (d of diasSemana; track d) {
                  <div class="text-center text-xs font-semibold text-slate-400 uppercase py-2">
                    {{ d }}
                  </div>
                }
              </div>

              <!-- Grid del mes -->
              <div class="grid grid-cols-7 gap-1">
                @for (celda of celdasMes(); track celda.key) {
                  @if (celda.dia === null) {
                    <div></div>
                  } @else {
                    <button
                      (click)="seleccionarDia(celda.dia)"
                      [disabled]="!celda.disponible"
                      class="relative aspect-square rounded-xl text-sm font-medium
                             transition flex flex-col items-center justify-center"
                      [class.bg-[#0B1F3A]]="esSeleccionado(celda.dia)"
                      [class.text-white]="esSeleccionado(celda.dia)"
                      [class.shadow-md]="esSeleccionado(celda.dia)"
                      [class.hover:bg-slate-100]="celda.disponible && !esSeleccionado(celda.dia)"
                      [class.text-[#0B1F3A]]="celda.disponible && !esSeleccionado(celda.dia)"
                      [class.text-slate-300]="!celda.disponible"
                      [class.cursor-not-allowed]="!celda.disponible"
                      [class.bg-slate-50]="celda.esHoy && !esSeleccionado(celda.dia)"
                      [attr.aria-label]="
                        'Seleccionar ' + celda.dia.getDate() + ' de ' + mesActualTexto()
                      "
                    >
                      <span>{{ celda.dia.getDate() }}</span>
                      @if (celda.disponible && !esSeleccionado(celda.dia)) {
                        <span class="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#C9A961]"></span>
                      }
                      @if (celda.esHoy && !esSeleccionado(celda.dia)) {
                        <span
                          class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#0B1F3A]"
                        ></span>
                      }
                    </button>
                  }
                }
              </div>

              <!-- Leyenda -->
              <div class="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#C9A961]"></span>
                  Disponible
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#0B1F3A]"></span>
                  Hoy
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-slate-200"></span>
                  No disponible
                </div>
              </div>
            </div>

            <!-- ══ Slots / modalidad ══ -->
            <div class="p-6 sm:p-8 bg-slate-50/60">
              @if (!diaSeleccionado()) {
                <div class="h-full flex flex-col items-center justify-center text-center py-12">
                  <div
                    class="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4"
                  >
                    <svg
                      class="w-7 h-7 text-[#C9A961]"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path stroke-linecap="round" d="M8 3v4M16 3v4M3 11h18" />
                    </svg>
                  </div>
                  <p class="font-serif text-lg text-[#0B1F3A]">Selecciona un día</p>
                  <p class="text-sm text-slate-500 mt-2 max-w-xs">
                    Los días con punto dorado tienen horarios disponibles.
                  </p>
                </div>
              } @else {
                <!-- Fecha seleccionada -->
                <div class="mb-6">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Fecha seleccionada
                  </p>
                  <p class="font-serif text-xl text-[#0B1F3A] mt-1 capitalize">
                    {{ fechaSeleccionadaTexto() }}
                  </p>
                </div>

                <!-- Modalidad -->
                <div class="mb-6">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Modalidad
                  </p>
                  <div class="grid grid-cols-3 gap-2">
                    @for (m of modalidades; track m.id) {
                      <button
                        (click)="modalidad.set(m.id)"
                        class="px-3 py-2.5 rounded-xl text-xs font-semibold border transition
                                     flex flex-col items-center gap-1"
                        [class.bg-[#0B1F3A]]="modalidad() === m.id"
                        [class.text-white]="modalidad() === m.id"
                        [class.border-[#0B1F3A]]="modalidad() === m.id"
                        [class.border-slate-200]="modalidad() !== m.id"
                        [class.bg-white]="modalidad() !== m.id"
                        [class.hover:border-[#C9A961]]="modalidad() !== m.id"
                      >
                        <span class="text-base">{{ m.emoji }}</span>
                        <span>{{ m.label }}</span>
                      </button>
                    }
                  </div>
                </div>

                <!-- Horarios -->
                <div class="mb-6">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Horarios disponibles (30 min)
                  </p>
                  <div class="grid grid-cols-3 gap-2">
                    @for (s of slotsDelDia(); track s.hora) {
                      <button
                        (click)="seleccionarSlot(s)"
                        [disabled]="!s.disponible"
                        class="py-2.5 rounded-xl text-sm font-medium border transition"
                        [class.bg-[#C9A961]]="slotSeleccionado() === s.hora"
                        [class.text-[#0B1F3A]]="slotSeleccionado() === s.hora"
                        [class.border-[#C9A961]]="slotSeleccionado() === s.hora"
                        [class.border-slate-200]="slotSeleccionado() !== s.hora && s.disponible"
                        [class.bg-white]="slotSeleccionado() !== s.hora && s.disponible"
                        [class.text-slate-700]="slotSeleccionado() !== s.hora && s.disponible"
                        [class.hover:border-[#0B1F3A]]="
                          s.disponible && slotSeleccionado() !== s.hora
                        "
                        [class.bg-slate-100]="!s.disponible"
                        [class.text-slate-300]="!s.disponible"
                        [class.line-through]="!s.disponible"
                        [class.cursor-not-allowed]="!s.disponible"
                      >
                        {{ s.hora }}
                      </button>
                    }
                  </div>
                </div>

                <!-- CTA -->
                <button
                  (click)="abrirConfirmacion()"
                  [disabled]="!slotSeleccionado()"
                  class="w-full py-3.5 rounded-xl bg-[#C9A961] text-[#0B1F3A] font-semibold
                               hover:bg-[#b8955a] transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  @if (slotSeleccionado()) {
                    Confirmar cita — {{ slotSeleccionado() }}
                  } @else {
                    Selecciona un horario
                  }
                </button>

                <p class="text-xs text-slate-500 text-center mt-3">
                  Sin coste ni compromiso. Puedes reprogramar hasta 24h antes.
                </p>
              }
            </div>
          </div>
        </div>

        <!-- ══ Modal de confirmación ══ -->
        @if (mostrarModal()) {
          <div
            class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            (click)="cerrarModal()"
          >
            <div
              class="max-w-lg w-full bg-white rounded-3xl shadow-2xl my-8"
              (click)="$event.stopPropagation()"
            >
              @if (!confirmada()) {
                <!-- Formulario -->
                <div class="p-6 sm:p-8">
                  <div class="flex items-start justify-between mb-6">
                    <div>
                      <p class="text-xs font-semibold text-[#C9A961] uppercase tracking-widest">
                        Confirmar cita
                      </p>
                      <h3 class="font-serif text-2xl text-[#0B1F3A] mt-1">
                        {{ fechaSeleccionadaTexto() }}
                      </h3>
                      <p class="text-sm text-slate-600 mt-1">
                        {{ slotSeleccionado() }} · {{ modalidadLabel() }}
                      </p>
                    </div>
                    <button
                      (click)="cerrarModal()"
                      class="p-2 rounded-lg hover:bg-slate-100 transition"
                    >
                      <svg
                        class="w-5 h-5 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-semibold text-slate-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        [(ngModel)]="form.nombre"
                        type="text"
                        placeholder="Ej. María Fernanda Ríos"
                        class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                      />
                    </div>

                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          [(ngModel)]="form.telefono"
                          type="tel"
                          placeholder="+57 300 123 4567"
                          class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                          Correo electrónico *
                        </label>
                        <input
                          [(ngModel)]="form.email"
                          type="email"
                          placeholder="tu@correo.com"
                          class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-semibold text-slate-700 mb-2">
                        Motivo de la consulta (opcional)
                      </label>
                      <textarea
                        [(ngModel)]="form.motivo"
                        rows="3"
                        placeholder="Cuéntanos brevemente tu caso…"
                        class="w-full rounded-xl border-slate-300 focus:border-[#C9A961] focus:ring-[#C9A961]"
                      ></textarea>
                    </div>

                    @if (error()) {
                      <div
                        class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                      >
                        {{ error() }}
                      </div>
                    }
                  </div>

                  <div class="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      (click)="cerrarModal()"
                      class="sm:flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      (click)="confirmar()"
                      [disabled]="cargando()"
                      class="sm:flex-2 py-3 rounded-xl bg-[#0B1F3A] text-white font-semibold
                                   hover:bg-[#12325E] transition disabled:opacity-60"
                    >
                      @if (cargando()) {
                        <span class="inline-flex items-center gap-2 justify-center">
                          <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
                          Confirmando…
                        </span>
                      } @else {
                        Confirmar cita
                      }
                    </button>
                  </div>

                  <p class="text-xs text-slate-500 text-center mt-4">
                    Al confirmar aceptas el tratamiento de datos conforme a la
                    <a href="#" class="underline">Ley 1581 de 2012</a>.
                  </p>
                </div>
              } @else {
                <!-- Éxito -->
                <div class="p-6 sm:p-10 text-center">
                  <div
                    class="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5"
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

                  <h3 class="font-serif text-2xl text-[#0B1F3A]">¡Cita confirmada!</h3>
                  <p class="text-slate-600 mt-3">
                    Te enviamos la confirmación por WhatsApp y correo.
                  </p>

                  <div class="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-left">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Detalles
                    </p>
                    <dl class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <dt class="text-slate-500">Fecha</dt>
                        <dd class="font-semibold text-[#0B1F3A] capitalize">
                          {{ fechaSeleccionadaTexto() }}
                        </dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-slate-500">Hora</dt>
                        <dd class="font-semibold text-[#0B1F3A]">{{ slotSeleccionado() }}</dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-slate-500">Modalidad</dt>
                        <dd class="font-semibold text-[#0B1F3A]">{{ modalidadLabel() }}</dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-slate-500">Código</dt>
                        <dd class="font-mono text-xs text-[#C9A961]">{{ codigoCita() }}</dd>
                      </div>
                    </dl>
                  </div>

                  <div class="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      [href]="waLink()"
                      target="_blank"
                      rel="noopener"
                      class="sm:flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl
                              bg-[#25D366] text-white font-semibold hover:bg-[#1eb355] transition"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"
                        />
                      </svg>
                      Abrir WhatsApp
                    </a>
                    <button
                      (click)="resetear()"
                      class="sm:flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                    >
                      Agendar otra
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class AgendaComponent {
  // ─── Estado base ───
  hoy = new Date();
  private mesVista = signal(new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1));
  diaSeleccionado = signal<Date | null>(null);
  slotSeleccionado = signal<string | null>(null);
  modalidad = signal<'presencial' | 'telefonica' | 'videollamada'>('videollamada');
  mostrarModal = signal(false);
  confirmada = signal(false);
  cargando = signal(false);
  error = signal<string | null>(null);
  codigoCita = signal('');

  // ─── Formulario ───
  form = {
    nombre: '',
    telefono: '',
    email: '',
    motivo: '',
  };

  // ─── Constantes ───
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  modalidades = [
    { id: 'presencial' as const, label: 'Presencial', emoji: '🏢' },
    { id: 'telefonica' as const, label: 'Telefónica', emoji: '📞' },
    { id: 'videollamada' as const, label: 'Videollamada', emoji: '💻' },
  ];

  // Simulación: días disponibles = todos los hábiles desde hoy hasta +60 días,
  // excepto fines de semana y algunos días "llenos" fijos para realismo.
  private diasLlenos = new Set<number>();

  constructor() {
    // "Llenamos" algunos días del mes para realismo (día 5, 12 y 19 del mes actual)
    const y = this.hoy.getFullYear();
    const m = this.hoy.getMonth();
    this.diasLlenos.add(new Date(y, m, 5).getTime());
    this.diasLlenos.add(new Date(y, m, 12).getTime());
    this.diasLlenos.add(new Date(y, m, 19).getTime());
  }

  // ─── Derivados ───
  mesActualTexto = computed(() => {
    return this.mesVista().toLocaleDateString('es-CO', {
      month: 'long',
      year: 'numeric',
    });
  });

  fechaSeleccionadaTexto = computed(() => {
    const d = this.diaSeleccionado();
    if (!d) return '';
    return d.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  });

  modalidadLabel = computed(() => {
    const m = this.modalidades.find((x) => x.id === this.modalidad());
    return m ? m.label : '';
  });

  /** Celdas del mes visible (con offsets nulos para alinear el día 1 al lunes). */
  celdasMes = computed(() => {
    const base = this.mesVista();
    const y = base.getFullYear();
    const m = base.getMonth();
    const primerDia = new Date(y, m, 1);
    const diasEnMes = new Date(y, m + 1, 0).getDate();

    // getDay(): 0=domingo … 6=sábado. Queremos 0=lunes.
    const offset = (primerDia.getDay() + 6) % 7;

    const celdas: Array<{
      key: string;
      dia: Date | null;
      disponible: boolean;
      esHoy: boolean;
    }> = [];

    for (let i = 0; i < offset; i++) {
      celdas.push({ key: `e-${i}`, dia: null, disponible: false, esHoy: false });
    }

    for (let d = 1; d <= diasEnMes; d++) {
      const fecha = new Date(y, m, d);
      celdas.push({
        key: `d-${y}-${m}-${d}`,
        dia: fecha,
        disponible: this.esDisponible(fecha),
        esHoy: this.esMismoDia(fecha, this.hoy),
      });
    }

    return celdas;
  });

  /** Slots del día seleccionado (con algunos marcados como ocupados, para realismo). */
  slotsDelDia = computed<Slot[]>(() => {
    const d = this.diaSeleccionado();
    if (!d) return [];

    const base = [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
    ];

    // Determinamos ocupados según el día (hash simple) para que sea estable
    const seed = d.getDate();
    return base.map((hora, i) => ({
      hora,
      disponible: (seed + i) % 4 !== 0,
    }));
  });

  // ─── Navegación de mes ───
  puedeRetroceder = computed(() => {
    const base = this.mesVista();
    return base.getFullYear() > this.hoy.getFullYear() || base.getMonth() > this.hoy.getMonth();
  });

  puedeAvanzar = computed(() => {
    const base = this.mesVista();
    const limite = new Date(this.hoy.getFullYear(), this.hoy.getMonth() + 2, 1);
    return base < limite;
  });

  mesAnterior() {
    if (!this.puedeRetroceder()) return;
    const b = this.mesVista();
    this.mesVista.set(new Date(b.getFullYear(), b.getMonth() - 1, 1));
    this.diaSeleccionado.set(null);
    this.slotSeleccionado.set(null);
  }

  mesSiguiente() {
    if (!this.puedeAvanzar()) return;
    const b = this.mesVista();
    this.mesVista.set(new Date(b.getFullYear(), b.getMonth() + 1, 1));
    this.diaSeleccionado.set(null);
    this.slotSeleccionado.set(null);
  }

  // ─── Selección ───
  seleccionarDia(dia: Date) {
    this.diaSeleccionado.set(dia);
    this.slotSeleccionado.set(null);
  }

  seleccionarSlot(s: Slot) {
    if (!s.disponible) return;
    this.slotSeleccionado.set(s.hora);
  }

  esSeleccionado(dia: Date) {
    const d = this.diaSeleccionado();
    return d !== null && this.esMismoDia(d, dia);
  }

  // ─── Modal ───
  abrirConfirmacion() {
    this.error.set(null);
    this.confirmada.set(false);
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
    this.error.set(null);
  }

  confirmar() {
    this.error.set(null);
    if (!this.form.nombre.trim() || !this.form.telefono.trim() || !this.form.email.trim()) {
      this.error.set('Completa nombre, teléfono y correo.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      this.error.set('El correo no es válido.');
      return;
    }

    this.cargando.set(true);
    setTimeout(() => {
      this.cargando.set(false);
      this.codigoCita.set(this.generarCodigo());
      this.confirmada.set(true);
    }, 1200);
  }

  resetear() {
    this.confirmada.set(false);
    this.mostrarModal.set(false);
    this.form = { nombre: '', telefono: '', email: '', motivo: '' };
    this.diaSeleccionado.set(null);
    this.slotSeleccionado.set(null);
  }

  waLink() {
    const texto = `Hola, acabo de confirmar una cita para el ${this.fechaSeleccionadaTexto()} a las ${this.slotSeleccionado()} (${this.modalidadLabel()}). Mi código es ${this.codigoCita()}.`;
    return `https://wa.me/573001234567?text=${encodeURIComponent(texto)}`;
  }

  // ─── Utilidades ───
  private esMismoDia(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private esDisponible(fecha: Date): boolean {
    // No fechas pasadas
    const hoyMid = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate());
    if (fecha < hoyMid) return false;

    // No fines de semana
    const dow = fecha.getDay();
    if (dow === 0 || dow === 6) return false;

    // "Llenos" simulados
    if (this.diasLlenos.has(fecha.getTime())) return false;

    // Fuera del rango de 60 días
    const limite = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate() + 60);
    if (fecha > limite) return false;

    return true;
  }

  private generarCodigo(): string {
    const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const l1 = letras[Math.floor(Math.random() * letras.length)];
    const l2 = letras[Math.floor(Math.random() * letras.length)];
    const n = Math.floor(1000 + Math.random() * 9000);
    return `${l1}${l2}-${n}`;
  }
}
