import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import CollectionItem from "./CollectionItem";

export default class CollectionList extends Component {
	render() {
		return (
			<View style={styles.container}>
				<CollectionItem businessId="test"/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "red",
		flex: 1
	}
});
