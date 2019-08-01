import React, { FC, memo } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useSelector } from "react-redux";

import { getIsFontLoaded } from "../redux/selectors";

interface Props {
	isCollection?: boolean;
	navigate?: any;
}

const LogoSwitch: FC<Props> = props => {
	const isFontLoaded = useSelector(getIsFontLoaded);
	const margin = new Animated.Value(8);
	const otherMargin = new Animated.Value(0);
	const {
		navigate,
		isCollection
	} = props;

	if (!isFontLoaded) return null;

	return (
		<View
			style={styles.root}
			onTouchEnd={() => {
				Animated.parallel([
					Animated.timing(margin, {
						toValue: 0,
						duration: 200,
						easing: Easing.back(5)
					}),
					Animated.timing(otherMargin, {
						toValue: 8,
						duration: 200,
						easing: Easing.back(5)
					})
				]).start(() => {
					navigate(isCollection ? "Business" : "Collection");
					margin.setValue(8);
					otherMargin.setValue(0);
				});
			}}
		>
			<Animated.Text
				style={[styles.text, { marginBottom: isCollection ? otherMargin : margin }]}
			>
				Trip
			</Animated.Text>
			<Animated.Text
				style={[styles.text, { marginBottom: isCollection ? margin : otherMargin }]}
			>
				plar
			</Animated.Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontFamily: "FredokaOne",
		fontSize: 24
	}
});

export default memo(LogoSwitch, () => true);
