import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { Shopping } from './interfaces';

test.describe('ShoppingController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar shopping por usuario correctamente', async () => {
        let userId = 'D8914627-10A1-487F-8F9E-6F1166E4C781';
        const response = await testTools.api.get(baseUrl + '/Shopping/listar?userId='+userId);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const shoppingResponse = body as Shopping[];
        expect(shoppingResponse[0]).toEqual(expect.objectContaining({
            key: expect.any(Number),
            value: expect.any(String),
            text: expect.any(String),
        }));
    });

    test('Listar shoppings correctamente', async () => {
        
        const response = await testTools.api.get(baseUrl + '/Shopping/listar/dropdown/codigo');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const shoppingResponse = body as Shopping[];
        expect(shoppingResponse[0]).toEqual(expect.objectContaining({
            key: expect.any(Number),
            value: expect.any(String),
            text: expect.any(String),
        }));
    });

});
