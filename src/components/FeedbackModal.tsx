import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Modal from "./Modal";
import Input from "./Input";
import Close from "../svg/Close";
import Check from "../svg/Check";

interface Props {
	onHide: () => void;
	visible: boolean;
}

const FeedbackModal: FC<Props> = props => {
	const { onHide, visible } = props;

	return (
		<Modal onHide={onHide} visible={visible} style={styles.root} animationType="slide">
			<Text style={styles.title}>Feedback</Text>
			<Text>Help us to improve Tripplar ♥</Text>
			<Input
				multiline
				containerStyle={styles.inputContainer}
				style={styles.input}
				placeholder="Type here"
			/>

			<View style={styles.action}>
				<TouchableOpacity style={styles.checkButton}>
					<Check width={32} height={32} fill="#47A025" />
				</TouchableOpacity>
				<TouchableOpacity onPress={onHide} style={styles.closeButton}>
					<Close width={32} height={32} />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	root: {
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		borderRadius: 8,
		padding: 16,
		bottom: 0,
		left: 0,
		position: "absolute"
	},
	inputContainer: {
		marginTop: 16,
		height: 200,
		paddingVertical: 16
	},
	input: {
		textAlignVertical: "top",
		height: "100%"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16
	},
	action: {
		width: "100%",
		flex: 1,
		flexDirection: "row-reverse",
		alignItems: "flex-end",
		padding: 16
	},
	checkButton: {
		marginLeft: 32,
		backgroundColor: "#47A02566",
		borderRadius: 8,
		padding: 8
	},
	closeButton: {
		padding: 8,
		backgroundColor: "#0006",
		borderRadius: 8
	}
});

export default FeedbackModal;
