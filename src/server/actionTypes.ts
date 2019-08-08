import * as serverAction from '../serverAction'

interface INSERT_NEW_USER_TO_DATABASE{
	type: 'INSERT_NEW_USER_TO_DATABASE',
	init: ReturnType <typeof serverAction.insert_new_user_to_databases>
}	

interface CHECK_LOGIN_CREDENTIALS{
	type: 'CHECK_LOGIN_CREDENTIALS',
	init: ReturnType <typeof serverAction.check_login_credentials>
}

interface GRAB_RANDOM_RESTAURANT{
	type: 'GRAB_RANDOM_RESTAURANT',
	init: ReturnType <typeof serverAction.grab_random_restaurant>
}

type server_action = INSERT_NEW_USER_TO_DATABASE | CHECK_LOGIN_CREDENTIALS | GRAB_RANDOM_RESTAURANT
export default server_action