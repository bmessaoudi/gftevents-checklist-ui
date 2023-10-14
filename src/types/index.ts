export type Redirect = string | null;

export type StatusRes = {
    id: string;
    email: string;
    name: string;
    surname: string;
    approved: boolean;
};

export type LoginData = {
    email: string;
    password: string;
};

export type AuthRes = {
    id: string;
    email: string;
    name: string;
    surname: string;
    token: string;
};

export type RegisterData = {
    email: string;
    name: string;
    surname: string;
    phone: string;
    tickets: number;
    password: string;
    passwordConfirm: string;
};