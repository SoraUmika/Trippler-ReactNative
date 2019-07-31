import React, { FC, memo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import Settings from "../svg/Settings";
import LogoSwitch from "./LogoSwitch";
import Feedback from "../svg/Feedback";
import FeedbackModal from "./FeedbackModal";

interface Props {
	isCollection?: boolean;
}

const AlphaNavHeader: FC<Props> = props => {
	const [feedbackOpen, setFeedbackOpen] = useState(false);

	return (
		<React.Fragment>
			<FeedbackModal visible={feedbackOpen} onHide={() => setFeedbackOpen(false)} />
			<View style={styles.root}>
				<TouchableOpacity style={styles.button} onPress={() => setFeedbackOpen(true)}>
					<Feedback fill="#47A025" width={32} height={32} />
				</TouchableOpacity>
				<View style={styles.switch}>
					<LogoSwitch {...props} />
				</View>
				<TouchableOpacity style={styles.button}>
					<Settings fill="black" width={32} height={32} />
				</TouchableOpacity>
			</View>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	root: {
		marginTop: getStatusBarHeight(),
		height: 65,
		flexDirection: "row",
		backgroundColor: "white"
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		width: 65,
		height: 65
	},
	switch: {
		flex: 2
	}
});

export default memo(AlphaNavHeader, () => true);
