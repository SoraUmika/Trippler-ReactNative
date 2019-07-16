import { TransitionConfig } from "react-navigation";
import { Animated, Easing } from "react-native";

export const slide = (): TransitionConfig => {
	return {
		transitionSpec: {
			duration: 750,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true
		},
		screenInterpolator: sceneProps => {
			const { position, scene, layout } = sceneProps;
			const thisIndex = scene.index;
			const height = layout.initHeight;

			const translateY = position.interpolate({
				inputRange: [thisIndex - 1, thisIndex],
				outputRange: [height, 0]
			});

			return { transform: [{ translateY }] };
		}
	};
};
