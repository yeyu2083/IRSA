import { APIRequestContext } from "@playwright/test";
import { config } from "dotenv";
import { LoginDataInterno } from "../tests/interfaces/login";

config();

export class TestTools {
    public api: APIRequestContext;
    public url: string;
    public token: string;

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

    async postInterno(url: string, body?: LoginDataInterno) {
        const response = await this.api.post(url, {
            data: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        });
        return response;
    }
}