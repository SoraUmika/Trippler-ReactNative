import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

const SettingScreen: FC = () => {
	return (
		<View style={styles.root}>
			<Text>Setting</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1
	}
});

export default SettingScreen;
