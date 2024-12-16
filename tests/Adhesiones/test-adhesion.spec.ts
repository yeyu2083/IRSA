import { test, APIRequestContext } from '@playwright/test';
import { TestTools } from '../../Utils/TestTools';
import { LoginData } from '../interfaces/login';








test('login test', async ({ request: apiRequest }: { request: APIRequestContext })=>{
    

const testTools = new TestTools(apiRequest) 
    
    const credentials: LoginData = {
        CUIT: '30702637895',
        Username: 'LASBLONDASS.A.',
        Password: '654321'
    };

    const login = await testTools.post('https://irsa-dev-backend.wi-soft.net/api/v1/Login/login', credentials);
    const response = await login.json();
    console.log(response);
  
    // const testTools = new TestTools(apiRequest);
    // // const response = await testTools.apiPost('/Login/login', {
    // //     headers: {
    // //         'Authorization': `Bearer ${token}`
    // //     }
    // });
    
});