import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Tarjeta } from './interfaces';

test.describe('TarjetasController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar tarjetas completos correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/Tarjetas');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const tarjetasResponse = body as Tarjeta[];
        expect(tarjetasResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            descripcion: expect.any(String),
            //mnemonico: expect.anything()
        }));
    });
});
