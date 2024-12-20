interface Banco {
    id: string;
    banco: string;
    tarjetas: Tarjeta[];
}

interface Tarjeta {
    id: string;
    marca: string;
    descripcion: string;
}

interface Shopping {
    key: number;
    value: string;
    text: string;
}

interface Rubro {
    rubroSuf: number;
    id: string;
    descripcion: string;
    mnemonico: null;
}

interface Subrubro {
    rubroSuf: null;
    id: string;
    descripcion: string;
    mnemonico: null;
}

interface Descuento {
    IdRubros: string[];
    IdSubRubros: string[];
    IdShoppings: number[];
    Descuento: number;
}

interface basePayload {
    Nombre: string;
    Descripcion: string;
    FechaDesdeAdhesion: string;
    FechaHastaAdhesion: string;
    FechaDesdePromo: string;
    FechaHastaPromo: string;
    Terminos: string;
    URL: string;
    IdTipoServicio: string;
    IdBanco: string;
    Estado: number;
    IdShoppings: number[];
    IdRubros: string[];
    IdSubRubros: string[];
    IdTarjetas: string[];
    AutoHomologar: boolean;
    Descuentos: Array<{
        Descuento: number;
        IdRubros: string[];
        IdSubRubros: string[];
        IdShoppings: number[];
    }>;
}

export { Banco, Tarjeta, Shopping, Rubro, Subrubro, Descuento, basePayload };