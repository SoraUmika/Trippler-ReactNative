import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

import Explore from "../../svg/Explore";
import BookmarkBorder from "../../svg/BookmarkBorder";
import Restaurant from "../../svg/Restaurant";

interface Props {
	type: "recommendation" | "collection";
}

const Status: FC<Props> = props => {
	const { type } = props;

	return (
		<View style={styles.root}>
			{type == "collection" ? <BookmarkBorder /> : <Explore />}
			<Text style={styles.text}>{type == "collection" ? "Saved" : "Recommended"}</Text>
			<View style={styles.separator} />
			<Restaurant />
			<Text style={styles.text}>Restaurant</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		height: 40,
		padding: 8,
		backgroundColor: "white",
		opacity: 0.5,
		borderRadius: 8,
		marginRight: "auto",
		flexDirection: "row",
		alignItems: "center"
	},
	separator: {
		width: 2,
		height: 24,
		backgroundColor: "black",
		marginHorizontal: 8,
		opacity: 0.5
	},
	text: {
		marginLeft: 8,
		fontWeight: "bold"
	}
});

export default Status;
