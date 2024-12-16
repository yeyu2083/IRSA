export class TokenStore {
    private static token: string;
    static setToken(token: string) {
        this.token = token;
    }
    static getToken(): string {
        if (!TokenStore.token) {
            throw new Error('No hay token disponible. Por favor, inicie sesión primero.');
        }
        return TokenStore.token;
    }
}
    
