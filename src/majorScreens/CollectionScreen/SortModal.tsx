import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import Modal from "../../components/Modal";

interface Props {
	visible: boolean;
	onHide: () => void;
}

const SortModal: FC<Props> = props => {
	const { visible, onHide } = props;

	return (
		<Modal
			visible={visible}
			onHide={onHide}
			style={styles.container}
			shadowStyle={styles.shadow}
			animationType="fade"
		>
			<View />
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 200,
		height: 200,
		backgroundColor: "white"
	},
	shadow: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default SortModal;
