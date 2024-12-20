import { faker } from '@faker-js/faker';

export class PromoCounter {
    static getNextName(): string {
        // Genera un nombre de compañía único
        const PromoName = faker.company.name()
            .replace(/[^a-zA-Z0-9]/g, '') // Elimina caracteres especiales
            .substring(0, 10); // Limita la longitud

        // Agrega un sufijo único
        const uniqueSuffix = faker.string.alphanumeric(4).toUpperCase();
        
        // Combina todo en un formato consistente
        const name = `Promo_${PromoName}_${uniqueSuffix}`;
        
        console.log(`Generando nuevo nombre único: ${name}`);
        return name;
    }
}