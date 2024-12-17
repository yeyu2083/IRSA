import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';

test.describe('API Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';
    
    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Debería realizar login exitosamente', async () => {
        const loginResponse = await testTools.login(credentials);
        expect(loginResponse.status()).toBe(200);
        
        const responseData = await loginResponse.json();
        expect(responseData.AccessToken).toBeDefined();
        
        console.log('Login exitoso');
        console.log ('Token:', responseData.AccessToken);
    });
    test('no debería permitir login con credenciales inválidas', async () => {
        const invalidCredentials = 
        { Username: 'usuario_invalido',
          Password: 'clave_invalida'
     };
        const loginResponse = await testTools.login(invalidCredentials);
        const responseData = await loginResponse.json();
        expect(loginResponse.status()).toBe(500);
        expect(loginResponse.ok()).toBe(false);

        expect(responseData).toMatchObject({
            StatusCode: 500,
            Message: "An error occurred while processing your request.",
            Details: expect.stringContaining("Error en login FWS: ( STATUS: Unauthorized")
        });
        
       
     
    });

    test('No debería listar marcas', async () => {
        
        
        const marcasResponse = await testTools.api.post (`${baseUrl}/Marcas/Listar`);
        expect(marcasResponse.status()).toBe(400);
        
        const marcasData = await marcasResponse.json();
        expect(marcasData).toEqual("No se pudieron listar las marcas.");
        
    });
});