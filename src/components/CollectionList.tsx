/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import CollectionItem from "./CollectionItem";

const CollectionList: FC = () => {

	return (
		<ScrollView style={styles.container} bounces indicatorStyle="white">
			<CollectionItem businessId=":)" />
			<CollectionItem businessId="hello" />
			<CollectionItem businessId="test" />
			<CollectionItem businessId=":)" />
			<CollectionItem businessId="hello" />
			<CollectionItem businessId="test" />
			<CollectionItem businessId=":)" />
			<CollectionItem businessId="hello" />
			<CollectionItem businessId="test" />
			<CollectionItem businessId=":)" />
			<CollectionItem businessId="hello" />
			<CollectionItem businessId="test" />
			<CollectionItem businessId=":)" />
			<CollectionItem businessId="hello" />
			<CollectionItem businessId="test" />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default CollectionList;
