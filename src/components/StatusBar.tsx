import React, { FC } from "react";
import { View, StatusBar, StyleSheet, StatusBarProps, Platform } from "react-native";

const StatusBar_: FC<StatusBarProps> = props => {
	const { backgroundColor, ...other } = props;
	return (
		<View style={{...styles.root, backgroundColor: backgroundColor }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...other} />
		</View>
	);
};

const statusBarheight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    root: {
        height: statusBarheight
    }
})

export default StatusBar_;
