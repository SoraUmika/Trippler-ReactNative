import React, { FC } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

import { GalleryImageData } from "../../redux/state/Business";
import GalleryAnimationManager from "./animationManager/gallery";
import dimension from "../../dimension";

interface Props {
	gallery: GalleryImageData[];
	index: number;
}

const GalleryImage: FC<Props> = props => {
	const { gallery, index } = props;

	return (
		<View>
			<Image style={styles.image} source={{ uri: gallery[index].url }} />
		</View>
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
