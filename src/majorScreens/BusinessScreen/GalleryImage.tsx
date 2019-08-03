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
	const leftIndex = index ? index - 1 : gallery.length - 1;
	const rightIndex = index == gallery.length - 1 ? 0 : index + 1;

	return (
		<Animated.View
			style={[
				styles.gallery,
				{
					transform: [
						{
							translateX: animation.translateX.interpolate({
								inputRange: animation.translateXRange,
								outputRange: [animation.imageWidth * -1, animation.imageWidth],
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
			<Image style={styles.image} source={{ uri: gallery[leftIndex].url }} />
			<View style={styles.imageSeparator} />
			<Image style={styles.image} source={{ uri: gallery[index].url }} />
			<View style={styles.imageSeparator} />
			<Image style={styles.image} source={{ uri: gallery[rightIndex].url }} />
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
		backgroundColor: "black"
	}
});

export default GalleryImage;
