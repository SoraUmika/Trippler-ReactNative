/**
 * Root component for the business screen.
 */
import React, { FC, memo } from "react";
import { View, StyleSheet, ImageBackground, Animated, LayoutChangeEvent } from "react-native";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

import Info from "./Info";
import Action from "./Action";
import Header from "../../components/NavHeader";
import { getCurrentRecomData } from "../../redux/selectors";
import dimension from "../../dimension";

enum DisplayState {
	infoFull,
	infoNormal,
	galleryNormal,
	galleryFull
}

/**
 * This component if for managing animation.
 * The actual presentational component is down below.
 */
const BusinessScreen: FC = () => {
	const translateY = new Animated.Value(0);
	// Each value is correspond to a `DisplayState`.
	// `DisplayState` acts as an index key, `translateYRange[DisplayState.galleryFull]` -> 99.
	// The value at index of `DisplayState.infoNormal`(1) is 0,
	// because its value can't be known beforehand.
	// Its value is determind by the `onLayout` callback below.
	let translateYRange = [dimension.height(-1) + 187, 0, 0, 99];
	let currentDisplayState: DisplayState = DisplayState.infoNormal;
	let isInAnimation = false;
	// This variable describe how to move to the next `DisplayState`.
	// The new `DisplayState` is calculated by adding this variable to the old one.
	let direction: -1 | 0 | 1 = 0;

	translateY.addListener(({ value }) => {
		// Get the relative value by remove the offset.
		const val = value - translateYRange[currentDisplayState];
		if (!isInAnimation) {
			// Determind what is the next `DisplayState`.
			direction = 0;
			switch (currentDisplayState) {
				case DisplayState.galleryNormal:
					if (val <= -50) {
						direction = -1;
					}
					break;
				case DisplayState.infoNormal:
					if (val >= 80) {
						direction = 1;
					} else if (val <= -100) {
						direction = -1;
					}
					break;
				case DisplayState.infoFull:
					if (val >= 100) {
						direction = 1;
					}
					break;
			}
		}
	});

	const onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: translateY
			}
		}
	]);

	const onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			let toValue;
			// Calculate the `toValue` paramter.
			if (direction == 0) {
				// If the `DisplayState` didn't change, move to the origin.
				toValue = 0;
			} else {
				// Get the difference between the y translations of current and next `DisplayState`.
				toValue =
					translateYRange[currentDisplayState + direction] -
					translateYRange[currentDisplayState];
			}
			isInAnimation = true;
			Animated.spring(translateY, {
				toValue: toValue,
				speed: 20,
				// There will be no bounce if the expanded info page is moved and didn't trigger a
				// change in `DisplayState`.
				bounciness:
					currentDisplayState == DisplayState.infoFull && !direction ? 0 : undefined
			}).start(() => {
				currentDisplayState += direction; // update `DisplayState`.
				translateY.setOffset(translateYRange[currentDisplayState]); // update origin.
				direction = 0;
				isInAnimation = false;
			});
		}
	};

	return (
		<Component
			translateY={translateY}
			onLayout={e => {
				const height = e.nativeEvent.layout.height;
				if (height) {
					if (currentDisplayState == DisplayState.infoNormal) {
						isInAnimation = true;
						Animated.spring(translateY, {
							toValue: -height - translateYRange[DisplayState.infoNormal],
							speed: 20
						}).start(() => {
							translateY.setOffset(translateYRange[currentDisplayState]);
							translateY.setValue(0);
							isInAnimation = false;
						});
					}
					translateYRange[DisplayState.infoNormal] = -height;
				}
			}}
			onPanEvent={onPanEvent}
			onPanStateChange={onPanStateChange}
			translateYRange={[translateYRange[0], translateYRange[1]]}
		/>
	);
};

interface Props {
	translateY: Animated.Value;
	onLayout: (event: LayoutChangeEvent) => void;
	onPanEvent: (...args: any[]) => void;
	onPanStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
	translateYRange: [number, number];
}

/**
 * This is the presentational component.
 * For the animation management, see the component above.
 */
const Component: FC<Props> = props => {
	const currentData = useSelector(getCurrentRecomData);
	const { translateY, onPanEvent, onPanStateChange, onLayout, translateYRange } = props;

	return (
		<ImageBackground source={{ uri: currentData.gallery[0].url }} style={styles.background}>
			<View style={styles.statusBarBlocker} />
			<Header />
			<View style={styles.headerShadow} />
			<PanGestureHandler onGestureEvent={onPanEvent} onHandlerStateChange={onPanStateChange}>
				<Animated.View
					style={{
						...styles.infoCard,
						transform: [
							{
								translateY: translateY.interpolate({
									inputRange: translateYRange,
									outputRange: translateYRange,
									extrapolate: "clamp"
								})
							}
						],
						borderRadius: translateY.interpolate({
							inputRange: translateYRange,
							outputRange: [0, 24],
							extrapolate: "clamp"
						})
					}}
				>
					<View style={styles.handleContainer}>
						<View style={styles.handle} />
					</View>
					<Info currentBusiness={currentData} onLayout={onLayout} />
				</Animated.View>
			</PanGestureHandler>
			<Action />
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1
	},
	statusBarBlocker: {
		height: getStatusBarHeight(),
		width: "100%",
		backgroundColor: "white"
	},
	headerShadow: {
		width: "100%",
		height: 8,
		backgroundColor: "white",
		opacity: 0.5
	},
	infoCard: {
		backgroundColor: "white",
		height: "100%",
		width: "100%",
		position: "absolute",
		left: 0,
		top: dimension.height() - 75 - 24
	},
	handleContainer: {
		height: 24,
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	handle: {
		width: "33%",
		height: 8,
		backgroundColor: "black",
		opacity: 0.1,
		borderRadius: 4
	}
});

export default memo(BusinessScreen, () => true);
