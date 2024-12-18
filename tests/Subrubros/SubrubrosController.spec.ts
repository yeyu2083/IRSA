import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Subrubro, SubrubroSuf } from './interfaces';

test.describe('SubrubrosController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar subrubros completos correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/Subrubros');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const subrubrosResponse = body as SubrubroSuf[];
        expect(subrubrosResponse[0]).toEqual(expect.objectContaining({
            //rubroSuf: expect.anything(),
            id: expect.any(String),
            descripcion: expect.any(String),
            //mnemonico: expect.anything()
        }));
    });

    test('Listar subrubros correctamente', async () => {
        let requestBody = {
            Start: 0,
            Limit: 1000,
            Query: ""
        };
        
        const response = await testTools.api.post(baseUrl + '/Subrubros/listar', {data:requestBody});
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const subrubrosResponse = body as Subrubro[];
        expect(subrubrosResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            descripcion: expect.any(String),
            //mnemonico: expect.anything()
        }));
    });
});
