import { APIRequestContext } from "@playwright/test";
import { LoginDataInterno } from "../interfaces/login";
import { Promocion } from "./interfaces";


export class ApiHomologacion {
    api: APIRequestContext;
    url: string;
    token: string;
    constructor(api: APIRequestContext) {
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
    async listarHomologaciones(promocion: Promocion) {
        return await this.api.post(`${this.url}/Promocion/listar`, {
            data: promocion,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        });
       
    }
}