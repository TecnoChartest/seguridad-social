import { Injectable, signal } from '@angular/core';
import { CO, TASA_REEMPLAZO_RPM } from '../constants/co.constants';

export interface ResultadoVejez {
  edadJubilacion: number;
  semanasFaltantes: number;
  porcentaje: number;
  pensionMensual: number;
  regimen: 'RPM' | 'RAIS' | 'NO_VIABLE';
  advertencias: string[];
}

export interface ResultadoInvalidez {
  grado: 'PARCIAL' | 'TOTAL' | 'ABSOLUTA' | 'NO_CALIFICA';
  pcl: number;
  cuantiaMensual: number;
  viable: boolean;
  mensaje: string;
}

export interface ResultadoRentaCiudadana {
  rentaGarantizada: number;
  complemento: number;
  elegible: boolean;
  observacion: string;
}

@Injectable({ providedIn: 'root' })
export class CalculadoraService {
  /** Pensión de Vejez — Régimen de Prima Media (Colpensiones) */
  calcularVejez(params: {
    fechaNacimiento: Date;
    genero: 'H' | 'M';
    semanasCotizadas: number;
    ibl: number;
  }): ResultadoVejez {
    const hoy = new Date();
    const edadActual =
      hoy.getFullYear() -
      params.fechaNacimiento.getFullYear() -
      (hoy <
      new Date(
        hoy.getFullYear(),
        params.fechaNacimiento.getMonth(),
        params.fechaNacimiento.getDate(),
      )
        ? 1
        : 0);

    const edadJubilacion = params.genero === 'H' ? CO.EDAD_VEJEZ_HOMBRE : CO.EDAD_VEJEZ_MUJER;
    const semanasFaltantes = Math.max(0, CO.SEMANAS_MIN_VEJEZ - params.semanasCotizadas);
    const advertencias: string[] = [];

    if (params.semanasCotizadas < CO.SEMANAS_MIN_VEJEZ) {
      advertencias.push(
        `Te faltan ${semanasFaltantes} semanas para alcanzar las 1.300 exigidas por la Ley 100.`,
      );
    }
    if (edadActual < edadJubilacion) {
      advertencias.push(
        `Aún no alcanzas la edad mínima (${edadJubilacion} años). Tienes ${edadActual} años.`,
      );
    }
    if (params.ibl < CO.SMMLV_2025) {
      advertencias.push(
        `El IBL ingresado ($${params.ibl.toLocaleString('es-CO')}) es inferior al SMMLV 2025.`,
      );
    }

    let porcentaje = 0;
    for (const tramo of [...TASA_REEMPLAZO_RPM].reverse()) {
      if (params.semanasCotizadas >= tramo.semanas) {
        porcentaje = tramo.tasa;
        break;
      }
    }

    const pensionMensual = params.ibl * porcentaje;
    const regimen: ResultadoVejez['regimen'] =
      params.semanasCotizadas >= CO.SEMANAS_MIN_VEJEZ && edadActual >= edadJubilacion
        ? 'RPM'
        : 'NO_VIABLE';

    return { edadJubilacion, semanasFaltantes, porcentaje, pensionMensual, regimen, advertencias };
  }

  /** Pensión de Invalidez — Junta de Calificación */
  calcularInvalidez(params: {
    pcl: number; // 0–100
    semanasCotizadas: number;
    edad: number;
    ibl: number;
  }): ResultadoInvalidez {
    if (params.pcl < CO.PCL_INVALIDEZ_MIN) {
      return {
        grado: 'NO_CALIFICA',
        pcl: params.pcl,
        cuantiaMensual: 0,
        viable: false,
        mensaje:
          'La PCL es inferior al 50%. Podrías acceder a indemnización sustitutiva o rehabilitación, no a pensión de invalidez.',
      };
    }

    // Requisito de semanas (Ley 100 art. 39)
    let cumpleSemanas = false;
    if (params.edad < 20) {
      cumpleSemanas = params.semanasCotizadas >= 50;
    } else {
      const semanasDesde20 = params.semanasCotizadas; // simplificado
      cumpleSemanas = semanasDesde20 >= Math.round(0.25 * (params.edad - 20) * 52.14);
    }

    if (!cumpleSemanas) {
      return {
        grado: 'NO_CALIFICA',
        pcl: params.pcl,
        cuantiaMensual: 0,
        viable: false,
        mensaje: 'No cumples el requisito mínimo de semanas cotizadas (Art. 39 Ley 100/1993).',
      };
    }

    const grado: ResultadoInvalidez['grado'] =
      params.pcl >= 75 ? 'ABSOLUTA' : params.pcl >= 50 ? 'TOTAL' : 'PARCIAL';

    // Tasa de reemplazo invalidez: 40% IBL + 1.5% por cada 50 semanas sobre 500 hasta 75%
    const semanasExtra = Math.max(0, params.semanasCotizadas - 500);
    const tasa = Math.min(0.75, 0.4 + Math.floor(semanasExtra / 50) * 0.015);
    let cuantia = params.ibl * tasa;

    // Piso: SMMLV si cumple requisitos
    cuantia = Math.max(cuantia, CO.SMMLV_2025);

    return {
      grado,
      pcl: params.pcl,
      cuantiaMensual: cuantia,
      viable: true,
      mensaje:
        grado === 'ABSOLUTA'
          ? 'Pensión de invalidez absoluta: 100% del IBL (con topes legales).'
          : 'Pensión de invalidez reconocida. Cuantía mínima: SMMLV.',
    };
  }

  /** Renta Ciudadana — DPS (simplificado) */
  calcularRentaCiudadana(params: {
    adultos: number;
    menores: number;
    ingresosMensuales: number;
  }): ResultadoRentaCiudadana {
    const totalPersonas = params.adultos + params.menores;
    const lineaPobreza = CO.SMMLV_2025 * 0.55 * totalPersonas; // referencial
    const elegible = params.ingresosMensuales < lineaPobreza;

    // Renta garantizada referencial (Decreto 2 de 2024 – DPS)
    let montoBase = 0;
    if (params.menores > 0) montoBase = 380_000 * params.menores;
    if (params.adultos > 0) montoBase += 190_000 * Math.min(params.adultos, 2);

    const complemento = elegible ? Math.min(montoBase, lineaPobreza - params.ingresosMensuales) : 0;

    return {
      rentaGarantizada: montoBase,
      complemento,
      elegible,
      observacion: elegible
        ? 'Podrías ser elegible al programa Renta Ciudadana (DPS). Postúlate con tu Sisbén IV.'
        : 'Tus ingresos superan la línea de pobreza referencial. Verifica otros programas.',
    };
  }

  /** Cálculo del IBL (Ingreso Base de Liquidación) — últimos 10 años o toda la vida */
  calcularIBL(bases: number[]): { ibl: number; baseReguladora: number; totalSemanas: number } {
    const totalSemanas = bases.length * 4.33; // aproximación
    const ibl = bases.reduce((a, b) => a + b, 0) / (bases.length || 1);
    return { ibl, baseReguladora: ibl, totalSemanas: Math.round(totalSemanas) };
  }
}
