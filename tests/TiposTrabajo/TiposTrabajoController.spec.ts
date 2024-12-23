import { test, expect } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { RolesFirmantes, TiposTrabajo, TiposTrabajoById, Trabajo } from './interfaces';

test.describe('TiposTrabajoController Tests', () => {
    let testTools: TestTools;
    const baseUrl = process.env.BASE_URL || 'https://irsa-dev-backend.wi-soft.net/api/v1';
    
    

    test.beforeEach(async ({ request }) => {
        testTools = new TestTools(request);
    });
    test('Listar tipos trabajo correctamente', async () => {
        const response = await testTools.api.get(baseUrl + '/TiposTrabajo/listar');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        const tipoTrabajoResponse = body as TiposTrabajo[];
        expect(tipoTrabajoResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            categoria: expect.any(String),
            descripcion: expect.any(String),
            activo: expect.any(Boolean),
            aprobacionAutomatica: expect.any(Boolean),
            activoAcompaniamientoSeguridad: expect.any(Boolean),
            visibleAcompaniamientoSeguridad: expect.any(Boolean),
        }));
    });

    test('Obtener un tipo trabajo by id successfully', async () => {
        const id = 1; // Replace with a valid ID
        const response = await testTools.api.get(baseUrl + `/TiposTrabajo/obtenerPorId?id=${id}`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        const tipoTrabajoResponse = body as TiposTrabajoById;
        expect(tipoTrabajoResponse).toEqual(expect.objectContaining({
            idTipoTrabajo: expect.any(Number),
            idTrabajo: expect.any(Number),
            descripcion: expect.any(String),
            activo: expect.any(Boolean),
            aprobacionAutomatica: expect.any(Boolean),
            activoAcompaniamientoSeguridad: expect.any(Boolean),
            visibleAcompaniamientoSeguridad: expect.any(Boolean),
            fechahoraModificacion: expect.any(String),
            valorAnterior: expect.any(String),
            firmaRequerida: expect.any(Array),
            tiposTrabajoPreAprobacions: expect.any(Array)
        }));
        const usuarioModificacion = tipoTrabajoResponse.usuarioModificacion;
        expect(usuarioModificacion).toBeNull(); 
        if (usuarioModificacion !== null) {
            expect(typeof usuarioModificacion).toBe('string'); 
        }
        expect(tipoTrabajoResponse.firmaRequerida).toEqual(expect.arrayContaining([
            expect.objectContaining({
                idFirmaRequerida: expect.any(String),
                idTipoTrabajo: expect.any(Number),
                roleId: expect.any(String),
                vigente: expect.any(Boolean),
                fechaCreacion: expect.any(String)
            })
        ]));
        expect(Array.isArray(tipoTrabajoResponse.tiposTrabajoPreAprobacions)).toBeTruthy();
        expect(tipoTrabajoResponse.tiposTrabajoPreAprobacions.length).toBe(0);
        if (tipoTrabajoResponse.tiposTrabajoPreAprobacions.length > 0) {
            expect(tipoTrabajoResponse.tiposTrabajoPreAprobacions).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    idTipoTrabajoPreAprobacion: expect.any(String),
                    idTipoTrabajo: expect.any(Number),
                })
            ]));
        }
    });

    test('Obtener un tipo trabajo por id invalido', async () => {
        const invalidId = 99999999; // Use an invalid ID
        const response = await testTools.api.get(baseUrl + `/TiposTrabajo/obtenerPorId?id=${invalidId}`);
        expect(response.status()).toBe(200);
    });

    test('Crear tipos trabajo correctamente', async () => {
        const newTipoTrabajo = {
            descripcion: 'Test Description',
            activo: true,
            aprobacionAutomatica: true,
            idTrabajo: 1
        };

        const response = await testTools.api.post(baseUrl + '/TiposTrabajo/crear', {
            data: newTipoTrabajo
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toHaveProperty('idTiposTrabajo');
        expect(body.descripcion).toBe(newTipoTrabajo.descripcion);
    });

    test('Actualizar tipos trabajo correctamente', async () => {
        const updatedTipoTrabajo = {
            id: 171, // Replace with a valid ID
            descripcion: 'Test Description updated',
            activo: true,
            aprobacionAutomatica: true,
            idTrabajo: 1
        };

        const response = await testTools.api.put(baseUrl + '/TiposTrabajo/modificar', {
            data: updatedTipoTrabajo
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toHaveProperty('idTiposTrabajo');
        expect(body.descripcion).toBe(updatedTipoTrabajo.descripcion);
    });

    test('Crear tipos trabajo invalidamente', async () => {
        const invalidTipoTrabajo = {
            // Missing required fields
        };

        const response = await testTools.api.post(baseUrl + '/TiposTrabajo/crear', {
            data: invalidTipoTrabajo
        });
        
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
    });

    test('Actualizar tipos trabajo invalidamente', async () => {
        const invalidTipoTrabajo = {
            id: 999999, // Invalid ID
            nombre: 'Invalid Update'
        };

        const response = await testTools.api.put(baseUrl + '/TiposTrabajo/modificar', {
            data: invalidTipoTrabajo
        });
        
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
    });

    test('Listar roles firmantes', async () => {
        const response = await testTools.api.get(baseUrl + '/TiposTrabajo/ListarRolesFirmantes');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        const rolesFirmantesResponse = body as RolesFirmantes[];
        expect(rolesFirmantesResponse[0]).toEqual(expect.objectContaining({
            roleId: expect.any(String),
            roleName: expect.any(String),
            loweredRoleName: expect.any(String)
        }));

        
    });

    test('Listar trabajos', async () => {
        const response = await testTools.api.get(baseUrl + '/TiposTrabajo/ListarTrabajos');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        const trabajoResponse = body as Trabajo[];
        expect(trabajoResponse[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            descripcion: expect.any(String),
            activo: expect.any(Boolean)
        }));
    });
});
