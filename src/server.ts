interface action{
	type: string,
	info: {}
}

const request = (url='http://ec2-35-168-17-106.compute-1.amazonaws.com:3000', action: action) => {
	switch(action.type){
		case 'INSERT_NEW_USER_TO_DATABASE':
			fetch(url)
			.then(res => res.text())
			.then(body => console.log(body))
			break;
		case 'CHECK_LOGIN_CREDENTIALS':
			break;
		case 'GRAB_RANDOM_RESTAURANT':
			break;
		case 'SEARCH_RESTAURANT_BY_KEYWORD':
			break;
		case 'UPDATE_USER_ACTIONS':
			break;
	}
	return action
}

export default request
