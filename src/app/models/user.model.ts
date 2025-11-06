export interface User {
    uid: string;
    email: string;
    displayName?: string;
    createdAt: Date;
}
export interface AuthCredentials {
    email: string;
    password: string;
}
export interface RegisterCredentials extends AuthCredentials {
    displayName?: string;
}
