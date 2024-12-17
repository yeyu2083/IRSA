export interface Tarjeta {
    id: string;
    marca: string;
    descripcion: string;
}

export interface Banco {
    id: string;
    banco: string;
    tarjetas: Tarjeta[];
}