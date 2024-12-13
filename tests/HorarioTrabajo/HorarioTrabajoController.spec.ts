import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

test.describe('HorarioTrabajoController Tests', () => {
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

    test('should list horarios trabajo successfully', async () => {
        //need login
        const response = await apiContext.post('HorarioTrabajo/shopping');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
    });

    test('should list horarios trabajo fail', async () => {
        //need login
        const response = await apiContext.post('HorarioTrabajo/shopping');
        //expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        
        const body = await response.json();
        expect(body).toBeTruthy();
        //expect(Array.isArray(body)).toBeTruthy();
    });
});
