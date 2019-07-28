/**
 * The collection section of the main page.
 *
 * TODO add filter functionality.
 * TODO add selection mode.
 * TODO add sort functionality.
 */
import React, { FC, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";

import TopBar from "../../components/TopBar";
import MoreHoriz from "../../svg/MoreHoriz";
import FilterList from "../../svg/FilterList";
import Sort from "../../svg/Sort";
import CollectionList from "./CollectionList";
import MainActionBar from "./MainActionBar";
import DashLine from "../../components/DashLine";
import ActionModal from "./ActionModal";
import SortModal from "./SortModal";
import { getBackgroundColor } from "../../redux/selectors";

interface Props {}

const Collection: FC = props => {
	const [actionVisible, setActionVisible] = useState(false);
	const [sortVisible, setSortVisible] = useState(false);
	const backgroundColor = useSelector(getBackgroundColor);

	return (
		<View style={[styles.container, { backgroundColor: backgroundColor }]}>
			{/* <View style={styles.mainAction}>
				<MainActionBar />
			</View>
			<View style={styles.dashContainer}>
				<DashLine />
			</View> */}
			<ActionModal visible={actionVisible} onHide={() => setActionVisible(false)} />
			<SortModal visible={sortVisible} onHide={() => setSortVisible(false)} />
			<View style={styles.title}>
				<TopBar title="Collection" color="black">
					<TouchableOpacity onPress={() => setActionVisible(true)}>
						<MoreHoriz style={styles.actionIcon} fill="black" width={32} height={32} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setSortVisible(true)}>
						<Sort style={styles.actionIcon} fill="black" width={32} height={32} />
					</TouchableOpacity>
					<TouchableOpacity>
						<FilterList style={styles.actionIcon} fill="black" width={32} height={32} />
					</TouchableOpacity>
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
		paddingTop: getStatusBarHeight()
	},
	mainAction: {
		flex: 1
	},
	title: {
		flex: 1
	},
	list: {
		flex: 10
	},
	actionIcon: {
		margin: 8
	},
	dashContainer: {
		flex: 0,
		padding: 16,
		paddingBottom: 0
	}
});

export default Collection;
