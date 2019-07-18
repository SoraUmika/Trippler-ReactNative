import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
	title: string;
}

export default class TopBar extends Component<Props> {
	render() {
		const { title, children } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.actions}>{children}</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		padding: 16
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center"
	},
	title: {
		fontWeight: "bold",
        fontSize: 32,
        color: "white"
	},
	actions: {
		flex: 1,
		flexDirection: "row-reverse",
		alignItems: "center"
	}
});
