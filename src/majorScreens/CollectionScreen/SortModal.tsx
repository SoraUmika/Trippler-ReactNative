import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Modal from "../../components/Modal";
import dimension from "../../dimension";
import { SortMethod } from "../../redux/businessSortCompare";

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

	return (
		<Modal visible={visible} onHide={onHide} style={styles.container} animationType="fade">
			{methods.map(val => (
				<TouchableOpacity style={styles.optionButton} key={val[0]}>
					<Text style={styles.optionText}>{val[1]}</Text>
				</TouchableOpacity>
			))}
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: 170,
		height: 50 * methods.length + 16,
		top: dimension.height(0.08),
		left: dimension.width() - 170 - 16 - 48,
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
	}
});

export default SortModal;
