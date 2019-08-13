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

interface Props {}

const Screen: FC<Props> = props => {
	const currentData = useSelector(getOpenedData);
	const galleryIndex = useSelector(getGalleryIndex);
	const openedType = useSelector(getOpenedType);
	const [infoHeight, setInfoHeight] = useState<number>(0);
	const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.infoNormal);

	let infoCardTop = dimension.height();

	switch (displayState) {
		case DisplayState.infoFull:
			infoCardTop = 207;
			break;
		case DisplayState.infoNormal:
			infoCardTop -= infoHeight;
		case DisplayState.galleryNormal:
			infoCardTop -= 119;
			break;
	}

	return (
		<View style={styles.background}>
			<GalleryImage gallery={currentData.gallery} index={galleryIndex} />

			<View
				style={styles.clickDetector}
				onTouchStart={() => {
					console.log(displayState);
					setDisplayState(
						displayState + (displayState < DisplayState.galleryFull ? 1 : -2)
					);
				}}
			/>

			<View style={StyleSheet.absoluteFill}>
				<View style={styles.statusBarBlocker} />
				<Header />
				<View style={styles.headerShadow} />
			</View>

			<View style={styles.galleryDescriptionContainer}>
				{displayState == DisplayState.galleryNormal && (
					<GalleryDescription gallery={currentData.gallery} index={galleryIndex} />
				)}
			</View>

			<View style={[styles.infoCard, { top: infoCardTop }]}>
				<View style={styles.handleContainer}>
					<View style={styles.handle} />
				</View>
				<Info
					currentBusiness={currentData}
					onLayout={evt => setInfoHeight(evt.nativeEvent.layout.height)}
				/>
			</View>

			<View
				style={[
					styles.actionContainer,
					{ height: displayState == DisplayState.galleryFull ? 0 : 75 }
				]}
			>
				{openedType == "recommendation" ? (
					<RecomAction businessId={currentData.id} />
				) : (
					<CollectAction businessId={currentData.id} />
				)}
			</View>
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
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24
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
		bottom: 0,
		width: "100%",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: "#eee"
	},
	galleryDescriptionContainer: {
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: 119 + 24,
		alignItems: "center"
	},
	statusContainer: {
		padding: 8
	}
});

export default Screen;
