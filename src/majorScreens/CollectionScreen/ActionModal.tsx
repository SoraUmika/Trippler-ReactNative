import React, { Component, ElementType } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import dimension from "../../dimension";
import BookmarkBorder from "../../svg/BookmarkBorder";

interface Props {
	visible: boolean;
	onHide: () => void;
}

export default class ActionModal extends Component<Props> {
	render() {
		const { visible, onHide } = this.props;

		return (
			<Modal animationType="fade" transparent={true} visible={visible}>
				<View style={styles.background} onTouchStart={onHide}>
					<View style={styles.container}>
						<TouchableOpacity style={styles.optionButton}>
							<BookmarkBorder/>
							<Text style={styles.optionText}>Hide pinned</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: 150,
		height: 66,
		top: dimension.height(0.08),
		left: dimension.width() - 166,
		zIndex: 2,
		borderRadius: 8,
		padding: 8
	},
	background: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.1)",
		zIndex: 1
	},
	optionButton: {
		width: "100%",
		height: 50,
		alignItems: "center",
		flexDirection: "row",
		paddingRight: 8
	},
	optionText: {
		textAlign: "right",
		flex: 1,
		fontWeight: "bold"
	}
});
