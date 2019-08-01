import React, { FC, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Feedback from "../../svg/Feedback";
import FeedbackModal from "../../components/FeedbackModal";

const SettingScreen: FC = () => {
	const [feedbackOpen, setFeedbackOpen] = useState(false);

	return (
		<View style={styles.root}>
			<FeedbackModal visible={feedbackOpen} onHide={() => setFeedbackOpen(false)} />
			<Text>Coming soon</Text>
			<Text>Help the development by give us feedback</Text>
			<TouchableOpacity style={styles.feedbackButton} onPress={() => setFeedbackOpen(true)}>
				<Feedback fill="#47A025" />
				<Text style={styles.feedbackText}>Write a feedback</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1
	},
	feedbackButton: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		margin: 24
	},
	feedbackText: {
		fontWeight: "500",
		color: "#47A025",
		marginLeft: 8
	}
});

export default SettingScreen;
