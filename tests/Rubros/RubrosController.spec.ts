import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Rubro, RubroSuf } from './interfaces';

test.describe('RubrosController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar rubros completos correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/Rubros');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const rubrosResponse = body as RubroSuf[];
        expect(rubrosResponse[0]).toEqual(expect.objectContaining({
            rubroSuf: expect.any(Number),
            id: expect.any(String),
            descripcion: expect.any(String),
            //mnemonico: expect.anything()
        }));
    });

    test('Listar rubros correctamente', async () => {
        let requestBody = {
            Start: 0,
            Limit: 1000,
            Query: ""
        };
        
        const response = await testTools.api.post(baseUrl + '/Rubros/listar', {data:requestBody});
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const rubrosResponse = body as Rubro[];
        expect(rubrosResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            descripcion: expect.any(String),
            //mnemonico: expect.anything()
        }));
    });
});
