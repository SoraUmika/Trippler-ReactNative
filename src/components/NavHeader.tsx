import React, { FC, memo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Settings from "../svg/Settings";
import LogoSwitch from "./LogoSwitch";
import Feedback from "../svg/Feedback";
import FeedbackModal from "./FeedbackModal";

interface Props {
	isCollection?: boolean;
	navigation?: any;
}

const AlphaNavHeader: FC<Props> = props => {
	const {
		navigation: { navigate },
		isCollection
	} = props;
	const [feedbackOpen, setFeedbackOpen] = useState(false);

	return (
		<React.Fragment>
			<FeedbackModal visible={feedbackOpen} onHide={() => setFeedbackOpen(false)} />
			<View style={styles.root}>
				<TouchableOpacity style={styles.button} onPress={() => setFeedbackOpen(true)}>
					<Feedback fill="#47A025" width={32} height={32} />
				</TouchableOpacity>
				<View style={styles.switch}>
					<LogoSwitch isCollection={isCollection} navigate={navigate} />
				</View>
				<TouchableOpacity style={styles.button} onPress={() => navigate("Setting")}>
					<Settings fill="black" width={32} height={32} />
				</TouchableOpacity>
			</View>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	root: {
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

export default withNavigation<Props>(memo(AlphaNavHeader, () => true));
