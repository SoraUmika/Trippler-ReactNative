/**
 * Login page component.
 */
import React, { FC, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";

import Button from "./Button";
import Input from "./Input";
import KeyboardAvoidView from "./KeyboardAvoidView";

const LoginScreen: FC<any> = props => {
	const { navigate } = props.navigation;

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	return (
		<KeyboardAvoidView style={styles.container}>
			<View style={styles.top} />
			<View style={styles.form}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName(e.nativeEvent.text)}
					textContentType="username"
					autoCompleteType="username"
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword(e.nativeEvent.text)}
					textContentType="password"
					autoCompleteType="password"
					secureTextEntry
				/>
				<Button
					width="80%"
					height={50}
					text="Login"
					color="black"
					textStyle={{ color: "white" }}
					onPress={() => console.log(`user name = ${userName}, password = ${password}`)}
				/>
			</View>
			<View style={styles.bottom}>
				<Text style={styles.signUpText} onPress={() => navigate("Signup")}>
					sign up
				</Text>
			</View>
		</KeyboardAvoidView>
	);
};

const styles = StyleSheet.create({
	container: {},
	top: {
		flex: 2
	},
	form: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center"
	},
	bottom: {
		flex: 1,
		flexDirection: "column-reverse"
	},
	signUpText: {
		textDecorationLine: "underline",
		textAlign: "right",
		right: "10%",
		bottom: "-20%",
		marginLeft: "auto",
		fontSize: 20
	}
});

export default LoginScreen;
