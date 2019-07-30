import React, { FC, memo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import { getIsFontLoaded } from "../redux/selectors";

const LogoSwitch: FC = () => {
	const [state, setState] = useState(false);
	const isFontLoaded = useSelector(getIsFontLoaded);

	if (!isFontLoaded) return null;

	return (
		<View style={styles.root}>
			<Text style={styles.text}>Trip</Text>
			<Text style={styles.text}>plar</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "red",
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontFamily: "FredokaOne"
	}
});

export default memo(LogoSwitch, () => true);
