export interface CierreNocturno {
    dia: number;          // Representa el día de la semana (0-6, donde 0 es domingo)
    horaInicio: string;   // Representa la hora de inicio en formato "HH:mm:ss"
    horaFin: string;      // Representa la hora de fin en formato "HH:mm:ss"
}

export interface HorarioTrabajo {
    idHorarioTrabajo: string;   // Identificador único del horario de trabajo
    idShopping: number;         // Identificador del shopping
    nombreShopping: string;     // Nombre del shopping
    exceptuado: boolean;        // Indica si está exceptuado
    cierreNocturno: CierreNocturno[]; // Array de objetos CierreNocturno
}