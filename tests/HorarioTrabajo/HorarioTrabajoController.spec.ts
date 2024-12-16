import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { config } from 'dotenv';

test.describe('HorarioTrabajoController Tests', () => {
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

    test('should list horarios trabajo successfully', async () => {
        const requestBody = {
            "IdShopping": 0,
            "Marca": 0
        };
        //need login
        const response = await apiContext.post(baseUrl + '/HorarioTrabajo/shopping',{
            data: requestBody

        })
        
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toBe("Usuario no encontrado en GetSessionUser"); //se podria agregar a la api la propiedad message
        
    });

    test('should list horarios trabajo fail', async () => {
        //need login
        
        const response = await apiContext.post(baseUrl + '/HorarioTrabajo/shopping', {
            data: {
                "IdShopping": 0,
                "Marca": 0
            }
        });
        //expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        
        const body = await response.json();
        expect(body).toBeTruthy();
        //expect(Array.isArray(body)).toBeTruthy();
    });
});
