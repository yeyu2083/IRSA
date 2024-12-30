import { APIRequestContext } from "@playwright/test";
import { config } from "dotenv";
import { expect } from "@playwright/test";
import { LoginDataInterno } from "../interfaces/login";
import { TestTools } from "../../Utils/TestTools";

import  { Banco, Shopping, Rubro, Subrubro, basePayload } from "./interfaces";

config();

export class ApiPromocionBancaria extends TestTools {
  
    api: APIRequestContext;
    url: string;
    token: string;
    constructor(api: APIRequestContext) {
        super(api);
        this.api = api;
        this.url = process.env.BASE_URL ?? "";
        this.token = '';
    }
  
    async login(credentials: LoginDataInterno) {
            const response = await this.api.post(`${this.url}/Login/login`, {
                data: credentials,
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            this.token = responseData.AccessToken; // Cambiado de data.token a AccessToken
            return response;
        }
    async getBancos(): Promise<Banco[]> {
        const response = await this.api.get(`${this.url}/Banco`);
        expect(response.status()).toBe(200);
        const headers = this.getAuthHeaders();
        await this.logRequestResponse('GET', this.url, headers, undefined, response);
        return response.json();
        
    }
    
    async getShoppings(): Promise<Shopping[]> {
        const response = await this.api.get(`${this.url}/Shopping/listar/dropdown/codigo`);
        expect(response.ok()).toBeTruthy()
        const headers = this.getAuthHeaders();
        await this.logRequestResponse('GET', this.url,headers, undefined, response);;
        return response.json();
    }

    async getRubros(): Promise<Rubro[]> {
        const response = await this.api.get(`${this.url}/Rubros`);
        expect(response.ok()).toBeTruthy();
        const headers = this.getAuthHeaders();
        await this.logRequestResponse('GET', this.url, headers, undefined, response);
        return  response.json();
    }

    async getSubrubros(): Promise<Subrubro[]> {
        const response = await this.api.get(`${this.url}/Subrubros`);
        expect(response.ok()).toBeTruthy();
        const headers = this.getAuthHeaders();
        await this.logRequestResponse('GET', this.url, headers, undefined, response);
        return response.json();
    }

   
    async crearPromocion(payload: basePayload) {
        //console.log('Payload a enviar:', JSON.stringify(payload, null, 2));
        const formData = new FormData();
        const url = `${this.url}/PromoBancaria`;
        const headers = {
            "Authorization": `Bearer ${this.token}`
        };

        // Datos básicos
        Object.entries(payload).forEach(([key, value]) => {
            if (!['IdShoppings', 'IdRubros', 'IdSubRubros', 'Descuentos'].includes(key)) {
                formData.append(key, value.toString());
            }
        });

        // Arrays simples
        ['IdShoppings', 'IdRubros', 'IdSubRubros'].forEach(field => {
            payload[field]?.forEach((id, index) => {
                formData.append(`${field}[${index}]`, id.toString());
            });
        });

        // Descuentos
        payload.Descuentos?.forEach((descuento, i) => {
            formData.append(`Descuentos[${i}][Descuento]`, descuento.Descuento.toString());
            
            ['IdRubros', 'IdSubRubros', 'IdShoppings'].forEach(field => {
                descuento[field]?.forEach((id, index) => {
                    formData.append(`Descuentos[${i}][${field}][${index}]`, id.toString());
                });
            });
        });
        
        const response = await this.api.post(url, {
            headers,
            multipart: {
                payload: JSON.stringify(payload)
            }
        });

        await this.logRequestResponse('POST', this.url, headers, payload, response);
       
        return {
            status: response.status(),
            data: await response.json()
        };

     ;
    }
}