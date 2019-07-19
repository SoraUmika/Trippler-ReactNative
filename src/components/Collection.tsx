import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import TopBar from "./TopBar";
import MoreHoriz from "../svg/MoreHoriz";
import FilterList from "../svg/FilterList";
import CollectionList from "./CollectionList";
import MainActionBar from "./MainActionBar"

interface Props {}

const Collection: FC = props => {
	return (
		<View style={styles.container}>
			<View style={styles.mainAction} >
				<MainActionBar/>
			</View>
			<View style={styles.title}>
				<TopBar title="Collection">
					<MoreHoriz style={styles.actionIcon} fill="white" width={32} height={32} />
					<FilterList style={styles.actionIcon} fill="white" width={32} height={32} />
				</TopBar>
			</View>
			<View style={styles.list}>
				<CollectionList />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#3B413C"
	},
	mainAction: {
		flex: 1
	},
	title: {
		flex: 1
	},
	list: {
		flex: 8
	},
	actionIcon: {
		margin: 8
	}
});

export default Collection;
