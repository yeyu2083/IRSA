import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';

test.describe('EdificiosController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';
    
    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('should list edificios successfully', async () => {
        const response = await testTools.api.get(baseUrl + '/Edificios/Listar');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
    });
});
