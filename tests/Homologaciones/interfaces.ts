export interface Promocion {
    Nombre: string | null;
    FechaDesdePromo: string | null;
    FechaHastaPromo: string | null;
    FechaDesdeAdhesion: string | null;
    FechaHastaAdhesion: string | null;
    IdTipo: string | null;
    IdAplicacion: string | null;
    IdBanco: string | null;
    IdShopping: string | null;
    Estado: string;
    isInterno: boolean;
}
