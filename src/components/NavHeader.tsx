import React, { FC, memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import AccountCircle from "../svg/AccountCircle";
import Settings from "../svg/Settings";
import LogoSwitch from "./LogoSwitch";

interface Props {
	isCollection?: boolean;
}

const AlphaNavHeader: FC<Props> = props => {
	return (
		<View style={styles.root}>
			<TouchableOpacity style={styles.button}>
				<AccountCircle fill="black" width={32} height={32} />
			</TouchableOpacity>
			<View style={styles.switch}>
				<LogoSwitch {...props}/>
			</View>
			<TouchableOpacity style={styles.button}>
				<Settings fill="black" width={32} height={32} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		marginTop: getStatusBarHeight(),
		height: 65,
		flexDirection: "row",
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
	}
});

export default memo(AlphaNavHeader, () => true);
