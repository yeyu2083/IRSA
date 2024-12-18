import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';
import { UnidadPromo, Unidad } from './interfaces';

test.describe('Unidades Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';
    
    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar unidades por promocion correctamente', async () => {
        const requestBody = {
            "IdShoppings": [],
            "IdRubros": [],
            "IdSubRubros": [],
            "IdPromocion": "caf04f8a-26a3-4d40-b91f-02e8be114ea6"
          }
        const loginResponse = await (await testTools.login(credentials)).json();
        const token = loginResponse.AccessToken;
        const response = await testTools.api.post(baseUrl + '/Unidades',
        {
            headers: {                 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
            },
            data: requestBody
        });
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toBeTruthy();
        const unidadResponse = body as UnidadPromo[];
        expect(unidadResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            localName: expect.any(String),
            idShopping: expect.any(String),
            nombreShopping: expect.any(String),
            subrubros: expect.any(String),
        }));
        
    });

    test('Listar unidades por CUIT correctamente', async () => {
        const requestBody = {
            "cuit": "30716506858",
          }
        const loginResponse = await (await testTools.login(credentials)).json();
        const token = loginResponse.AccessToken;
        const response = await testTools.api.post(baseUrl + '/Unidades/listar',
        {
            headers: {                 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
            },
            data: requestBody
        });
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toBeTruthy();
        const unidadResponse = body as Unidad[];
        expect(unidadResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(String),
            idShopping: expect.any(String),
            nombreShopping: expect.any(String)
            
        }));
        
    });

    test('Listar unidades por servicio correctamente', async () => {
        const requestBody = {
            "IdShoppings": [],
            "IdRubros": [],
            "IdSubRubros": [],
            "IdServicio": "37107CFB-9E2F-48E1-8724-F7CCCAA3D180"
          }
        const loginResponse = await (await testTools.login(credentials)).json();
        const token = loginResponse.AccessToken;
        const response = await testTools.api.post(baseUrl + '/Unidades/listar',
        {
            headers: {                 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
            },
            data: requestBody
        });
        expect(response.status()).toBe(200);
        
        // const body = await response.json();
        // expect(body).toBeTruthy();
        // const unidadResponse = body as Unidad[];
        // expect(unidadResponse[0]).toEqual(expect.objectContaining({
        //     id: expect.any(String),
        //     idShopping: expect.any(String),
        //     nombreShopping: expect.any(String)
            
        // }));
        
    });

});
