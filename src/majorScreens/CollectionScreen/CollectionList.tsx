/**
 * List of collection items, displayed in collection section of main page.
 *
 * TODO auto reads the collections from store.
 * TODO edge transparency.
 */
import React, { FC, memo } from "react";
import { FlatList, View, StyleSheet, TextInput, Text } from "react-native";
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
import Close from "../../svg/Close";
import { TouchableOpacity } from "react-native-gesture-handler";

const CollectionList: FC = () => {
	const [items, pinnedItemLength] = useSelector(getAllCollectionItems);
	const showPin = useSelector(getCollectionShowPin);

	return (
		<FlatList
			data={items}
			renderItem={({ item, index }) => {
				if (showPin && index < pinnedItemLength) {
					return <CollectionItem businessId={item} pinned showPin />;
				}
				return <CollectionItem businessId={item} showPin={showPin} />;
			}}
			keyExtractor={item => item}
			ItemSeparatorComponent={() => {
				return <View style={styles.separator} />;
			}}
			ListHeaderComponent={Header}
			removeClippedSubviews
			getItemLayout={(data, index) => ({ length: 97, offset: 97 * index, index })}
			ListFooterComponent={() => <Text style={styles.footerText}>hello</Text>}
		/>
	);
};

const Header = memo(
	() => {
		const dispatch = useDispatch();
		const searchInput = useSelector(getCollectionSearchInput);

		return (
			<Input
				leftComponent={<Search style={styles.searchIcon} fill="#777" />}
				rightComponent={
					<TouchableOpacity
						style={styles.clearButton}
						onPress={() => dispatch(setCollectSearchInput(""))}
					>
						<Close fill="#777" />
					</TouchableOpacity>
				}
				containerStyle={styles.headerContainer}
				placeholder="search"
				value={searchInput}
				onChange={e => dispatch(setCollectSearchInput(e.nativeEvent.text))}
			/>
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
		margin: 16,
		paddingRight: 0
	},
	searchIcon: {
		marginRight: 16
	},
	searchInput: {
		flex: 1
	},
	clearButton: {
		padding: 18,
		backgroundColor: "rgba(0,0,0,0.025)",
		borderRadius: 8
	},
	footerText: {
		textAlign: "center",
		padding: 8,
		opacity: 0.5,
		fontStyle: "italic",
		fontWeight: "500"
	}
});

export default memo(CollectionList, () => true);
