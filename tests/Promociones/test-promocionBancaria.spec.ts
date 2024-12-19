import { test, expect } from '@playwright/test';
import { LoginDataInterno } from '../interfaces/login';
import{ ApiPromocionBancaria } from './api-promocion';
import { TestTools } from '../../Utils/TestTools';
import { PromoCounter } from '../../Utils/promo-counter';
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
        Nombre: "api_testing 25",
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
       
        
        
        
            
        // Crear payload
        const promocionPayload = {
            Nombre: PromoCounter.getNextName(),
            Descripcion: "test",
            FechaDesdeAdhesion: "2024-12-20T00:00:00",
            FechaHastaAdhesion: "2024-12-31T00:00:00",
            FechaDesdePromo: "2024-12-20T00:00:00",
            FechaHastaPromo: "2025-01-01T00:00:00",
            Terminos: "",
            URL: "",
            IdTipoServicio: "BA682D6D-E001-415C-B09D-F48266ACEB7F",
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
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
        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
        console.log('Respuesta recibida:', response);

    });
    test('Error al crear promoción con fechas pasadas', async () => {
        const payload = {
            ...basePayload,
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            FechaDesdeAdhesion: "2023-12-20T00:00:00",
            FechaHastaAdhesion: "2023-12-31T00:00:00"
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeTruthy();
        expect(response.status).toBe(400);
        expect(response.data).toBe("El campo fecha no puede ser menor a la fecha presente");
       
     
      
    });
    test('Error al crear promoción sin nombre', async () => {
        const payload = {
            ...basePayload,
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            Nombre: ""
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("Debe ingresar un Nombre");
    
    });
    test('Error al crear promoción sin tarjetas seleccionadas', async () => {
        const payload = {
            ...basePayload,
            Nombre: "Promocion sin tarjetas 123",
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            IdTarjetas: [""]
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("Error converting value \"\" to type 'System.Guid'. Path 'IdTarjetas[0]', line 1, position 428.");
    });
    
    test('Error al crear promoción con descuento inválido', async () => {
        const payload = {
            ...basePayload,
            Nombre: "Promocion con descuento inválido",
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            Descuentos: [{
                IdRubros: ["2000"],
                IdSubRubros: [""],
                IdShoppings: [53512],
                Descuento: 1000  // Descuento mayor a 100%
            }]
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("El descuento debe ser un valor entre 1 y 100");
    });
    
    test('Error al crear promoción sin shoppings', async () => {
        const payload = {
            ...basePayload,
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            IdShoppings: []
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("Debe seleccionar al menos un shopping");
    });
    
    test('Error al crear promoción con tipo de servicio inválido', async () => {
        const payload = {
            ...basePayload,
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            IdTipoServicio: "invalid-uuid"
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("Error converting value \"invalid-uuid\" to type 'System.Guid'. Path 'IdTipoServicio', line 1, position 268.");
    });
    
    test('Error al crear promoción con fechas de adhesión inválidas', async () => {
        const payload = {
            ...basePayload,
            Nombre: "api 1 * 2",
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            FechaDesdeAdhesion: "2024-12-20T00:00:00",
            FechaHastaAdhesion: "2024-12-01T00:00:00",
            FechaDesdePromo: "2024-12-20T00:00:00",
            FechaHastaPromo: "2024-01-01T00:00:00",
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("La fecha hasta de adhesion no puede ser mayor a la fecha hasta de promocion");
    });
    
    test('Error al crear promoción con nombre repetido', async () => {
        const payload = {
            ...basePayload,
            IdBanco: "79d23353-ec14-4aaa-9612-01a04252cffe",
            IdRubros: ["2000"],
            IdSubRubros: ["2000"],
            Nombre: "apiiii_testing 2024",
        };
        const response = await apiPromo.crearPromocion(payload);
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        expect(response.data).toBe("Ya existe promoción con el nombre especificado.");
    });

}); 
