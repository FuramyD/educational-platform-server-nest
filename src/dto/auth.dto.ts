export interface AuthDto {
    login: string;
    password: string;
    rememberMe: boolean;
}

export interface RegistrationDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
}

export interface JwtDto {
    accessToken: string;
}

export interface RestorePasswordDto {
    email: string;
}

export interface ChangePasswordDto {
    id: string;
    password: string;
}