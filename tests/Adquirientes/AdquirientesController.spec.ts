import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { config } from 'dotenv'
test.describe('AdquirientesController Tests', () => {
    let apiContext: APIRequestContext;
    let baseUrl;

    test.beforeAll(async ({ playwright }) => {
        config();
        baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1/';
        apiContext = await playwright.request.newContext({
            baseURL: baseUrl,
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('should list adquirientes successfully', async () => {
        const response = await apiContext.get(baseUrl + '/Adquirientes');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
    });
});
