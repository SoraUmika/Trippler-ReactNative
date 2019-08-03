import React, { FC, memo } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
	text: string;
	index: number;
	imageNum: number;
}

const GalleryDescription: FC<Props> = props => {
	const { text, index, imageNum } = props;

	return (
		<View style={styles.root}>
			<Text style={styles.text}>{text}</Text>
			<View style={styles.indexIndicatorContainer}>
				{getIndexIndicators(index, imageNum)}
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
		height: 100
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
		backgroundColor: "#ccc",
		borderRadius: 4,
		marginRight: 4
	},
	indicatorActive: {
		backgroundColor: "#aaa"
	}
});

export default memo(GalleryDescription, (p, c) => p.text == c.text);
