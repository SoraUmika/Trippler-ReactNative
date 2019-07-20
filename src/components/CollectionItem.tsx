import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Color from "color";

import ArrowUpward from "../svg/ArrowUpward";
import CenterView from "./CenterView";
import Business from "../Business";
import State from "../redux/state";

interface Props {
	businessId: string;
}

const RightAction = () => {
	return (
		<View
			style={{
				flex: 0,
				justifyContent: "center",
				alignItems: "flex-end"
			}}
		>
			<Text
				style={{
					color: "white",
					padding: 8
				}}
			>
				Delete
			</Text>
		</View>
	);
};

const CollectionItem: FC<Props> = props => {
	const { businessId } = props;
	const business = useSelector<State, Business>(state => state.businesses[businessId]);
	const pinned = useSelector<State, boolean>(state => state.collection.items[businessId]);
	const accentColor = useSelector<State, string>(state => state.theme.accentColor);

	return (
		<Swipeable renderRightActions={RightAction}>
			<View style={styles.root}>
				<View style={styles.container}>
					<View style={styles.avatar} />
					<View style={styles.description}>
						<CenterView main>
							<Text style={styles.name}>{business.name}</Text>
							{pinned && (
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
	}
});

export default CollectionItem;
