import { APIRequestContext } from '@playwright/test';
import { LoginDataInterno } from '../tests/interfaces/login';
import { TestTools } from '../Utils/TestTools';
import { TokenStore } from '../Utils/token-store';
import { config } from 'dotenv';

config();

export class AuthHelper extends TestTools {
    constructor(api: APIRequestContext) {
        super(api);
    }

    async login(credentials: LoginDataInterno) {
        const loginUrl = '/Login/login';
        const response = await this.postInterno(loginUrl, credentials);
        
        if (response.ok()) {
            const data = await response.json();
            console.log(`Token: ${TokenStore.getToken()}`);
            return data;
        } else {
            throw new Error(`Authentication failed with status ${response.status()}`);
        }
    }
}