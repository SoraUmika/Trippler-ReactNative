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
import GalleryDescription from "./GalleryDescription";

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
	let translateYRange = [dimension.height(-1) + 207, 0, 0, 119];
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
					} else if (val >= 70) {
						direction = 1;
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
			update();
		}
	};

	const update = () => {
		let toValue;
		// Calculate the `toValue` paramter.
		if (direction == 0) {
			// If the `DisplayState` didn't change, move to the origin.
			toValue = 0;
		} else {
			// Get the difference between the y translations of current and next `DisplayState`.
			console.log(
				translateYRange[currentDisplayState],
				" -> ",
				translateYRange[currentDisplayState + direction]
			);
			toValue =
				translateYRange[currentDisplayState + direction] -
				translateYRange[currentDisplayState];
		}
		isInAnimation = true;
		const noBounce =
			(currentDisplayState == DisplayState.infoFull && !direction) ||
			(currentDisplayState == DisplayState.galleryNormal && direction == 1);
		Animated.spring(translateY, {
			toValue: toValue,
			speed: 20,
			bounciness: noBounce ? 0 : undefined
		}).start(() => {
			currentDisplayState += direction;
			translateY.extractOffset();
			translateY.setOffset(translateYRange[currentDisplayState]);
			direction = 0;
			isInAnimation = false;
		});
	};

	const onGalleryClick = () => {
		if (!isInAnimation) {
			direction = currentDisplayState < DisplayState.galleryFull ? 1 : -1;
			update();
		}
	};

	return (
		<Component
			translateY={translateY}
			onLayout={e => {
				const height = e.nativeEvent.layout.height;
				if (height) {
					const yTranslate = -height + 20;
					if (currentDisplayState == DisplayState.infoNormal) {
						isInAnimation = true;
						Animated.spring(translateY, {
							toValue: yTranslate - translateYRange[DisplayState.infoNormal],
							speed: 20
						}).start(() => {
							translateY.setOffset(translateYRange[currentDisplayState]);
							translateY.setValue(0);
							isInAnimation = false;
						});
					}
					translateYRange[DisplayState.infoNormal] = yTranslate;
				}
			}}
			onPanEvent={onPanEvent}
			onPanStateChange={onPanStateChange}
			translateYRange={translateYRange}
			onGalleryClick={onGalleryClick}
		/>
	);
};

interface Props {
	translateY: Animated.Value;
	onLayout: (event: LayoutChangeEvent) => void;
	onPanEvent: (...args: any[]) => void;
	onPanStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
	translateYRange: number[];
	onGalleryClick: () => void;
}

/**
 * This is the presentational component.
 * For the animation management, see the component above.
 */
const Component: FC<Props> = props => {
	const currentData = useSelector(getCurrentRecomData);
	const {
		translateY,
		onPanEvent,
		onPanStateChange,
		onLayout,
		translateYRange,
		onGalleryClick
	} = props;

	return (
		<View style={styles.background} onTouchStart={onGalleryClick}>
			<ImageBackground source={{ uri: currentData.gallery[0].url }} style={styles.background}>
				<Animated.View
					style={{
						transform: [
							{
								translateY: translateY.interpolate({
									inputRange: [0, 119],
									outputRange: [0, -73 - getStatusBarHeight()],
									extrapolate: "clamp"
								})
							}
						]
					}}
				>
					<View style={styles.statusBarBlocker} />
					<Header />
					<View style={styles.headerShadow} />
				</Animated.View>
				<Animated.View
					style={[
						styles.galleryDescriptionContainer,
						{
							transform: [
								{
									translateY: translateY.interpolate({
										inputRange: [0, 119],
										outputRange: [0, 119 + 24 + 100],
										extrapolate: "clamp"
									})
								}
							]
						}
					]}
				>
					<GalleryDescription
						text={currentData.gallery[0].description}
						index={0}
						imageNum={1}
					/>
				</Animated.View>
				<PanGestureHandler
					onGestureEvent={onPanEvent}
					onHandlerStateChange={onPanStateChange}
				>
					<Animated.View
						style={[
							styles.infoCard,
							{
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
									outputRange: [0, 24, 24, 24],
									extrapolate: "clamp"
								})
							}
						]}
						onTouchStart={(evt: any) => evt.stopPropagation()}
					>
						<View style={styles.handleContainer}>
							<View style={styles.handle} />
						</View>
						<Info currentBusiness={currentData} onLayout={onLayout} />
					</Animated.View>
				</PanGestureHandler>
				<Animated.View
					style={[
						styles.actionContainer,
						{
							transform: [
								{
									translateY: translateY.interpolate({
										inputRange: [0, 119],
										outputRange: [0, 75],
										extrapolate: "clamp"
									})
								}
							],
							borderRadius: translateY.interpolate({
								inputRange: translateYRange,
								outputRange: [0, 24, 24, 24],
								extrapolate: "clamp"
							})
						}
					]}
				>
					<Action />
				</Animated.View>
			</ImageBackground>
		</View>
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
		top: dimension.height() - 75 - 24 - 20
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
	},
	actionContainer: {
		position: "absolute",
		left: 0,
		bottom: 0,
		width: "100%",
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		backgroundColor: "#eee"
	},
	galleryDescriptionContainer: {
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: 119 + 24,
		alignItems: "center"
	}
});

export default memo(BusinessScreen, () => true);
