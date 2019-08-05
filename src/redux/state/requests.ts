import Business from './Business'

interface Fetch{
    isFetching: boolean
}

export interface RandomBussiness extends Fetch{

}

export interface LoginAuthentication extends Fetch{
    username: string | "undefined",
    password: string | "undefined",
    security_hashes?: string | "undefined",
}

export interface NewUser extends Fetch, LoginAuthentication{
    email: string | "undefined"
}
