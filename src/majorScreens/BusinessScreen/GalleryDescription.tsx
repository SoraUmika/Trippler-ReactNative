import React, { FC, memo } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
	text: string;
	index: number;
	imageNum: number;
}

const GalleryDescription: FC<Props> = props => {
	const { text } = props;

	return (
		<View style={styles.root}>
			<Text>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		opacity: 0.75,
		borderRadius: 16,
        padding: 16,
        width: "80%",
        height: 100
	}
});

export default memo(GalleryDescription, (p, c) => p.text == c.text);
