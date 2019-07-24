/**
 * Main page of the main screen.
 *
 * TODO implement bottom navigation.
 * TODO implement Account section.
 * TODO implement Setting section.
 */
import React, { FC } from "react";
import { StyleSheet, Animated, View } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

import Collection from "../components/Collection";
import dimension from "../dimension";

const MainPage: FC = props => {
	const translateYPan = new Animated.Value(0);
	const translateYRange = [dimension.height(-0.7), 0];
	let currentIndex = 1;
	let isInAnimation = false;
	let toValue = 0;
	let direction = 0;

	translateYPan.addListener(({ value }) => {
		const val = value - translateYRange[currentIndex];
		console.log(val, value);
		if (!isInAnimation) {
			direction = 0;
			switch (currentIndex) {
				case 0:
					if (val >= 150) {
						direction = 1;
					}
					break;
				case 1:
					if (val <= -150) {
						direction = -1;
					}
			}
			if (direction == 0) {
				toValue = 0;
			} else {
				toValue = translateYRange[currentIndex + direction] - translateYRange[currentIndex];
				console.log(direction, toValue);
			}
		}
	});

	const onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: translateYPan
			}
		}
	]);

	const onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			isInAnimation = true;
			Animated.timing(translateYPan, {
				toValue: toValue
			}).start(() => {
				currentIndex += direction;
				translateYPan.setOffset(translateYRange[currentIndex]);
				direction = 0;
				isInAnimation = false;
			});
		}
	};

	return (
		<Animated.View
			style={{
				...styles.root,
				transform: [
					{
						translateY: translateYPan.interpolate({
							inputRange: translateYRange,
							outputRange: translateYRange,
							extrapolate: "clamp"
						})
					}
				]
			}}
		>
			<PanGestureHandler onGestureEvent={onPanEvent} onHandlerStateChange={onPanStateChange}>
				<View style={styles.handleBarContainer}>
					<View style={styles.handleBar} />
				</View>
			</PanGestureHandler>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	root: {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: 0,
		top: "85%",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: "green"
	},
	handleBarContainer: {
		width: "100%",
		height: 24,
		justifyContent: "center",
		alignItems: "center"
	},
	handleBar: {
		width: "33%",
		height: "35%",
		backgroundColor: "black",
		opacity: 0.1,
		borderRadius: 4
	}
});

export default MainPage;
