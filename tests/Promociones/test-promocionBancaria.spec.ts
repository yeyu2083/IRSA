import { test, expect } from '@playwright/test';
import { LoginDataInterno } from '../interfaces/login';
import{ ApiPromocionBancaria } from './api-promocion';
import { TestTools } from '../../Utils/TestTools';
import { config } from 'dotenv';
config();   

test.describe('Promociones Bancarias Tests', () => {
    let testTools: TestTools;
    let apiPromo: ApiPromocionBancaria;

    const credentials: LoginDataInterno = {
        Username: 'asapconsulting',
        Password: 'Inicio.2025'
    };
    const basePayload = {
        Nombre: "api_testing 24",
        Descripcion: "test",
        FechaDesdeAdhesion: "2024-12-20T00:00:00",
        FechaHastaAdhesion: "2024-12-31T00:00:00",
        FechaDesdePromo: "2024-12-20T00:00:00",
        FechaHastaPromo: "2025-01-01T00:00:00",
        Terminos: "",
        URL: "",
        IdTipoServicio: "BA682D6D-E001-415C-B09D-F48266ACEB7F",
        Estado: 1,
        IdShoppings: [53512, 54207, 54489, 59902, 54794, 52379],
        IdRubros: ["2000"],
        IdSubRubros: ["20202"],
        IdTarjetas: ["6516ccd5-3b8d-4237-ba09-01234ab8bf28"],
        AutoHomologar: false,
        Descuentos: [{
            IdRubros: ["2000"],
            IdSubRubros: ["20202"],
            IdShoppings: [53512, 54207, 54489, 59902, 54794, 52379],
            Descuento: 20
        }]
    };

    

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    apiPromo = new ApiPromocionBancaria(request);
    // Hacer login y establecer el token
    const loginResponse = await testTools.login(credentials);
    const responseData = await loginResponse.json();
    apiPromo.token = responseData.AccessToken;
    });

    
    test('crear promoción bancaria', async () => {
        console.log('Token antes de crear promoción:', apiPromo.token);
        expect(apiPromo.token).toBeTruthy();
       
        const bancos = await apiPromo.getBancos();
        
        
            
        // Crear payload
        const promocionPayload = {
            Nombre: "api_testing 2024",
            Descripcion: "test",
            FechaDesdeAdhesion: "2024-12-20T00:00:00",
            FechaHastaAdhesion: "2024-12-31T00:00:00",
            FechaDesdePromo: "2024-12-20T00:00:00",
            FechaHastaPromo: "2025-01-01T00:00:00",
            Terminos: "",
            URL: "",
            IdTipoServicio: "BA682D6D-E001-415C-B09D-F48266ACEB7F",
            IdBanco: bancos[0].id,
            Estado: 1,
            IdShoppings: [53512, 54207, 54489, 59902, 54794, 52379],
            IdRubros: ["2000"],
            IdSubRubros: ["20202"],
            IdTarjetas: ["6516ccd5-3b8d-4237-ba09-01234ab8bf28"],
            AutoHomologar: false,
            Descuentos: [{
                IdRubros: ["2000"],
                IdSubRubros: ["20202"],
                IdShoppings: [53512, 54207, 54489, 59902, 54794, 52379],
                Descuento: 20
            }]
        };

        const response = await apiPromo.crearPromocion(promocionPayload);
        expect(response).toBeTruthy()
    });
    test('Error al crear promoción con fechas pasadas', async () => {
        const payload = {
            ...basePayload,
            IdBanco: "bancos[0].id",
            FechaDesdeAdhesion: "2023-12-20T00:00:00",
            FechaHastaAdhesion: "2023-12-31T00:00:00"
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeTruthy();
    });

}); 
