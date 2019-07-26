/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import {
	getCollectionItems,
	getCollectionItemsPinned,
	getCollectionShowPin
} from "../../redux/selectors";

import CollectionItem from "./CollectionItem";

const CollectionList: FC = () => {
	const items = useSelector(getCollectionItems);
	const itemsPinned = useSelector(getCollectionItemsPinned);
	const showPin = useSelector(getCollectionShowPin);
	return (
		<ScrollView style={styles.container} bounces indicatorStyle="black">
			{showPin && itemsPinned.map(id => <CollectionItem businessId={id} pinned key={id} />)}
			{items.map(id => (
				<CollectionItem businessId={id} key={id} showPin={showPin} />
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
