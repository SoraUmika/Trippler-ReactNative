import React, { FC } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import dimension from "../../dimension";
import BookmarkBorder from "../../svg/BookmarkBorder";
import { getCollectionShowPin } from "../../redux/selectors";
import { toggleCollectShowPin } from "../../redux/action/actions";

interface Props {
	visible: boolean;
	onHide: () => void;
}

const ActionModal: FC<Props> = props => {
	const { visible, onHide } = props;
	const dispatch = useDispatch();
	const showPin = useSelector(getCollectionShowPin);

	return (
		<Modal animationType="fade" transparent={true} visible={visible}>
			<View style={styles.background} onTouchStart={onHide}>
				<View style={styles.container} onTouchStart={evt => evt.stopPropagation()}>
					<TouchableOpacity
						style={styles.optionButton}
						onPress={() => dispatch(toggleCollectShowPin())}
					>
						<BookmarkBorder />
						<Text style={styles.optionText}>
							{showPin ? "Disable pinned" : "Enable pinned"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
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

export default ActionModal;
