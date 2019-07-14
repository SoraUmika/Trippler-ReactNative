/**
 * Input component. Prop extends TextInputProps.
 *
 * @param {number|string} width The width of the input.
 */
import React, { FC, useState, memo } from "react";
import {
	StyleSheet,
	TextInput,
	View,
	NativeSyntheticEvent,
	TextInputChangeEventData
} from "react-native";
import { useSelector } from "react-redux";

import State from "../redux/state";

interface Props {
	width: number | string;
	placeholder: string;
	onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const Input: FC<Props> = props => {
	console.log("input");
	const { width, placeholder, onChange } = props;
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
				placeholder={placeholder}
				onChange={onChange}
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
