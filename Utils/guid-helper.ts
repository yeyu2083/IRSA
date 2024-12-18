// Tipo para representar un GUID
export type GUID = string;

// Función para generar un nuevo GUID
export function generateGuid(): GUID {
    // Genera un GUID utilizando el método de la API de crypto
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }) as GUID;
}

// Función para validar un GUID
export function isValidGuid(guid: string): boolean {
    const guidRegex = /^[{(]?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})[)}]?$/i;
    return guidRegex.test(guid);
}