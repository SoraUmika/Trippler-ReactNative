import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

import State from "../redux/state";

interface Props {
	width: number | string;
	placeholder: string;
}

const Input: FC<Props> = props => {
	const { placeholder, width, ...inputProps } = props;
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
				style={styles.input}
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
        height: 3,
        top: -3
	},
	input: {
        width: "100%",
	}
});

export default Input;
