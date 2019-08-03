import React, { FC } from "react";
import { View, StyleSheet, Image, Animated, Dimensions } from "react-native";

import { GalleryImageData } from "../../redux/state/Business";

const { width } = Dimensions.get("window");

interface Props {
	gallery: GalleryImageData[];
	index: number;
}

const galleryTransXOffset = -width - 24;

const GalleryImage: FC<Props> = props => {
	const { gallery, index } = props;

	return (
		<Animated.View
			style={[
				styles.gallery,
				{
					transform: [
						{
							translateX: galleryTransXOffset - 100
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
