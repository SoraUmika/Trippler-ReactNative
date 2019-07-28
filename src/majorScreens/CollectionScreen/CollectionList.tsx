/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC, memo } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
	getCollectionShowPin,
	getAllCollectionItems,
	getCollectionSearchInput
} from "../../redux/selectors";
import { setCollectSearchInput } from "../../redux/action/actions";
import CollectionItem from "./CollectionItem";
import Input from "../../components/Input";
import Search from "../../svg/Search";

const CollectionList: FC = () => {
	const [items, pinnedItemLength] = useSelector(getAllCollectionItems);
	const showPin = useSelector(getCollectionShowPin);

	return (
		<FlatList
			data={items}
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
			ListHeaderComponent={Header}
		/>
	);
};

const Header = memo(
	() => {
		const searchInput = useSelector(getCollectionSearchInput);
		const dispatch = useDispatch();

		return (
			<View style={styles.headerContainer}>
				<Search style={styles.searchIcon} fill="#777"/>
				<Input
					width="85%"
					placeholder="search"
					onChange={e => dispatch(setCollectSearchInput(e.nativeEvent.text))}
				/>
			</View>
		);
	},
	() => true
);

const styles = StyleSheet.create({
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#f0f0f0",
		marginVertical: 8
	},
	headerContainer: {
		height: 60,
		marginHorizontal: 16,
		marginBottom: 8,
		marginTop: 4,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center"
	},
	searchIcon: {
		marginRight: 16
	}
});

export default memo(CollectionList, () => true);
