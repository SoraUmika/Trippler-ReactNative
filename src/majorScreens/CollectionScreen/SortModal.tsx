import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../components/Modal";
import dimension from "../../dimension";
import { SortMethod } from "../../redux/businessSortCompare";
import { getCollectionSortMethod } from "../../redux/selectors";
import { setCollectSortMethod } from "../../redux/action/actions";
import Check from "../../svg/Check";
import DashLine from "../../components/DashLine";

interface Props {
	visible: boolean;
	onHide: () => void;
}

const methods: [SortMethod, string][] = [
	["name", "name"],
	["rating", "rating"],
	["avgRating", "avg. rating"]
];

const SortModal: FC<Props> = props => {
	const { visible, onHide } = props;
	const sortMethod = useSelector(getCollectionSortMethod);
	const dispatch = useDispatch();

	return (
		<Modal visible={visible} onHide={onHide} style={styles.container} animationType="fade">
			<View style={styles.titleContainer}>
				<Text>Sort by...</Text>
				<DashLine />
			</View>
			{methods.map(val => (
				<TouchableOpacity
					style={styles.optionButton}
					key={val[0]}
					onPress={() => {
						if (val[0] != sortMethod) {
							dispatch(setCollectSortMethod(val[0]));
							onHide();
						}
					}}
				>
					{sortMethod == val[0] && <Check />}
					<Text style={styles.optionText}>{val[1]}</Text>
				</TouchableOpacity>
			))}
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: 150,
		height: 50 * methods.length + 16 + 40,
		top: dimension.height(0.09),
		left: dimension.width() - 150 - 8 - 48,
		borderRadius: 8,
		padding: 8
	},
	optionButton: {
		width: "100%",
		height: 50,
		alignItems: "center",
		flexDirection: "row",
		paddingRight: 4
	},
	optionText: {
		textAlign: "right",
		flex: 1,
		fontWeight: "bold"
	},
	titleContainer: {
		height: 40,
		justifyContent: "space-around"
	}
});

export default SortModal;
