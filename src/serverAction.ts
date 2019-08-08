import * as dataType from './dataType'

export function insert_new_user_to_databases(credentials: dataType.credentialsSignUp){
	return {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json'
		}
	}
}

export function check_login_credentials(credentials: dataType.credentialsLogin){
	return {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json'
		}
	}
}

export function grab_random_restaurant(){
	return {
		method: 'POST'
	}	
}