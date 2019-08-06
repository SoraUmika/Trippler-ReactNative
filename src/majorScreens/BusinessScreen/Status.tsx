import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

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
			<View style={styles.separator} />
			<Restaurant />
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
		flexDirection: "row"
	},
	separator: {
		width: 2,
		height: 24,
		backgroundColor: "black",
		marginHorizontal: 4,
		opacity: 0.5
	}
});

export default Status;
