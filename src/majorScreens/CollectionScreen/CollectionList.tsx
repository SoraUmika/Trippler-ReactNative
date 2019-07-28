/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC, memo } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import {
	getCollectionItems,
	getCollectionItemsPinned,
	getCollectionShowPin
} from "../../redux/selectors";

import CollectionItem from "./CollectionItem";

const CollectionList: FC = () => {
	const items = useSelector(getCollectionItems);
	const showPin = useSelector(getCollectionShowPin);
	const itemsPinned = useSelector(getCollectionItemsPinned);
	const pinnedItemLength = itemsPinned.length;

	return (
		<FlatList
			data={[...(showPin ? itemsPinned : []), ...items]}
			// data={[...(showPin ? itemsPinned : []), ...items, ...items, ...items, ...items, ...items]}
			renderItem={({ item, index }) => {
				if (showPin && index < pinnedItemLength) {
					return <CollectionItem businessId={item} pinned showPin />;
				}
				return <CollectionItem businessId={item} showPin={showPin} />;
			}}
			keyExtractor={item => item}
			// keyExtractor={(item, index) => `${index}`}
		/>
	);
};

export default memo(CollectionList, () => true);
