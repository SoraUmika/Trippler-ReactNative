/**
 * Input component. Prop extends TextInputProps.
 *
 * @param {number|string} width The width of the input.
 * @param {boolean} [error] Is true, the underline will be red.
 */
import React, { FC, memo, ReactNode } from "react";
import { StyleSheet, TextInput, View, TextInputProps, StyleProp, ViewStyle } from "react-native";

interface Props extends TextInputProps {
	width?: number | string;
	error?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	leftComponent?: ReactNode;
	rightComponent?: ReactNode;
}

const Input: FC<Props> = props => {
	const {
		width,
		error,
		containerStyle,
		leftComponent = null,
		rightComponent = null,
		style,
		...inputProps
	} = props;

	return (
		<View
			style={[
				styles.container,
				containerStyle,
				{ width: width },
				error ? { backgroundColor: "#fff0f0" } : {}
			]}
		>
			{leftComponent}
			<TextInput style={[styles.input, style]} {...inputProps} />
			{rightComponent}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 60,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		paddingHorizontal: 16
	},
	input: {
		flex: 1
	}
});

function areEqual(prevProps: Props, nextProps: Props) {
	return prevProps.error === nextProps.error && prevProps.value === nextProps.value;
}

export default memo(Input, areEqual);
