import React, { FC, memo } from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Animated,
	LayoutChangeEvent,
	Easing
} from "react-native";
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

const BusinessScreen: FC = () => {
	const translateY = new Animated.Value(0);
	let translateYRange = [dimension.height(-1) + 182, 0, 0, 99];
	let currentDisplayState: DisplayState = DisplayState.infoNormal;
	let isInAnimation = false;
	let toValue = 0;
	let direction: -1 | 0 | 1 = 0;

	translateY.addListener(({ value }) => {
		const val = value - translateYRange[currentDisplayState];
		console.log(val);
		if (!isInAnimation) {
			direction = 0;
			switch (currentDisplayState) {
				case DisplayState.galleryNormal:
					if (val <= -150) {
						direction = -1;
					}
					break;
				case DisplayState.infoNormal:
					if (val >= 150) {
						direction = 1;
					} else if (val <= -150) {
						direction = -1;
					}
					break;
				case DisplayState.infoFull:
					if (val >= 150) {
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
			if (direction == 0) {
				toValue = 0;
			} else {
				toValue =
					translateYRange[currentDisplayState + direction] -
					translateYRange[currentDisplayState];
			}
			isInAnimation = true;
			Animated.spring(translateY, {
				toValue: toValue,
				speed: 20
			}).start(() => {
				currentDisplayState += direction;
				translateY.setOffset(translateYRange[currentDisplayState]);
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
						borderTopLeftRadius: translateY.interpolate({
							inputRange: translateYRange,
							outputRange: [0, 24],
							extrapolate: "clamp"
						}),
						borderTopRightRadius: translateY.interpolate({
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
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		height: "50%",
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
