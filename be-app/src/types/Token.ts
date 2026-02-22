export interface Token {
    sub: string,
    role: 'customer' | 'admin',
    name: string,
}