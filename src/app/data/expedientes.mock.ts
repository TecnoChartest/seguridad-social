export const EXPEDIENTE_DEMO = {
  cliente: 'María Fernanda Ríos',
  cedula: '43.***.***.123',
  servicio: 'Pensión de Invalidez',
  radicado: '2024-0587',
  etapas: [
    {
      id: 1,
      titulo: 'Documentación',
      estado: 'completado',
      fecha: '2024-03-12',
      detalle: 'Historia laboral, certificaciones médicas y cédula.',
    },
    {
      id: 2,
      titulo: 'Reclamación ante Colpensiones',
      estado: 'completado',
      fecha: '2024-04-02',
      detalle: 'Radicado bajo el No. 2024-ER-045891.',
    },
    {
      id: 3,
      titulo: 'Junta de Calificación',
      estado: 'completado',
      fecha: '2024-06-18',
      detalle: 'Dictamen: PCL 62% — origen común.',
    },
    {
      id: 4,
      titulo: 'Demanda Ordinaria Laboral',
      estado: 'en-curso',
      fecha: '2024-08-10',
      detalle: 'Juzgado 12 Laboral del Circuito de Bogotá. Audiencia: 2025-02-14.',
    },
    { id: 5, titulo: 'Sentencia', estado: 'pendiente', fecha: null, detalle: null },
  ],
};
