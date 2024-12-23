import { test, expect } from '@playwright/test';
import { LoginDataInterno } from '../interfaces/login';
import { TestTools } from '../../Utils/TestTools';
import { Promocion } from './interfaces';
import { config } from 'dotenv';
config();
import { ApiHomologacion } from './ApiHomologacion'


test.describe('HomologacionesController Tests', () => {
    let testTools: TestTools;
    let apiHomologacion: ApiHomologacion;

    
    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };

     test.beforeEach(async ({ request }) => {
            
        testTools = new TestTools(request);
        apiHomologacion = new ApiHomologacion(request);
        // Hacer login y establecer el token
        const loginResponse = await testTools.login(credentials);
        const responseData = await loginResponse.json();
        apiHomologacion.token = responseData.AccessToken;
        });
    test('Listar homologaciones', async () => {
            const Promocion: Promocion = {
                Nombre: null,
                FechaDesdePromo: null,
                FechaHastaPromo: null,
                FechaDesdeAdhesion: null,
                FechaHastaAdhesion: null,
                IdTipo: null,
                IdAplicacion: null,
                IdBanco: null,
                IdShopping: null,
                Estado: "1",
                isInterno: true
            };
            
            const response = await apiHomologacion.listarHomologaciones(Promocion);
            const homologaciones = await response.json();
            console.log('homologaciones:', homologaciones);
            expect(homologaciones).toBeDefined();
            expect(response.ok()).toBeTruthy();
            expect(response.status()).toBe(200);
        });


    
    

});
