import { createStackNavigator } from "react-navigation";
import { Animated, Easing } from "react-native";

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
		},
		transitionConfig: () => ({
			transitionSpec: {
				duration: 750,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing,
				useNativeDriver: true
			},
			screenInterpolator: sceneProps => {
				const {
					position,
					scene: { index },
					layout
				} = sceneProps;
				const height = layout.initHeight;

				const translateY = position.interpolate({
					inputRange: [index - 1, index],
					outputRange: [height, 0]
				});

				return { transform: [{ translateY }] };
			}
		})
	}
);

export default AuthNavigator;
