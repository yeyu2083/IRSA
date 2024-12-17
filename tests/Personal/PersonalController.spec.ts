import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';
import { Personal } from './interfaces';

test.describe('PersonalController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';
    
    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar personal correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/Personal/Listar');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
        const personalResponse = body as Personal[];
        expect(personalResponse[0]).toEqual(expect.objectContaining({
            nombre: expect.any(String),
            apellido: expect.any(String),
            tipoDocumentoSAP: expect.any(String),
            tipoDocumento: expect.any(String),
            numeroDocumento: expect.any(String),
            nombreArt: expect.any(String),
            telefonoArt: expect.any(String)
        }));
    });

    test('Crear personal', async () => {
        const newPersonal = {
            nombre: 'Test Personal',
            apellido: 'Test Apellido',
            tipoDocumentoSAP: "96",
            numeroDocumento: "99998888",
            nombreArt: "Excelsiur",
            telefonoArt: "01190909090"
        };
        const loginResponse = await (await testTools.login(credentials)).json();
        const token = loginResponse.AccessToken;
        const response = await testTools.api.post(baseUrl + '/Personal/Crear', {
            data: newPersonal,
            headers: {                 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
            },
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
    });
});
