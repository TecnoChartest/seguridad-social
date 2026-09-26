import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DemoBannerComponent } from '../../shared/components/demo-banner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DemoBannerComponent],
  template: `
    <app-demo-banner />

    <div class="min-h-screen bg-cream flex">
      <!-- Sidebar -->
      <aside class="hidden lg:flex flex-col w-64 bg-primary text-white p-6">
        <p class="font-serif text-xl mb-8">Lex Social <span class="text-gold">Admin</span></p>
        <nav class="space-y-1 text-sm">
          @for (item of menu; track item.href) {
            <a
              [routerLink]="item.href"
              class="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition"
              [class.bg-white/10]="item.active"
            >
              {{ item.label }}
            </a>
          }
        </nav>
      </aside>

      <main class="flex-1 p-6 lg:p-10">
        <h1 class="font-serif text-3xl text-primary">Panel de control</h1>
        <p class="text-slate-600 mt-1 text-sm">
          Bogotá D.C. · {{ hoy | date: 'longDate' : '' : 'es-CO' }}
        </p>

        <!-- Métricas -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          @for (m of metricas; track m.label) {
            <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {{ m.label }}
              </p>
              <p class="font-serif text-3xl text-primary mt-2">{{ m.valor }}</p>
              <p
                class="text-xs mt-1"
                [class.text-green-600]="m.delta > 0"
                [class.text-red-600]="m.delta < 0"
              >
                {{ m.delta > 0 ? '↑' : '↓' }} {{ m.delta }}% vs. semana anterior
              </p>
            </div>
          }
        </div>

        <!-- Gráfico simple de leads por servicio -->
        <div class="mt-8 grid lg:grid-cols-2 gap-6">
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <h2 class="font-serif text-xl text-primary mb-4">
              Leads por servicio (últimos 30 días)
            </h2>
            <div class="space-y-3">
              @for (s of leadsPorServicio; track s.nombre) {
                <div>
                  <div class="flex justify-between text-sm text-slate-600 mb-1">
                    <span>{{ s.nombre }}</span
                    ><span class="font-semibold">{{ s.total }}</span>
                  </div>
                  <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all"
                      [style.width.%]="(s.total / maxLeads()) * 100"
                    ></div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <h2 class="font-serif text-xl text-primary mb-4">Actividad reciente</h2>
            <ul class="space-y-3 text-sm">
              @for (a of actividad; track a.texto) {
                <li class="flex gap-3">
                  <span
                    class="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    [class.bg-gold]="a.tipo === 'lead'"
                    [class.bg-blue-500]="a.tipo === 'cita'"
                    [class.bg-green-500]="a.tipo === 'cliente'"
                  ></span>
                  <div>
                    <p class="text-slate-700">{{ a.texto }}</p>
                    <p class="text-xs text-slate-400">{{ a.hace }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent {
  hoy = new Date();

  menu = [
    { label: 'Dashboard', href: '/demo/dashboard', active: true },
    { label: 'Leads / Pipeline', href: '/demo/pipeline', active: false },
    { label: 'Expedientes', href: '/demo/pipeline', active: false },
    { label: 'Escritos', href: '/demo/escritos', active: false },
    { label: 'Automatizaciones', href: '#', active: false },
  ];

  metricas = [
    { label: 'Leads hoy', valor: 7, delta: 12 },
    { label: 'Consultas agendadas', valor: 3, delta: 50 },
    { label: 'Expedientes activos', valor: 42, delta: 8 },
    { label: 'Escritos generados', valor: 18, delta: -5 },
  ];

  leadsPorServicio = [
    { nombre: 'Pensión de Invalidez', total: 34 },
    { nombre: 'Pensión de Vejez', total: 28 },
    { nombre: 'Sobrevivientes', total: 19 },
    { nombre: 'Reclamación / Tutela', total: 15 },
    { nombre: 'Historia laboral', total: 11 },
    { nombre: 'Renta Ciudadana', total: 8 },
  ];

  maxLeads = () => Math.max(...this.leadsPorServicio.map((s) => s.total));

  actividad = [
    {
      tipo: 'lead',
      texto: 'Nuevo lead: Ana María Gómez — Invalidez (Antioquia)',
      hace: 'hace 5 min',
    },
    { tipo: 'cita', texto: 'Cita agendada: Héctor Ríos — videollamada 14:30', hace: 'hace 22 min' },
    {
      tipo: 'cliente',
      texto: 'Expediente actualizado: M.F. Ríos — Radicado 2024-0587',
      hace: 'hace 1 h',
    },
    { tipo: 'lead', texto: 'Nuevo lead: Rosa Elvira Pérez — Renta Ciudadana', hace: 'hace 2 h' },
    { tipo: 'cita', texto: 'Cita confirmada: Diana Torres — telefónica 16:00', hace: 'hace 3 h' },
  ];
}
