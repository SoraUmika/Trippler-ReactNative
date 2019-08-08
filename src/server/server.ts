import server_action from './actionTypes'

const request = (action: server_action, url='http://ec2-35-168-17-106.compute-1.amazonaws.com:3000/') => {
	switch(action.type){
		case 'INSERT_NEW_USER_TO_DATABASE':
			fetch(url, action.init)
			.then(res => res.json())
			.then(response => console.log(JSON.stringify(response)))
			.catch(error => console.log("Connection Failed: ", error))
			break;
		case 'CHECK_LOGIN_CREDENTIALS':
			fetch(url, action.init)
			.then(res => res.text())
			.then(response => console.log(response))
			.catch(error => console.log("Connection Failed: ", error))
			break;
		case 'GRAB_RANDOM_RESTAURANT':
			fetch(url)
			break;
	}
	return action
}

export default request
