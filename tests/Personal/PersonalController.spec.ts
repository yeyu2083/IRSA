import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

test.describe('PersonalController Tests', () => {
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

    test('should list personal successfully', async () => {
        const response = await apiContext.get('Personal/Listar');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
    });

    test('should create personal', async () => {
        const newPersonal = {
            nombre: 'Test Personal',
            apellido: 'Test Apellido',
            dni: '12345678',
            email: 'test@example.com'
        };

        const response = await apiContext.post('Personal/Crear', {
            data: newPersonal
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toHaveProperty('id');
    });
});
