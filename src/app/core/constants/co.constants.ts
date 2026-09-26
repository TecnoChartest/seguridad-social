export const CO = {
  SMMLV_2025: 1_423_500,          // Salario Mínimo Mensual Legal Vigente 2025
  AUX_TRANSPORTE_2025: 200_000,
  SEMANAS_MIN_VEJEZ: 1_300,       // Ley 100/1993 art. 33
  SEMANAS_MIN_SOBREVIVIENTES: 50, // últimos 3 años
  EDAD_VEJEZ_HOMBRE: 62,
  EDAD_VEJEZ_MUJER: 57,
  UMBRAL_PILAR_CONTRIBUTIVO: 2.3, // SMMLV — Reforma Pensional Ley 2381/2024
  PCL_INVALIDEZ_MIN: 50,          // % pérdida capacidad laboral
  EMAIL_DESPACHO: 'contacto@lexsocial.co',
  TEL_DESPACHO: '+57 601 745 8800',
  WHATSAPP: '573001234567',
  DIRECCION: 'Cra. 7 # 71-21, Torre B, Of. 1102, Bogotá D.C.',
} as const;

export const TASA_REEMPLAZO_RPM = [
  { semanas: 1300, tasa: 0.65 },
  { semanas: 1350, tasa: 0.665 },
  { semanas: 1400, tasa: 0.68 },
  { semanas: 1450, tasa: 0.695 },
  { semanas: 1500, tasa: 0.71 },
  { semanas: 1550, tasa: 0.725 },
  { semanas: 1600, tasa: 0.74 },
  { semanas: 1650, tasa: 0.755 },
  { semanas: 1700, tasa: 0.77 },
  { semanas: 1750, tasa: 0.785 },
  { semanas: 1800, tasa: 0.80 },
];
