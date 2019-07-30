import React, { FC, memo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { withNavigation } from "react-navigation";

import { getIsFontLoaded } from "../redux/selectors";

const LogoSwitch: FC<any> = props => {
	const [state, setState] = useState(false);
	const isFontLoaded = useSelector(getIsFontLoaded);
	const { navigate } = props.navigation;

	if (!isFontLoaded) return null;

	return (
		<View
			style={styles.root}
			onTouchEnd={() => {
				navigate(state ? "Business" : "Collection");
				setState(!state);
			}}
		>
			<Text style={[styles.text, { marginBottom: state ? 0 : 8 }]}>Trip</Text>
			<Text style={[styles.text, { marginBottom: state ? 8 : 0 }]}>plar</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontFamily: "FredokaOne",
		fontSize: 24
	}
});

export default withNavigation(memo(LogoSwitch, () => true));
