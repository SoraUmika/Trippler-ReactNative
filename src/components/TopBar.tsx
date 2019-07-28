/**
 * The top bar in each sections of main page.
 * It holds the title and action buttons.
 *
 * @param {string} title The title of the section.
 * @param {string} color The color of the title.
 */
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
	title: string;
	color: string;
}

export default class TopBar extends Component<Props> {
	render() {
		const { title, children, color } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={{ ...styles.title, color: color }}>{title}</Text>
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
		padding: 16,
		borderColor: "#ddd",
		borderBottomWidth: 1
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center"
	},
	title: {
		fontWeight: "bold",
		fontSize: 32
	},
	actions: {
		flex: 1,
		flexDirection: "row-reverse",
		alignItems: "center"
	}
});
