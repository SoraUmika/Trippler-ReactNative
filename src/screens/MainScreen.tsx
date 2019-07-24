/**
 * Main screen of Tripplar.
 */
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import MainPage from "../pages/MainPage";
import InfoPage from "../pages/InfoPage";

const MainScreen: FC = props => {
	return (
		<View style={styles.container}>
			<View style={styles.galleryCard} />
			<InfoPage />
			<MainPage />
		</View>
	);
};

const styles = StyleSheet.create({
	infoCard: {
		backgroundColor: "white"
	},
	galleryCard: {
		backgroundColor: "blue",
		position: "absolute",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0
	},
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "black"
	}
});

export default MainScreen;
