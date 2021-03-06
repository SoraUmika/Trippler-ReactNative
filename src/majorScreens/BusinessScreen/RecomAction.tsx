import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/Button";
import BookmarkBorder from "../../svg/BookmarkBorder";
import ArrowForward from "../../svg/ArrowForward";
import { getAccentColor, getRequestedBuss } from "../../redux/selectors";
import { toNextRecom, saveBusiness, grabRandBussiness } from "../../redux/action/actions";

interface Props {
	businessId: string;
}

const Action: FC<Props> = props => {
	const { businessId } = props;
	const accentColor = useSelector(getAccentColor);
	const dispatch = useDispatch();

	return (
		<View style={styles.root}>
			<Button
				height="100%"
				color={accentColor}
				style={styles.button}
				onPress={() => {
					dispatch(saveBusiness(businessId));
					dispatch(toNextRecom());
				}}
			>
				<View style={styles.buttonContent}>
					<BookmarkBorder fill="white" />
					<Text style={styles.buttonText}>Save</Text>
				</View>
			</Button>
			<Button
				height="100%"
				color="black"
				style={styles.button}
				onPress={() => dispatch(toNextRecom())}
			>
				<View style={styles.buttonContent}>
					<ArrowForward fill="white" />
					<Text style={styles.buttonText}>Next</Text>
				</View>
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		padding: 8,
		flexDirection: "row",
		justifyContent: "space-around",
		height: "100%"
	},
	button: {
		flex: 1,
		marginHorizontal: 32
	},
	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	buttonText: {
		color: "white",
		marginLeft: 16
	}
});

export default Action;
