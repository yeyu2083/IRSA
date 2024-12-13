import { APIRequestContext } from "@playwright/test";
import {config} from 'dotenv';
import { LoginData } from "../tests/interfaces/login";

config();
export class TestTools {
    api: APIRequestContext;
    url: string;
    apiPost: APIRequestContext['post'];

    constructor(api: APIRequestContext) {
        this.api = api;
        this.url = process.env.BASE_URL ?? '';
        this.apiPost = this.api.post;
    }
    async post(url: string, data:LoginData) {
        const response = await this.api.post(url, {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    
    }

}       
