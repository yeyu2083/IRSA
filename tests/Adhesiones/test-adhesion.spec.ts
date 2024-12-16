import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';
import { TokenStore } from '../../Utils/token-store';



test.describe('API Tests', () => {
    let testTools: TestTools;
    const baseUrl = 'https://irsa-dev-backend.wi-soft.net/api/v1';

    test.beforeAll(async ({ request }) => {
        testTools = new TestTools(request);
        await performLogin(testTools);
    });

    async function performLogin(testTools: TestTools): Promise<void> {
        const credentials: LoginDataInterno = {
            Username: 'asapconsulting',
            Password: 'Inicio.2025'
        };
        const login = await testTools.loginPostInterno(`${baseUrl}/Login/login`, credentials);
        const response = await login.json();
        TokenStore.setToken(response.AccessToken);
    }

    test('Login', async ({ request }) => {
        const testTools = new TestTools(request);
        const credentials: LoginDataInterno = {
            Username: 'asapconsulting',
            Password: 'Inicio.2025'
        };

        const login = await testTools.loginPostInterno(`${baseUrl}/Login/login`, credentials);
        const response = await login.json();
        
        expect(login.status()).toBe(200);
        TokenStore.setToken(response.AccessToken);
        expect(TokenStore.getToken()).toBeTruthy();

        console.log('Token almacenado en el almacenamiento local:', TokenStore.getToken());
        console.log('Login exitoso:', response);
    });

    test('debería devolver error al intentar listar marcas sin body', async ({ request }) => {
        const testTools = new TestTools(request);
        
        const token = TokenStore.getToken();
        console.log('Este es el token dentro del test', token);
        
        const marcas = await testTools.postInterno(`${baseUrl}/Marcas/Listar`);
        const response = await marcas.json();
        
        expect(marcas.status()).toBe(200);
        console.log(response);
    });
});





