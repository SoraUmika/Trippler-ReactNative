import React, { FC, memo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { withNavigation } from "react-navigation";

import { getIsFontLoaded } from "../redux/selectors";

interface Props {
	isCollection?: boolean;
	navigation?: any;
}

const LogoSwitch: FC<Props> = props => {
	const isFontLoaded = useSelector(getIsFontLoaded);
	const {
		navigation: { navigate },
		isCollection
	} = props;

	if (!isFontLoaded) return null;

	return (
		<View
			style={styles.root}
			onTouchEnd={() => {
				navigate(isCollection ? "Business" : "Collection");
			}}
		>
			<Text style={[styles.text, { marginBottom: isCollection ? 0 : 8 }]}>Trip</Text>
			<Text style={[styles.text, { marginBottom: isCollection ? 8 : 0 }]}>plar</Text>
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
