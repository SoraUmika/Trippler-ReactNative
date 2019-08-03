import React, { FC } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

import { GalleryImageData } from "../../redux/state/Business";
import GalleryAnimationManager from "./animationManager/gallery";

interface Props {
	gallery: GalleryImageData[];
	index: number;
	animation: GalleryAnimationManager;
}

const GalleryImage: FC<Props> = props => {
	const { gallery, index, animation } = props;

	return (
		<Animated.View
			style={[
				styles.gallery,
				{
					transform: [
						{
							translateX: animation.translateX
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
			<Image style={styles.image} source={{ uri: gallery[index + 1].url }} />
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
		height: "100%"
	},
	imageSeparator: {
		width: 24,
		height: "100%",
		backgroundColor: "black"
	}
});

export default GalleryImage;
