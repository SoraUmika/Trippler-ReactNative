import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import ArrowUpward from "../svg/ArrowUpward";
import CenterView from "./CenterView";
import Business from "../Business";
import State from "../redux/state"

interface Props {
	businessId: string;
}

const CollectionItem: FC<Props> = props => {
	const { businessId } = props;
    const business = useSelector<State, Business>(state => state.businesses[businessId]);
    const pinned = useSelector<State, boolean>(state => state.collection.items[businessId]);

	return (
		<View style={styles.root}>
			<View style={styles.container}>
				<View style={styles.avatar} />
				<View style={styles.description}>
					<CenterView main>
						<Text style={styles.name}>{business.name}</Text>
						{pinned && (
							<ArrowUpward fill="white" style={styles.pinIcon} opacity={0.75} />
						)}
					</CenterView>
					<View style={styles.statContainer}>
						<CenterView main>
							<Text style={styles.status}>Currently {business.status}</Text>
						</CenterView>
						<View style={styles.ratingContainer}>
							<Text style={styles.ratingNum}>({business.ratingNum})</Text>
							<Text style={styles.rating}>{business.rating}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#0D0D0D",
		margin: 16,
		height: 80
	},
	container: {
		flex: 1,
		flexDirection: "row"
	},
	avatar: {
		backgroundColor: "gray",
		width: 80,
		height: 80
	},
	description: {
		flex: 1,
		padding: 16
	},
	name: {
		color: "white",
		opacity: 0.75,
		fontWeight: "bold",
		fontSize: 24
	},
	status: {
		color: "white",
		opacity: 0.5,
		fontSize: 16
	},
	rating: {
		color: "white",
		opacity: 0.5,
		textAlign: "right",
		fontSize: 16,
		flex: 0,
		fontWeight: "bold"
	},
	statContainer: {
		flex: 1,
		flexDirection: "row",
		marginTop: 16
	},
	pinIcon: {
		position: "absolute",
		right: 0
	},
	ratingNum: {
		color: "white",
		opacity: 0.5,
		textAlign: "right",
		fontSize: 16,
		flex: 0
	},
	ratingContainer: {
		flex: 1,
		flexDirection: "column",
		flexWrap: "wrap-reverse"
	}
});

export default CollectionItem;
