import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginDataInterno } from '../interfaces/login';
import { HorarioTrabajo } from './interfaces';

test.describe('HorarioTrabajo Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';
    
    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });

    test('Listar horarios de trabajo correctamente', async () => {
        const requestBody = {
            "IdShopping": 52379,
            "Marca": 0
        };
        const loginResponse = await (await testTools.login(credentials)).json();
        const token = loginResponse.AccessToken;
        const response = await testTools.api.post(baseUrl + '/HorarioTrabajo/shopping',
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
        const horarioTrabajoResponse = body as HorarioTrabajo[];
        expect(horarioTrabajoResponse).toEqual(expect.objectContaining({
            idHorarioTrabajo: expect.any(String),
            idShopping: expect.any(Number),
            nombreShopping: expect.any(String),
            exceptuado: expect.any(Boolean),
            cierreNocturno: expect.arrayContaining([
                expect.objectContaining({
                    dia: expect.any(Number),
                    horaInicio: expect.any(String),
                    horaFin: expect.any(String)
                })
            ])
        }));
        
    });

});
