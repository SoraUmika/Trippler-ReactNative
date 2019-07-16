import { TransitionConfig } from "react-navigation";
import { Animated, Easing } from "react-native";

export type TransitionTypes = "slideUp";

const transitionCOnfig = (): TransitionConfig => {
	return {
		transitionSpec: {
			duration: 750,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true
		},
		screenInterpolator: sceneProps => {
			const {
				position,
				scene: {
					index,
					route: { params = {} }
				},
				layout
			} = sceneProps;
			const height = layout.initHeight;
			const transition: TransitionTypes = params.transition || "slideUp";

			switch (transition) {
				case "slideUp":
					const translateY = position.interpolate({
						inputRange: [index - 1, index],
						outputRange: [height, 0]
					});

					return { transform: [{ translateY }] };
			}
		}
	};
};

export default transitionCOnfig;
