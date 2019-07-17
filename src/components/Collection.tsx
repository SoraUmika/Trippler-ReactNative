import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

const Collection: FC = props => {
	return (
		<View style={styles.container}>
			<View style={styles.mainAction} />
			<View style={styles.title} />
			<View style={styles.list} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	mainAction: {},
	title: {},
	list: {}
});

export default Collection;
