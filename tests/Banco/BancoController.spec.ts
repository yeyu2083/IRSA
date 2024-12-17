import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Banco } from './interfaces';

test.describe('Banco Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar todos los bancos correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/banco');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();   
        const bancosResponse = body as Banco[];
        expect(bancosResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            banco: expect.any(String),
            tarjetas: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    marca: expect.any(String),
                    descripcion: expect.any(String)
                })
            ])
        }));
    });

    
});
