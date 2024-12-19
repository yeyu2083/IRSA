import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

test.describe('MarcasController Tests', () => {
    let apiContext: APIRequestContext;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL: process.env.API_BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1/',
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('should list marcas successfully', async () => {
        //need login
        const response = await apiContext.post('Marcas/Listar');
        expect(response.status()).toBe(400);
        
        const body = await response.json();
        expect(body).toEqual("No se pudieron listar las marcas.");
    });

    test('should list all marcas successfully', async () => {
        const response = await apiContext.post('Marcas/all');
        console.log(response);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toBeTruthy();
    });
});
