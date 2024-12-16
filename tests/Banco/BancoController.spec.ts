import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { config } from 'dotenv';

test.describe('BancoController Tests', () => {
    let apiContext: APIRequestContext;
    const baseUrl = process.env.API_BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1/'; // Adjust port as needed

    test.beforeAll(async ({ playwright }) => {
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

    test('should get all bancos successfully', async () => {
        const response = await apiContext.get('banco');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
    });

    
});
