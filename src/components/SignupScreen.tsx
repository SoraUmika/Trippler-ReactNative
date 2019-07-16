import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "./Button";
import Input from "./Input";
import KeyboardAvoidView from "./KeyboardAvoidView";

const SignupScreen: FC<any> = props => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [email, setEmail] = useState("");

	const { navigate } = props.navigation;

	const passwordError = rePassword && password !== rePassword;
	const confirmEnable = userName && email && rePassword && password === rePassword;

	return (
		<KeyboardAvoidView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Sign Up</Text>
			</View>
			<View style={styles.formContainer}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName(e.nativeEvent.text)}
					textContentType="username"
				/>
				<Input
					width="80%"
					placeholder="Email"
					onChange={e => setEmail(e.nativeEvent.text)}
					textContentType="emailAddress"
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword(e.nativeEvent.text)}
					textContentType="newPassword"
					secureTextEntry
				/>
				<Input
					width="80%"
					placeholder="Re-enter password"
					onChange={e => setRePassword(e.nativeEvent.text)}
					textContentType="password"
					secureTextEntry
					error={passwordError}
				/>
				<Button
					width="80%"
					height={50}
					text="Confirm"
					color={confirmEnable ? "black" : "gray"}
					textStyle={{ color: "white" }}
					style={styles.confirmButton}
					onPress={() => console.log(`${userName}, ${email}, ${password}`)}
					disable={!confirmEnable}
				/>
			</View>
			<View style={styles.cancelContainer}>
				<Text onPress={() => navigate("Login")} style={styles.cancelText}>
					cancel
				</Text>
			</View>
		</KeyboardAvoidView>
	);
};

const styles = StyleSheet.create({
	container: {},
	titleContainer: {
		flex: 1,
		justifyContent: "center"
	},
	title: {
		fontSize: 32,
		textAlign: "center"
	},
	formContainer: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		height: 400
	},
	confirmButton: {
		marginTop: 20
	},
	cancelContainer: {
		flex: 0.5,
		flexDirection: "column-reverse"
	},
	cancelText: {
		textDecorationLine: "underline",
		textAlign: "right",
		right: "10%",
		bottom: "-20%",
		marginLeft: "auto",
		fontSize: 20
	}
});

export default SignupScreen;
