export interface TokenPayload {
    sub: string,
    role: 'customer' | 'admin',
    name: string,
}