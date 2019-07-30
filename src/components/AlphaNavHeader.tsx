import React, { FC, memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import AccountCircle from "../svg/AccountCircle";
import Settings from "../svg/Settings";
import LogoSwitch from "./LogoSwitch";

const AlphaNavHeader: FC<any> = props => {
	return (
		<React.Fragment>
			<View style={styles.root}>
				<TouchableOpacity style={styles.button}>
					<AccountCircle fill="black" width={32} height={32} />
				</TouchableOpacity>
				<View style={styles.switch}>
					<LogoSwitch />
				</View>
				<TouchableOpacity style={styles.button}>
					<Settings fill="black" width={32} height={32} />
				</TouchableOpacity>
			</View>
			<View style={styles.shadow} />
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	root: {
		marginTop: getStatusBarHeight(),
		height: 65,
		flexDirection: "row",
		zIndex: 1,
		backgroundColor: "white"
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		width: 65,
		height: 65
	},
	switch: {
		flex: 2
	},
	shadow: {
		position: "absolute",
		width: "100%",
		height: 65,
		backgroundColor: "white",
		opacity: 0.5,
		top: 0,
		left: 0,
		marginTop: getStatusBarHeight() + 8
	}
});

export default memo(AlphaNavHeader, () => true);
