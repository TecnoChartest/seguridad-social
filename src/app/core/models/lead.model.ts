export type TipoPrestacion =
  | 'invalidez'
  | 'vejez'
  | 'sobrevivientes'
  | 'renta-ciudadana'
  | 'reclamacion'
  | 'historia-laboral'
  | 'otra';

export type CanalContacto = 'telefono' | 'email' | 'whatsapp';

export interface Lead {
  id: string;
  nombre: string;
  telefono?: string;
  email?: string;
  canalPreferido: CanalContacto;
  tipoPrestacion: TipoPrestacion;
  departamento: string;
  ciudad?: string;
  mensaje?: string;
  urgente: boolean;
  aceptaRgpd: boolean;
  creadoEn: Date;
  estado: 'nuevo' | 'contactado' | 'cita' | 'cliente' | 'descartado';
  servicio?: string;
  valorEstimado?: number;
}
