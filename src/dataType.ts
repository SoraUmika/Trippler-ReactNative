export interface credentialsLogin{
	username: string,
	password: string,
}

export interface credentialsSignUp extends credentialsLogin{
	email: string
}

