/**
 * Login page component.
 */
import React, { FC, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";

import Button from "./Button";
import Input from "./Input";

interface Props {}

const LoginPage: FC<Props> = props => {
	console.log("login");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	return (
		<View style={styles.container}>
			{/* Logo */}
			<View style={styles.top} />
			{/* Login form */}
			<KeyboardAvoidingView style={styles.form} enabled behavior="padding">
				{/* User name input */}
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName(e.nativeEvent.text)}
				/>
				{/* Password input */}
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword(e.nativeEvent.text)}
				/>
				{/* Login button */}
				<Button
					width="80%"
					height={50}
					text="Login"
					color="black"
					textStyle={{ color: "white" }}
					onPress={() => console.log(`user name = ${userName}, password = ${password}`)}
				/>
			</KeyboardAvoidingView>
			{/* Sign up button */}
			<View style={styles.bottom}>
				<Text style={styles.signUpText}>sign up</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
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

export default LoginPage;
