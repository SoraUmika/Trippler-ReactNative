import React, { FC } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { GalleryImageData } from "../../redux/state/Business";
import GalleryAnimationManager from "./animationManager/gallery";
import { nextGalleryIndex } from "../../redux/action/actions";

interface Props {
	index: number;
	gallery: GalleryImageData[];
}

const GalleryDescription: FC<Props> = props => {
	const { index, gallery } = props;
	const dispatch = useDispatch();

	return (
		<View style={styles.root} onTouchStart={evt => evt.stopPropagation()}>
			<View
				style={styles.clickView}
				onTouchStart={() => dispatch(nextGalleryIndex("backward"))}
			/>
			<View
				style={[styles.clickView, styles.rightClickView]}
				onTouchStart={() => dispatch(nextGalleryIndex("forward"))}
			/>
			<View style={styles.container}>
				<Text style={styles.text}>{gallery[index].description}</Text>
			</View>
			<View style={styles.indexIndicatorContainer}>
				{getIndexIndicators(index, gallery.length)}
			</View>
		</View>
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
		flexDirection: "row",
		alignItems: "center"
	},
	indexIndicator: {
		width: 6,
		height: 6,
		backgroundColor: "#aaa",
		borderRadius: 3,
		margin: 2,
		marginRight: 6
	},
	indicatorActive: {
		backgroundColor: "#888",
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 4
	},
	clickView: {
		position: "absolute",
		width: "50%",
		height: 100,
		opacity: 0.5
	},
	rightClickView: {
		right: 0
	}
});

export default GalleryDescription;
