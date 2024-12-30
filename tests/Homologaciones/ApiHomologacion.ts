import { APIRequestContext, APIResponse } from "@playwright/test";
import { LoginDataInterno } from "../interfaces/login";
import { Promocion } from "./interfaces";
import { TestTools } from "../../Utils/TestTools";


export class ApiHomologacion extends TestTools {
    api: APIRequestContext;
    url: string;
    token: string;
    constructor(api: APIRequestContext) {
        super(api);
        this.api = api;
        this.url = process.env.BASE_URL ?? "";
        this.token = '';
    }
    async login(credentials: LoginDataInterno): Promise<APIResponse> {
        const url = `${this.url}/Login/login`;
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await this.api.post(`${this.url}/Login/login`, {
            data: credentials,
            headers
            }
        );

        const responseData = await this.logRequestResponse('POST', url, headers, credentials, response)
        this.token = responseData.AccessToken; // Cambiado de data.token a AccessToken
        return response;
    }
    async listarHomologaciones(promocion: Promocion): Promise<APIResponse> {
        const url = `${this.url}/Promocion/listar`;
        const headers = this.getAuthHeaders(); // 👈 Usa el método heredado para los headers

        const response = await this.api.post(url, {
            data: promocion,
            headers
        });

        await this.logRequestResponse('POST', url, headers, promocion, response);
        return response;
    }
}