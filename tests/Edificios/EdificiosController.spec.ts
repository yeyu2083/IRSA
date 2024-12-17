import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Edificio } from './interfaces';

test.describe('EdificiosController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar edificios correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/Edificios/Listar');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const edificiosResponse = body as Edificio[];
        expect(edificiosResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            descripcion: expect.any(String),
            //mnemonico: expect.anything()
        }));
    });
});
