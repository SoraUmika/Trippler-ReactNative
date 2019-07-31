import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import Data from "./Data";
import Action from "./Action";
import Header from "../../components/NavHeader";

const BusinessScreen: FC = () => {
	return (
		<View style={styles.formatRules}>
			<Header />
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
		justifyContent: "center",
	},

	actionContainer: {
		flex: 1
	}
});

export default BusinessScreen;
