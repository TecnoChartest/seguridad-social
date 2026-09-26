import { Servicio } from '../core/models/servicio.model';

export const SERVICIOS: Servicio[] = [
  {
    id: 'invalidez',
    icono: 'shield-heart',
    titulo: 'Pensión de Invalidez',
    resumen:
      'Pérdida de capacidad laboral ≥ 50%. Te acompañamos ante la Junta de Calificación y Colpensiones.',
    detalle: `Si una enfermedad o accidente te ha generado una pérdida de capacidad laboral igual o superior al 50%, tienes derecho a una pensión de invalidez. Analizamos tu caso, solicitamos el dictamen ante la Junta Nacional o Regional de Calificación de Invalidez, y reclamamos ante Colpensiones, ADRES o tu fondo privado.`,
    requisitos: [
      'Pérdida de capacidad laboral ≥ 50%',
      '50 semanas cotizadas en los últimos 3 años (si < 20 años)',
      '25% de semanas entre los 20 años y la fecha de invalidez (si ≥ 20 años)',
    ],
    plazo: 'Reclamo administrativo: 4 meses. Demanda laboral: prescripción 3 años.',
  },
  {
    id: 'vejez',
    icono: 'clock',
    titulo: 'Pensión de Vejez',
    resumen:
      'Régimen de Prima Media (Colpensiones) o RAIS (fondos privados). Calculamos cuál te conviene.',
    detalle: `Analizamos tu historia laboral completa, verificamos semanas cotizadas, calculamos el IBL (Ingreso Base de Liquidación) y la tasa de reemplazo aplicable. Si estás en un fondo privado y no alcanzas capital para pensión vitalicia, gestionamos el traslado a Colpensiones o la devolución de saldos con renta vitalicia.`,
    requisitos: [
      'Edad: 62 años (hombres) / 57 años (mujeres)',
      'Mínimo 1.300 semanas cotizadas (RPM)',
      'En RAIS: capital suficiente para pensión ≥ 110% SMMLV',
    ],
    plazo: 'Reconocimiento: 4 meses desde la solicitud.',
  },
  {
    id: 'sobrevivientes',
    icono: 'users',
    titulo: 'Pensión de Sobrevivientes',
    resumen:
      'Para cónyuge, compañero(a) permanente e hijos. Reclamamos ante Colpensiones o fondo privado.',
    detalle: `Si tu cónyuge, compañero(a) permanente o padre/madre falleció, tú y tus hijos pueden tener derecho a pensión de sobrevivientes. Verificamos las 50 semanas cotizadas en los últimos 3 años y gestionamos la reclamación.`,
    requisitos: [
      '50 semanas cotizadas en los últimos 3 años anteriores al fallecimiento',
      'Parentesco: cónyuge, compañero(a) permanente, hijos < 18 o < 25 estudiantes, padres dependientes',
    ],
    plazo: 'Reclamación: 4 meses. Prescripción: 3 años.',
  },
  {
    id: 'renta-ciudadana',
    icono: 'euro',
    titulo: 'Renta Ciudadana y Beneficios',
    resumen:
      'Renta Ciudadana, Colombia Mayor, Devolución del IVA. Te ayudamos con la postulación y reclamación.',
    detalle: `Te asesoramos en el acceso a programas del Departamento de Prosperidad Social (DPS): Renta Ciudadana, Colombia Mayor, Devolución del IVA, Jóvenes en Acción. Revisamos tu clasificación en el Sisbén IV y gestionamos recursos ante negativas.`,
    requisitos: [
      'Estar en Sisbén IV (grupos A, B o C)',
      'Cumplir criterios del programa específico',
    ],
    plazo: 'Postulación: según convocatoria DPS.',
  },
  {
    id: 'reclamacion',
    icono: 'file-badge',
    titulo: 'Reclamaciones y Recursos',
    resumen:
      'Recursos de reposición y apelación, tutelas por mora, demandas laborales ante Colpensiones.',
    detalle: `Si Colpensiones, ADRES, la UGPP o tu fondo privado negaron tu prestación, presentamos recursos de reposición y apelación, acciones de tutela por mora o vulneración de derechos fundamentales, y demandas ordinarias laborales ante la Jurisdicción Ordinaria.`,
    requisitos: ['Resolución o acto administrativo que niegue el derecho'],
    plazo: 'Recursos: 10 días hábiles. Tutela: en cualquier momento. Demanda: 3 años.',
  },
  {
    id: 'historia-laboral',
    icono: 'search',
    titulo: 'Historia Laboral y Cálculo Actuarial',
    resumen:
      'Solicitamos tu historia laboral completa y realizamos cálculo actuarial para detectar semanas faltantes.',
    detalle: `Muchos afiliados tienen semanas no reportadas por empleadores. Solicitamos la historia laboral ante Colpensiones o tu fondo, cruzamos con certificaciones y realizamos cálculo actuarial. Si detectamos omisiones, reclamamos al empleador o a la UGPP.`,
    requisitos: ['Documento de identidad', 'Autorización de consulta'],
    plazo: 'Respuesta Colpensiones: 15 días hábiles.',
  },
];
