/**
 * Root component for the business screen.
 */
import React, { FC, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { PanGestureHandler } from "react-native-gesture-handler";

import Info from "./Info";
import RecomAction from "./RecomAction";
import CollectAction from "./CollectAction";
import Header from "../../components/NavHeader";
import { getOpenedData, getGalleryIndex, getOpenedType } from "../../redux/selectors";
import dimension from "../../dimension";
import GalleryDescription from "./GalleryDescription";
import GalleryImage from "./GalleryImage";
import InfoCardAnimationManager from "./animationManager/infoCard";
import GalleryAnimationManager from "./animationManager/gallery";
import Type from "./Type";

export enum DisplayState {
	infoFull,
	infoNormal,
	galleryNormal,
	galleryFull
}

interface Props {
	infoCard: InfoCardAnimationManager;
	gallery: GalleryAnimationManager;
}

const actionHeight = 75;
const bottomHeight = actionHeight + 44;
const headerHeigh = 65 + 8 + getStatusBarHeight();
const typeY = 48 + headerHeigh;
const galleryDEscriptionY = bottomHeight + 24 + 100;
const fullBorderRadius = 24;

const Screen: FC<Props> = props => {
	const currentData = useSelector(getOpenedData);
	const galleryIndex = useSelector(getGalleryIndex);
	const openedType = useSelector(getOpenedType);
	const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.infoNormal);
	const { infoCard, gallery } = props;

	infoCard.provideDisplayStateSetter(setDisplayState);
	gallery.updateGalleryIndex(galleryIndex);

	return (
		<View style={styles.background}>
			<GalleryImage gallery={currentData.gallery} index={galleryIndex} animation={gallery} />

			<View style={styles.clickDetector} onTouchStart={infoCard.onGalleryClick} />

			<Animated.View
				style={{
					transform: [
						{
							translateY: infoCard.translateY.interpolate({
								inputRange: infoCard.translateYRange,
								outputRange: [0, 0, -typeY, -typeY],
								extrapolate: "clamp"
							})
						}
					]
				}}
			>
				<View style={styles.statusBarBlocker} />
				<Header />
				<View style={styles.headerShadow} />
				<View style={styles.statusContainer}>
					<Type type={openedType} />
				</View>
			</Animated.View>

			<Animated.View
				style={[
					styles.galleryDescriptionContainer,
					{
						transform: [
							{
								translateY: infoCard.translateY.interpolate({
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
					<GalleryDescription
						gallery={currentData.gallery}
						index={galleryIndex}
						animation={gallery}
					/>
				)}
			</Animated.View>

			<PanGestureHandler
				onGestureEvent={infoCard.onPanEvent}
				onHandlerStateChange={infoCard.onPanStateChange}
			>
				<Animated.View
					style={[
						styles.infoCard,
						{
							transform: [
								{
									translateY: infoCard.translateY.interpolate({
										inputRange: infoCard.translateYRange,
										outputRange: infoCard.translateYRange,
										extrapolate: "clamp"
									})
								}
							],
							borderRadius: infoCard.translateY.interpolate({
								inputRange: infoCard.translateYRange,
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
					<Info currentBusiness={currentData} onLayout={infoCard.onLayout} />
				</Animated.View>
			</PanGestureHandler>

			<Animated.View
				style={[
					styles.actionContainer,
					{
						transform: [
							{
								translateY: infoCard.translateY.interpolate({
									inputRange: [0, bottomHeight],
									outputRange: [0, actionHeight],
									extrapolate: "clamp"
								})
							}
						],
						borderRadius: infoCard.translateY.interpolate({
							inputRange: infoCard.translateYRange,
							outputRange: [0, fullBorderRadius, fullBorderRadius, fullBorderRadius],
							extrapolate: "clamp"
						})
					}
				]}
				onTouchStart={(evt: any) => evt.stopPropagation()}
			>
				{openedType == "recommendation" ? (
					<RecomAction businessId={currentData.id} />
				) : (
					<CollectAction businessId={currentData.id} />
				)}
			</Animated.View>
			{/* </ImageBackground> */}
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1
	},
	clickDetector: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 10
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
		backgroundColor: "#eee",
		height: 75
	},
	galleryDescriptionContainer: {
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: bottomHeight + 24,
		alignItems: "center"
	},
	statusContainer: {
		padding: 8
	}
});

export default Screen;
