import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import DeleteOutline from "../../svg/DeleteOutline";
import { removedCollectItem, openBusiness } from "../../redux/action/actions";

interface Props {
	businessId: string;
}

const Action: FC<Props> = props => {
	const { businessId } = props;
	const dispatch = useDispatch();

	return (
		<View style={styles.root}>
			<Button
				height="100%"
				color="black"
				style={styles.button}
				onPress={() => {
					dispatch(removedCollectItem(businessId));
					dispatch(openBusiness(null));
				}}
			>
				<View style={styles.buttonContent}>
					<DeleteOutline fill="white" />
					<Text style={styles.buttonText}>Remove</Text>
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
