export interface AuthenticationRequest {
    username: string,
    password: string
}

export interface AuthenticationResponse {
    jwt: string
}