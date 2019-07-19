import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Button from "./Button";
import BookmarkBorder from "../svg/BookmarkBorder";
import CenterView from "./CenterView";
import CircleOff from "../svg/CircleOff";
import State from "../redux/state";

const MainActionBar: FC = props => {
	const accentColor = useSelector<State, string>(state => state.theme.accentColor);

	return (
		<View style={styles.root}>
			<View style={styles.subAction} />
			<View style={styles.mainAction}>
				<Button height="100%" width={60} color={accentColor} style={styles.acceptButton}>
					<CenterView>
						<BookmarkBorder fill="white" />
					</CenterView>
				</Button>
				<Button height="100%" width={60} color="white">
					<CenterView>
						<CircleOff />
					</CenterView>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		flexDirection: "row",
		padding: 16,
		paddingBottom: 0
	},
	subAction: {
		flex: 1
	},
	mainAction: {
		flex: 1,
		// backgroundColor: "red",
		flexDirection: "row-reverse",
		alignItems: "center"
	},
	acceptButton: {
		marginLeft: 16
	}
});

export default MainActionBar;
