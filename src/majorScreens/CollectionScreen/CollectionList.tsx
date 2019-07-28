/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC, memo } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
	getCollectionItems,
	getCollectionItemsPinned,
	getCollectionShowPin
} from "../../redux/selectors";

import CollectionItem from "./CollectionItem";
import Input from "../../components/Input";
import Search from "../../svg/Search";

const CollectionList: FC = () => {
	const items = useSelector(getCollectionItems);
	const showPin = useSelector(getCollectionShowPin);
	const itemsPinned = useSelector(getCollectionItemsPinned);
	const pinnedItemLength = itemsPinned.length;

	return (
		<FlatList
			data={[...(showPin ? itemsPinned : []), ...items]}
			// data={[...(showPin ? itemsPinned : []), ...items, ...items, ...items, ...items]}
			renderItem={({ item, index }) => {
				if (showPin && index < pinnedItemLength) {
					return <CollectionItem businessId={item} pinned showPin />;
				}
				return <CollectionItem businessId={item} showPin={showPin} />;
			}}
			keyExtractor={item => item}
			// keyExtractor={(item, index) => `${index}`}
			ItemSeparatorComponent={() => {
				return <View style={styles.separator} />;
			}}
			ListHeaderComponent={() => {
				return (
					<View
						style={{
							height: 60,
							// backgroundColor: "black",
							marginHorizontal: 16,
							marginBottom: 8,
							marginTop: 4,
							alignItems: "center",
							flexDirection: "row",
							// backgroundColor: "red",
							justifyContent: "center"
						}}
					>
						<Search style={{marginRight: 16}}/>
						<Input width="85%" placeholder="search" />
					</View>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#f0f0f0",
		marginVertical: 8
	}
});

export default memo(CollectionList, () => true);
