import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import Data from "./Data";
import Action from "./Action";

const BusinessScreen: FC = () => {
	return (
		<View style={styles.formatRules}>
			<View style={styles.dataContainer}>
				<Data />
			</View>
			<View style={styles.actionContainer}>
				<Action />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	formatRules: {
		flexDirection: "column",
		flex: 1
	},

	dataContainer: {
		flex: 9,
		backgroundColor: "grey",
		justifyContent: "center",
		borderRadius: 12
	},

	actionContainer: {
		flex: 1
	}
});

export default BusinessScreen;
