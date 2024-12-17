import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Adquiriente } from './intefaces';

test.describe('Adquirientes Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar adquirientes correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/Adquirientes');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const adquirienteResponse = body as Adquiriente[];
        expect(adquirienteResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            nombre: expect.any(String)
        }));
    });
});
