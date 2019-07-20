import React, { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Color from "color";

import ArrowUpward from "../svg/ArrowUpward";
import CenterView from "./CenterView";
import Business from "../redux/state/Business";
import CollectionData from "../redux/state/CollectionData";
import State from "../redux/state";
import DeleteOutline from "../svg/DeleteOutline";
import ArrowDownward from "../svg/ArrowDownward";

interface Props {
	businessId: string;
}

const RightAction = (pinned: boolean, onDelete: Function, onPinToggle: Function) => {
	return (
		<View style={styles.rightActionContainer}>
			<TouchableOpacity style={styles.rightActionButton}>
				<DeleteOutline fill="#D52941" />
				<Text style={styles.rightActionDeleteText}>Delete</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.rightActionButton}>
				{pinned ? <ArrowDownward fill="#0EAD69" /> : <ArrowUpward fill="#0EAD69" />}
				<Text style={styles.rightActionPinText}>{pinned ? "Un-pin" : "Pin"}</Text>
			</TouchableOpacity>
		</View>
	);
};

const CollectionItem: FC<Props> = props => {
	const { businessId } = props;
	const business = useSelector<State, Business>(state => state.businesses[businessId]);
	const itemData = useSelector<State, CollectionData>(
		state => state.collection.items[businessId]
	);
	const accentColor = useSelector<State, string>(state => state.theme.accentColor);

	return (
		<Swipeable renderRightActions={() => RightAction(itemData.pinned, () => null, () => null)}>
			<View style={styles.root}>
				<View style={styles.container}>
					<View style={styles.avatar} />
					<View style={styles.description}>
						<CenterView main>
							<Text style={styles.name}>{business.name}</Text>
							{itemData.pinned && (
								<ArrowUpward
									fill={accentColor}
									style={styles.pinIcon}
									opacity={0.75}
								/>
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
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: Color("#3B413C")
			.darken(0.05)
			.string(),
		margin: 16,
		height: 80,
		marginTop: 0
	},
	container: {
		flex: 1,
		flexDirection: "row"
	},
	avatar: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
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
	},
	rightActionContainer: {
		flex: 0,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 16,
		marginRight: 16
	},
	rightActionDeleteText: {
		color: "#D52941",
		marginRight: 16,
		fontWeight: "bold"
	},
	rightActionPinText: {
		color: "#0EAD69",
		marginRight: 16,
		fontWeight: "bold"
	},
	rightActionButton: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center"
	}
});

export default CollectionItem;
