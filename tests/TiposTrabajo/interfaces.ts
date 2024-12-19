export interface TiposTrabajo {
    id: number;
    categoria: string;
    descripcion: string;
    activo: boolean | null;
    aprobacionAutomatica: boolean;
    activoAcompaniamientoSeguridad: boolean;
    visibleAcompaniamientoSeguridad: boolean;
}

export interface TiposTrabajoById {
    idTipoTrabajo: number;
    descripcion: string;
    idTrabajo: number | null;
    activo: boolean | null;
    activoAcompaniamientoSeguridad: boolean;
    visibleAcompaniamientoSeguridad: boolean;
    aprobacionAutomatica: boolean;
    fechahoraModificacion: string | null;
    usuarioModificacion: string;
    valorAnterior: string;
    firmaRequerida: FirmaRequerida[];
    tiposTrabajoPreAprobacions: TiposTrabajoPreAprobacion[];
}

export interface FirmaRequerida {
    idFirmaRequerida: string;
    idTipoTrabajo: number;
    roleId: string;
    vigente: boolean;
    fechaCreacion: string;
}

export interface TiposTrabajoPreAprobacion {
    idTiposTrabajoPreAprobacion: string;
    idProyecto: string;
    idTipoTrabajo: string;
}

export interface RolesFirmantes {
    roleId: string;
    roleName: string;
    loweredRoleName: string;
}

export interface Trabajo {
    id: number;
    descripcion: string;
    activo: boolean | null;
}