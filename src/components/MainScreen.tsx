/**
 * Main screen of Tripplar.
 */
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import MainPage from "../pages/MainPage";
import PageCard from "./PageCard";

const MainScreen: FC = props => {
	return (
		<View style={styles.container}>
			<View style={styles.galleryCard} />
			<PageCard
				topPercent={0.5}
				backgroundColor="white"
				topMargin={50}
				bottomPadding={100}
				triggerMargin={{
					unExpand: 150,
					expand: 150,
					collapse: 150,
					unCollapse: 150
				}}
			/>
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
		height: "100%"
	}
});

export default MainScreen;
