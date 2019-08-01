import React, { FC } from "react";
import { View, StyleSheet, Text, Animated, Easing } from "react-native";
import { useSelector } from "react-redux";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

import Business from "../../redux/state/Business";
import Star from "../../svg/Star";
import StarHalf from "../../svg/StarHalf";
import StarBorder from "../../svg/StarBorder";
import DashLine from "../../components/DashLine";
import { getAreBusinessesOpen } from "../../redux/selectors";

interface Props {
	currentBusiness: Business;
}

const BusinessInfo: FC<Props> = props => {
	const {
		currentBusiness: { name, rating, ratingNum, hours, id }
	} = props;
	const isOpen = useSelector(getAreBusinessesOpen)[id];


	return (
		<View style={styles.root}>
			<Text style={styles.businessName}>{name}</Text>
			<View style={styles.ratingContainer}>
				{Stars(rating)}
				<Text style={styles.ratingText}>{rating}</Text>
				<Text style={styles.ratingNumText}> ({ratingNum})</Text>
			</View>
			<Text style={styles.descriptionText}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</Text>
			<DashLine />
			<View style={styles.statusContainer}>
				<Text style={styles.statusText}>{hours[0].toString()}</Text>
				<Text style={styles.statusText}>Currently {isOpen ? "open" : "close"}</Text>
			</View>
		</View>
	);
};

const Stars = (rating: number) => {
	let stars: JSX.Element[] = [];
	for (let n = 0; n < 5; n++) {
		if (rating >= 1) {
			stars.push(<Star key={n} fill="#404040" />);
		} else if (rating <= 0) {
			stars.push(<StarBorder key={n} fill="#404040" />);
		} else {
			stars.push(<StarHalf key={n} fill="#404040" />);
		}
		rating -= 1;
	}
	return stars;
};

const styles = StyleSheet.create({
	root: {
		width: "100%",
		padding: 16
	},
	businessName: {
		fontSize: 40,
		fontWeight: "bold"
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 16
	},
	ratingText: {
		marginLeft: 24,
		fontSize: 16,
		opacity: 0.75,
		fontStyle: "italic",
		fontWeight: "500"
	},
	ratingNumText: {
		fontSize: 16,
		opacity: 0.5,
		fontStyle: "italic"
	},
	descriptionText: {
		fontSize: 16,
		fontWeight: "500",
		opacity: 0.75,
		marginBottom: 16
	},
	statusContainer: {
		marginTop: 16,
		flexDirection: "row"
	},
	statusText: {
		width: "50%",
		fontSize: 16,
		opacity: 0.5
	}
});

export default BusinessInfo;
