/**
 * Root component for the business screen.
 */
import React, { FC, useState } from "react";
import { View, StyleSheet, Animated, LayoutChangeEvent, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { PanGestureHandler, PanGestureHandlerStateChangeEvent } from "react-native-gesture-handler";

import Info from "./Info";
import Action from "./Action";
import Header from "../../components/NavHeader";
import { getCurrentRecomData } from "../../redux/selectors";
import dimension from "../../dimension";
import GalleryDescription from "./GalleryDescription";
import GalleryImage from "./GalleryImage";

const { width } = Dimensions.get("window");

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

const actionHeight = 75;
const bottomHeight = actionHeight + 44;
const headerHeigh = 73 + getStatusBarHeight();
const galleryDEscriptionY = bottomHeight + 24 + 100;
const fullBorderRadius = 24;
const galleryTransXOffset = -width - 24;

const Screen: FC<Props> = props => {
	const currentData = useSelector(getCurrentRecomData);
	const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.infoNormal);
	const [galleryIndex, setGalleryIndex] = useState(1);
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
			{/* <ImageBackground
				source={{ uri: currentData.gallery[galleryIndex].url }}
				style={styles.background}
            > */}
			<GalleryImage gallery={currentData.gallery} index={galleryIndex} />

			<Animated.View
				style={{
					transform: [
						{
							translateY: translateY.interpolate({
								inputRange: [0, bottomHeight],
								outputRange: [0, -headerHeigh],
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
									inputRange: [0, bottomHeight],
									outputRange: [0, galleryDEscriptionY],
									extrapolate: "clamp"
								})
							}
						]
					}
				]}
			>
				{displayState >= DisplayState.galleryNormal && (
					<GalleryDescription gallery={currentData.gallery} index={galleryIndex} />
				)}
			</Animated.View>
			<PanGestureHandler onGestureEvent={onPanEvent} onHandlerStateChange={onPanStateChange}>
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
								outputRange: [
									0,
									fullBorderRadius,
									fullBorderRadius,
									fullBorderRadius
								],
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
									inputRange: [0, bottomHeight],
									outputRange: [0, actionHeight],
									extrapolate: "clamp"
								})
							}
						],
						borderRadius: translateY.interpolate({
							inputRange: translateYRange,
							outputRange: [0, fullBorderRadius, fullBorderRadius, fullBorderRadius],
							extrapolate: "clamp"
						})
					}
				]}
				onTouchStart={(evt: any) => evt.stopPropagation()}
			>
				<Action />
			</Animated.View>
			{/* </ImageBackground> */}
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1
	},
	gallery: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		flexDirection: "row",
		flexWrap: "nowrap"
	},
	image: {
		width: "100%",
		height: "100%"
	},
	imageSeparator: {
		width: 24,
		height: "100%",
		backgroundColor: "black"
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
		top: dimension.height() - bottomHeight
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
		bottom: bottomHeight + 24,
		alignItems: "center"
	}
});

export default Screen;
