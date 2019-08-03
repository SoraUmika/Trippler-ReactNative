import React, { FC } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

import { GalleryImageData } from "../../redux/state/Business";
import GalleryAnimationManager from "./animationManager/gallery";
import dimension from "../../dimension";

interface Props {
	gallery: GalleryImageData[];
	index: number;
	animation: GalleryAnimationManager;
}

const galleryTransXOffset = -dimension.width() - 24;

const GalleryImage: FC<Props> = props => {
	const { gallery, index, animation } = props;

	const outputRange = [
		index < gallery.length - 1 ? animation.imageWidth * -1 : dimension.width(-0.2),
		0,
		index ? animation.imageWidth : dimension.width(0.2)
	];

	return (
		<Animated.View
			style={[
				styles.gallery,
				{
					transform: [
						{
							translateX: animation.translateX.interpolate({
								inputRange: animation.translateXRange,
								outputRange: outputRange,
								extrapolate: "clamp"
							})
						},
						{
							translateX: galleryTransXOffset
						}
					]
				}
			]}
		>
			{index ? (
				<Image style={styles.image} source={{ uri: gallery[index - 1].url }} />
			) : (
				<View style={styles.image} />
			)}
			<View style={styles.imageSeparator} />
			<Image style={styles.image} source={{ uri: gallery[index].url }} />
			<View style={styles.imageSeparator} />
			{index < gallery.length - 1 ? (
				<Image style={styles.image} source={{ uri: gallery[index + 1].url }} />
			) : (
				<View style={styles.image} />
			)}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
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
		height: "100%",
		backgroundColor: "black"
	},
	imageSeparator: {
		width: 24,
		height: "100%",
		backgroundColor: "black",
		borderColor: "black",
		borderWidth: 1
	}
});

export default GalleryImage;
