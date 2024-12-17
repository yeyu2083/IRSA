import { test , expect} from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';
import { config } from 'dotenv';
config();   

test.describe('Promociones Bancarias Tests', () => {
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
        
    test('No debería listar marcas', async () => {
        
        
        const bancosResponse = await testTools.api.get (`${baseUrl}/Banco`);
        expect(bancosResponse.status()).toBe(200);
        
        const bancos = await bancosResponse.json();
       console.log  (bancos);
        
    });

});