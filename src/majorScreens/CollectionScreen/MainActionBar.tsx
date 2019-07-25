import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import Button from "../../components/Button";
import BookmarkBorder from "../../svg/BookmarkBorder";
import CenterView from "../../components/CenterView";
import CircleOff from "../../svg/CircleOff";
import State from "../../redux/state";
import Share from "../../svg/Share";
import Feedback from "../../svg/Feedback";

const MainActionBar: FC = props => {
	const accentColor = useSelector<State, string>(state => state.theme.accentColor);

	return (
		<View style={styles.root}>
			<View style={styles.subAction}>
				<TouchableOpacity>
					<Feedback fill="white" style={styles.subButton} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Share fill="white" style={styles.subButton} />
				</TouchableOpacity>
			</View>
			<View style={styles.mainAction}>
				<Button height="100%" width={80} color={accentColor} style={styles.acceptButton}>
					<CenterView>
						<BookmarkBorder fill="white" />
					</CenterView>
				</Button>
				<Button height="100%" width={80} color="white">
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
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	mainAction: {
		flex: 1,
		// backgroundColor: "red",
		flexDirection: "row-reverse",
		alignItems: "center"
	},
	acceptButton: {
		marginLeft: 16
	},
	subButton: {
		flex: 0,
		// width: 60,
		height: "100%",
		marginLeft: 16,
		marginRight: 16
	}
});

export default MainActionBar;
