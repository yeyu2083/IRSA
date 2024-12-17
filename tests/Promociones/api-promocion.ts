import { APIRequestContext } from "@playwright/test";
import { config } from "dotenv";
import { expect } from "@playwright/test";
import  { Banco, Shopping, Rubro, Subrubro, PromocionPayload } from "./interfaces";

config();

export class ApiPromocionBancaria {
    api: APIRequestContext;
    url: string;
    constructor(api: APIRequestContext) {
        this.api = api;
        this.url = process.env.BASE_URL ?? "";
    }
    async getBancos(): Promise<Banco[]> {
        const response = await this.api.get(`${this.url}/Banco`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        return data;
    }
    
    async getShoppings(): Promise<Shopping[]> {
        const response = await this.api.get(`${this.url}/Shopping/listar/dropdown/codigo`);
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async getRubros(): Promise<Rubro[]> {
        const response = await this.api.get(`${this.url}/Rubros`);
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async getSubrubros(): Promise<Subrubro[]> {
        const response = await this.api.get(`${this.url}/Subrubros`);
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async crearPromocion(payload: PromocionPayload) {
        const response = await this.api.post(`${this.url}/PromoBancaria`, {
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }
}

