import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header.component';
import { FooterComponent } from '../../shared/components/footer.component';
import { WhatsappFloatComponent } from '../../shared/components/whatsapp-float.component';
import { HeroComponent } from './sections/hero.component';
import { ServiciosComponent } from './sections/servicios.component';
import { HerramientasComponent } from './sections/herramientas.component';
import { SobreMiComponent } from './sections/sobre-mi.component';
import { ProcesoComponent } from './sections/proceso.component';
import { TestimoniosComponent } from './sections/testimonios.component';
import { FaqComponent } from './sections/faq.component';
import { ContactoComponent } from './sections/contacto.component';
import { AgendaComponent } from './sections/agenda.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServiciosComponent,
    HerramientasComponent,
    SobreMiComponent,
    ProcesoComponent,
    TestimoniosComponent,
    FaqComponent,
    ContactoComponent,
    AgendaComponent,
    FooterComponent,
    WhatsappFloatComponent,
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-servicios />
      <app-herramientas />
      <app-sobre-mi />
      <app-proceso />
      <app-testimonios />
      <app-faq />
      <app-contacto />
      <app-agenda />
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
})
export class LandingComponent {}
