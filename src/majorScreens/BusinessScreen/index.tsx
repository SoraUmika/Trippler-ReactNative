import React, { FC } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";

import Info from "./Info";
import Action from "./Action";
import Header from "../../components/NavHeader";
import { getCurrentRecomData } from "../../redux/selectors";

const BusinessScreen: FC = () => {
	const currentData = useSelector(getCurrentRecomData);

	return (
		<ImageBackground source={{ uri: currentData.gallery[0].url }} style={styles.background}>
			<View style={styles.statusBarBlocker} />
			<Header />
			<View style={styles.headerShadow} />
			<View style={styles.viewContainer}>
				<Info currentBusiness={currentData} />
				<Action />
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1
	},
	statusBarBlocker: {
		height: getStatusBarHeight(),
		width: "100%",
		backgroundColor: "white"
	},
	headerShadow: {
		width: "100%",
		height: 8,
		backgroundColor: "white",
		opacity: 0.5
	},
	viewContainer: {
		marginTop: "auto",
		backgroundColor: "white",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24
	}
});

export default BusinessScreen;
