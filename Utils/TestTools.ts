import { APIRequestContext } from "@playwright/test";
import {config} from 'dotenv';
import { LoginData } from "../tests/interfaces/login";
import {TokenStore} from '../Utils/token-store';



config();
export class TestTools {
     api: APIRequestContext;
     url: string;
    
    constructor(api: APIRequestContext) {
        this.api = api;
        this.url = process.env.BASE_URL ?? '';
        
    }
    async post(url: string, body:LoginData) {
        const response = await this.api.post(url, {
            data:body,
            headers: {
                'Content-Type': 'application/json',
               
            }
        });
        return response;
    
    }
    async get(url: string) {
        const response = await this.api.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenStore.getToken()}`
            }
        });
        return response;
    }

}       
