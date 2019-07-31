import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import Modal from "./Modal";

interface Props {
	onHide: () => void;
	visible: boolean;
}

const FeedbackModal: FC<Props> = props => {
	const { onHide, visible } = props;

	return (
		<Modal
			onHide={onHide}
			visible={visible}
			style={styles.root}
			backgroundStyle={styles.background}
		/>
	);
};

const styles = StyleSheet.create({
	root: {
		width: "80%",
		height: "80%",
        backgroundColor: "white",
        borderRadius: 16
	},
	background: {
		alignItems: "center",
		justifyContent: "center"
	}
});

export default FeedbackModal;
