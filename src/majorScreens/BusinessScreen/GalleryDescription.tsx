import React, { FC } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import { GalleryImageData } from "../../redux/state/Business";
import GalleryAnimationManager from "./animationManager/gallery";

interface Props {
	index: number;
	gallery: GalleryImageData[];
	animation: GalleryAnimationManager;
}

const GalleryDescription: FC<Props> = props => {
	const { index, gallery, animation } = props;

	return (
		<PanGestureHandler
			onGestureEvent={animation.onPanEvent}
			onHandlerStateChange={animation.onPanStateChange}
		>
			<View style={styles.root} onTouchStart={evt => evt.stopPropagation()}>
				<View style={styles.container}>
					<Text style={styles.text}>{gallery[index].description}</Text>
				</View>
				<View style={styles.indexIndicatorContainer}>
					{getIndexIndicators(index, gallery.length)}
				</View>
			</View>
		</PanGestureHandler>
	);
};

function getIndexIndicators(index: number, imageNum: number) {
	let indicators: JSX.Element[] = [];
	for (let i = 0; i < imageNum; i++) {
		indicators.push(
			<View
				style={[styles.indexIndicator, i == index ? styles.indicatorActive : {}]}
				key={i}
			/>
		);
	}
	return indicators;
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		opacity: 0.75,
		borderRadius: 16,
		padding: 16,
		width: "80%",
		height: 100,
		overflow: "hidden"
	},
	container: {
		width: "100%",
		height: "100%"
	},
	text: {
		fontWeight: "500"
	},
	indexIndicatorContainer: {
		marginTop: "auto",
		width: "100%",
		flexDirection: "row"
	},
	indexIndicator: {
		width: 8,
		height: 8,
		backgroundColor: "#aaa",
		borderRadius: 4,
		marginRight: 4
	},
	indicatorActive: {
		backgroundColor: "#888"
	}
});

export default GalleryDescription;
