/**
 * Input component. Prop extends TextInputProps.
 *
 * @param {number|string} width The width of the input.
 */
import React, { FC, useState, memo } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import { useSelector } from "react-redux";

import State from "../redux/state";

interface Props extends TextInputProps {
	width: number | string;
}

const Input: FC<Props> = props => {
	const { width, ...inputProps } = props;

	const accentColor = useSelector((state: State) => state.theme.accentColor);
	
	const [focus, setFocus] = useState(false);

	return (
		<View
			style={{
				width: width
			}}
		>
			{/* Input itself */}
			<TextInput
				{...inputProps}
				onFocus={() => setFocus(true)}
				onEndEditing={() => setFocus(false)}
				style={styles.input}
			/>
			{/* The underline */}
			<View
				style={{
					...styles.underline,
					backgroundColor: focus ? accentColor : "#808080"
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	underline: {
		height: 3,
		top: -3,
		borderRadius: 1.5
	},
	input: {
		width: "100%"
	}
});

function areEqual(prevProps: Props, nextProps: Props) {
	return true;
}

export default memo(Input, areEqual);
