import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import dimension from "../../dimension";
import FiberPin from "../../svg/FiberPin";
import { getCollectionShowPin } from "../../redux/selectors";
import { toggleCollectShowPin } from "../../redux/action/actions";
import Modal from "../../components/Modal";

interface Props {
	visible: boolean;
	onHide: () => void;
}

const ActionModal: FC<Props> = props => {
	const { visible, onHide } = props;
	const dispatch = useDispatch();
	const showPin = useSelector(getCollectionShowPin);

	return (
		<Modal animationType="fade" visible={visible} onHide={onHide} style={styles.container}>
			<TouchableOpacity
				style={styles.optionButton}
				onPress={() => dispatch(toggleCollectShowPin())}
			>
				<FiberPin />
				<Text style={styles.optionText}>
					{showPin ? "Disable pinned" : "Enable pinned"}
				</Text>
			</TouchableOpacity>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: 170,
		height: 66,
		top: dimension.height(0.08),
		left: dimension.width() - 186,
		borderRadius: 8,
		padding: 8
	},
	background: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.1)",
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

export default ActionModal;
