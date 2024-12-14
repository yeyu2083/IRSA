import { APIRequestContext } from '@playwright/test';
import { LoginData } from '../tests/interfaces/login';
import { TestTools } from '../Utils/TestTools'
import { TokenStore } from '../Utils/token-store';

import { config } from 'dotenv';
config();

export class AuthHelper extends TestTools {
    private static token: string;

    constructor(api: APIRequestContext) {
        super(api);
    }

    async login(credentials: LoginData) {
        const response = await this.post('/Login/login', credentials);
        if (response.ok()) {
            const data = await response.json();
            TokenStore.setToken(data.AccessToken);
            console.log(`Token:${TokenStore.getToken()}`);

    } else{  throw new Error(`Authentication failed with status ${response.status()}`);
}}


        
}