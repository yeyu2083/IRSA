import { APIRequestContext } from "@playwright/test";
import { config } from "dotenv";
import { LoginDataInterno, LoginDataLocatario } from "../tests/interfaces/login";
import { TokenStore } from "../Utils/token-store";

config();

export class TestTools {
    api: APIRequestContext;
    url: string;

    constructor(api: APIRequestContext) {
        this.api = api;
        this.url = process.env.BASE_URL ?? "";
    }

    async postLocatario(url: string, body?: LoginDataLocatario) {
        const response = await this.api.post(url, {
            data: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TokenStore.getToken()}`
            }
        });
        return response;
    }

    async get(url: string) {
        const response = await this.api.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TokenStore.getToken()}`
            }
        });
        return response;
    }

    async postInterno(url: string, body?: LoginDataInterno) {
        const response = await this.api.post(url, {
            data: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TokenStore.getToken()}`
            }
        });
        return response;
    }

    async loginPostInterno(url: string, body: LoginDataInterno) {
        const response = await this.api.post(url, {
            data: body
        });
        // TokenStore.setToken(response.AccessToken);
        return response;
    }
}