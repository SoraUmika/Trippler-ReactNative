import React, { FC, memo, useState, ReactNode } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Color from "color";

import Modal from "./Modal";
import Input from "./Input";
import Close from "../svg/Close";
import Check from "../svg/Check";
import DashLine from "./DashLine";

interface Props {
	onHide: () => void;
	visible: boolean;
}

type categoryTypes = "Bug" | "UI/UX" | "Performance" | "Suggestion";

const categories: [ReactNode, categoryTypes][] = [
	[<Check />, "Bug"],
	[<Check />, "Performance"],
	[<Check />, "Suggestion"],
	[<Check />, "UI/UX"]
];

const instructions = {
	Bug: "Describe what is the bug and how to reproduce it.",
	"UI/UX": "Describe the issue.",
	Performance: "Describe the issue",
	Suggestion: "Describe the suggestion"
};

const FeedbackModal: FC<Props> = props => {
	const { onHide, visible } = props;
	const [category, setCategory] = useState<categoryTypes>("Bug");

	return (
		<Modal onHide={onHide} visible={visible} style={styles.root} animationType="slide">
			<Text style={styles.title}>Feedback</Text>
			<Text style={styles.description}>Help us to improve Tripplar ♥</Text>
			<View style={styles.categoryContainer}>
				{categories.map(([icon, text]) => {
					const isSelected = category == text;
					return (
						<TouchableOpacity
							style={[styles.categoryButton, isSelected ? styles.buttonActive : {}]}
							key={text}
							onPress={() => !isSelected && setCategory(text)}
						>
							{icon}
							<Text style={styles.categoryText}>{text}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
			<Text style={styles.instruction}>{instructions[category]}</Text>
			<Input
				multiline
				containerStyle={styles.inputContainer}
				style={styles.input}
				placeholder="Type here"
				autoCorrect
			/>
			<View style={styles.action}>
				<TouchableOpacity style={styles.checkButton}>
					<Check width={32} height={32} fill="#47A025" />
				</TouchableOpacity>
				<TouchableOpacity onPress={onHide} style={styles.closeButton}>
					<Close width={32} height={32} fill="#b0b0b0" />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	root: {
		width: "100%",
		// height: "100%",
		backgroundColor: "white",
		padding: 16,
		bottom: 0,
		left: 0,
		position: "absolute",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	},
	description: {
		marginVertical: 24,
		fontSize: 20
	},
	inputContainer: {
		height: 200,
		paddingVertical: 16
	},
	input: {
		textAlignVertical: "top",
		height: "100%"
	},
	title: {
		fontSize: 32,
		// fontFamily: "FredokaOne",
		fontWeight: "500"
	},
	action: {
		width: "100%",
		flex: 1,
		flexDirection: "row-reverse",
		alignItems: "flex-end",
		padding: 32,
		paddingBottom: 16
	},
	checkButton: {
		marginLeft: 32,
		backgroundColor: Color("#47A025")
			.lighten(1.5)
			.toString(),
		borderRadius: 8,
		padding: 8,
		width: 48
	},
	closeButton: {
		padding: 8,
		backgroundColor: Color("#b0b0b0")
			.lighten(0.4)
			.toString(),
		borderRadius: 8,
		width: 48
	},
	categoryContainer: {
		flexDirection: "row",
		marginVertical: 16
	},
	categoryButton: {
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
		flexDirection: "row",
		padding: 8
	},
	buttonActive: {
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#47A02533"
	},
	categoryText: {
		marginLeft: 4
	},
	instruction: {
		opacity: 0.5,
		fontStyle: "italic",
		marginBottom: 16
	}
});

const propsAreEqual = (prevProps: Props, nextProps: Props) =>
	prevProps.visible == nextProps.visible;

export default memo(FeedbackModal, propsAreEqual);
