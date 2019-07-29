import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const AlphaNavHeader: FC = () => {
	return <View style={styles.root} />;
};

const styles = StyleSheet.create({
	root: {
		marginTop: getStatusBarHeight(),
		height: 65
	}
});

export default AlphaNavHeader;
