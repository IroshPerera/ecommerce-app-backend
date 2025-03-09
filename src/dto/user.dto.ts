import { ResponseTokenDTO } from "./token.dto";

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    avatar: string;
}


export interface ResponseUserDTO {
    id : string;
    username: string;
    email: string;
    avatar: string;
    role: string;
    tokens : ResponseTokenDTO;
}
