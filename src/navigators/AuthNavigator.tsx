import { createStackNavigator } from "react-navigation";

import LoginScreen from "../entryScreens/LoginScreen";
import SignupScreen from "../entryScreens/SignupScreen";

const AuthNavigator = createStackNavigator(
	{
		Login: LoginScreen,
		Signup: SignupScreen
	},
	{
		initialRouteName: "Login",
        defaultNavigationOptions: {
            header: null
        }
	}
);

export default AuthNavigator;
