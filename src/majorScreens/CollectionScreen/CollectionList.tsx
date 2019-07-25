/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { getCollectionItems } from "../../redux/selectors";

import CollectionItem from "./CollectionItem";

const CollectionList: FC = () => {
	const items = useSelector(getCollectionItems);
	return (
		<ScrollView style={styles.container} bounces indicatorStyle="white">
			{Object.keys(items).map(id => (
				<CollectionItem businessId={id} itemData={items[id]} key={id}/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default CollectionList;
