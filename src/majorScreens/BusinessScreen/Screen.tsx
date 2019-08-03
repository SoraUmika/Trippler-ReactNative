/**
 * Root component for the business screen.
 */
import React, { FC, useState } from "react";
import { View, StyleSheet, ImageBackground, Animated, LayoutChangeEvent } from "react-native";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { PanGestureHandler, PanGestureHandlerStateChangeEvent } from "react-native-gesture-handler";

import Info from "./Info";
import Action from "./Action";
import Header from "../../components/NavHeader";
import { getCurrentRecomData } from "../../redux/selectors";
import dimension from "../../dimension";
import GalleryDescription from "./GalleryDescription";

export enum DisplayState {
	infoFull,
	infoNormal,
	galleryNormal,
	galleryFull
}

interface Props {
	translateY: Animated.Value;
	onLayout: (event: LayoutChangeEvent) => void;
	onPanEvent: (...args: any[]) => void;
	onPanStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
	translateYRange: number[];
	onGalleryClick: () => void;
	provideDisplayStateSetter: (setter: Function) => void;
}

const Screen: FC<Props> = props => {
	const currentData = useSelector(getCurrentRecomData);
	const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.infoNormal);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const {
		translateY,
		onPanEvent,
		onPanStateChange,
		onLayout,
		translateYRange,
		onGalleryClick,
		provideDisplayStateSetter
	} = props;

	provideDisplayStateSetter(setDisplayState);

	return (
		<View style={styles.background} onTouchStart={onGalleryClick}>
			<ImageBackground
				source={{ uri: currentData.gallery[galleryIndex].url }}
				style={styles.background}
			>
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
					{displayState >= DisplayState.galleryNormal && (
						<GalleryDescription
							text={currentData.gallery[galleryIndex].description}
							index={galleryIndex}
							imageNum={currentData.gallery.length}
						/>
					)}
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
					onTouchStart={(evt: any) => evt.stopPropagation()}
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

export default Screen;
