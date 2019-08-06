import Business from './Business'

interface Fetch{
    isFetching: boolean,
    err: string,
}

export interface RandomBussiness extends Fetch{
    data: {}
}

export interface LoginAuthentication extends Fetch{
    username: string | "undefined",
    password: string | "undefined",
    security_hashes?: string | "undefined",
}

export interface NewUser extends Fetch, LoginAuthentication{
    email: string | "undefined"
}
