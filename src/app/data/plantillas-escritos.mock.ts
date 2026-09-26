export const PLANTILLAS = [
  {
    id: 'reclamacion-colpensiones',
    titulo: 'Reclamación administrativa — Colpensiones',
    categoria: 'Reclamación',
    cuerpo: `Señores
COLPENSIONES
Gerencia de Atención al Ciudadano
Bogotá D.C.

REF: SOLICITUD DE RECONOCIMIENTO DE PENSIÓN DE INVALIDEZ

Yo, {{nombre}}, mayor de edad, identificado(a) con cédula de ciudadanía No. {{cedula}},
actuando en nombre propio, por medio del presente escrito y con fundamento en los
artículos 39 y siguientes de la Ley 100 de 1993, solicito el reconocimiento de la
pensión de invalidez, con base en el dictamen de la Junta Nacional de Calificación
de Invalidez No. {{dictamen}} del {{fechaDictamen}}.

FUNDAMENTOS DE HECHO
1. El suscrito presenta una pérdida de capacidad laboral del {{pcl}}%.
2. Cuento con {{semanas}} semanas cotizadas al Sistema General de Seguridad Social.

FUNDAMENTOS DE DERECHO
Artículos 39, 40 y 41 de la Ley 100 de 1993; Decreto 1833 de 2016.

NOTIFICACIONES
Recibiré notificaciones en la {{direccion}} o al correo {{email}}.`,
  },
  {
    id: 'tutela-mora',
    titulo: 'Acción de tutela por mora — Colpensiones',
    categoria: 'Tutela',
    cuerpo: `Señor
JUEZ DE TUTELA (REPARTO)
E. S. D.

Yo, {{nombre}}, identificado(a) con cédula No. {{cedula}}, interpongo ACCIÓN DE
TUTELA contra COLPENSIONES por la vulneración de mis derechos fundamentales a la
seguridad social, mínimo vital y petición, consagrados en los artículos 48, 53 y 86
de la Constitución Política.

HECHOS
1. El {{fechaSolicitud}} radiqué solicitud de reconocimiento pensional.
2. A la fecha han transcurrido más de 6 meses sin respuesta de fondo.

PRETENSIONES
Ordenar a Colpensiones resolver de fondo la solicitud en el término de 48 horas.`,
  },
  {
    id: 'demanda-laboral',
    titulo: 'Demanda ordinaria laboral — Negativa de pensión',
    categoria: 'Demanda',
    cuerpo: `Señor
JUEZ LABORAL DEL CIRCUITO (REPARTO)
E. S. D.

DEMANDANTE: {{nombre}}
DEMANDADO: COLPENSIONES
RADICADO: {{radicado}}

PRETENSIONES
1. Que se declare que el demandante tiene derecho a la pensión de {{tipoPension}}.
2. Que se condene a Colpensiones al pago del retroactivo con indexación e intereses.

HECHOS
{{hechos}}

FUNDAMENTOS DE DERECHO
Ley 100 de 1993, Ley 797 de 2003, Decreto 1833 de 2016.`,
  },
];
