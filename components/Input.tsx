import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import { useSelector } from "react-redux";

import State from "../redux/state";

interface Props extends TextInputProps {
	width: number | string;
}

const Input: FC<Props> = props => {
	const { placeholder, width } = props;
	const accentColor = useSelector((state: State) => state.theme.accentColor);
	const [focus, setFocus] = useState(false);
	return (
		<View
			style={{
				width: width
			}}
		>
			<TextInput
				placeholder={placeholder}
				onFocus={() => setFocus(true)}
				onEndEditing={() => setFocus(false)}
				style={{
					width: width
				}}
			/>
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
		height: 3
	}
});

export default Input;
