import { APIRequestContext , APIResponse} from "@playwright/test";
import { config } from "dotenv";
config();
import { LoginDataInterno } from "../tests/interfaces/login";
import * as allure from 'allure-js-commons';




export class TestTools {
    public api: APIRequestContext;
    public url: string;
    public token: string;

    constructor(api: APIRequestContext) {
        this.api = api;
        this.url = process.env.BASE_URL ?? "";
        this.token = '';
    }
   
    public async logRequestResponse(method: string, url: string, headers: Record<string, string>, body: object | undefined, response: APIResponse) {
        
        allure.logStep(`${method} ${url}`);
        allure.attachment('Request Headers', JSON.stringify(headers, null, 2), 'application/json');
        if (body) {
            allure.attachment('Request Body', JSON.stringify(body, null, 2), 'application/json');
        }

        const responseData = await response.json();
        allure.attachment('Response Status', response.status().toString(), 'text/plain');
        allure.attachment('Response Headers', JSON.stringify(response.headers()), 'application/json');
        allure.attachment('Response Body', JSON.stringify(responseData, null, 2), 'application/json');
        
        return responseData;
    }
    async login(credentials: LoginDataInterno): Promise<APIResponse>{ 
        const url = `${this.url}/Login/login`;
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await this.api.post(`${this.url}/Login/login`, {
            data: credentials,
            headers
            }
        );

        const responseData = await this.logRequestResponse('POST', url, headers, credentials, response);

        this.token = responseData.AccessToken; // Cambiado de data.token a AccessToken
        return response;
    }

    // async postInterno(url: string, body?: LoginDataInterno): Promise<APIResponse> {
    //     const response = await this.api.post(url, {
    //         data: body,
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${this.token}`
    //         }
    //     });
    //     await this.logRequestResponse(method, url,, body, response);
    //     return response;
    // }
    protected getAuthHeaders(): Record<string, string> {
        return {
            "Authorization": `Bearer ${this.token}`,
            "Content-Type": "application/json"
        };
    }
}       
             