import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "./Button";
import Input from "./Input";
import KeyboardAvoidView from "./KeyboardAvoidView";

const SignupScreen: FC<any> = props => {
	const [userName, setUserName] = useState({ value: "", error: false });
	const [password, setPassword] = useState({ value: "", error: false });
	const [rePassword, setRePassword] = useState("");
	const [email, setEmail] = useState({ value: "", error: false });

	const { navigate } = props.navigation;

	const rePasswordError = rePassword && password.value !== rePassword;

	return (
		<KeyboardAvoidView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Sign Up</Text>
			</View>
			<View style={styles.formContainer}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName({ value: e.nativeEvent.text, error: false })}
					textContentType="username"
					error={userName.error}
				/>
				<Input
					width="80%"
					placeholder="Email"
					onChange={e => setEmail({ value: e.nativeEvent.text, error: false })}
					textContentType="emailAddress"
					error={email.error}
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword({ value: e.nativeEvent.text, error: false })}
					textContentType="newPassword"
					secureTextEntry
					error={password.error}
				/>
				<Input
					width="80%"
					placeholder="Re-enter password"
					onChange={e => setRePassword(e.nativeEvent.text)}
					textContentType="password"
					secureTextEntry
					error={rePasswordError}
				/>
				<Button
					width="80%"
					height={50}
					text="Confirm"
					color="black"
					textStyle={{ color: "white" }}
					style={styles.confirmButton}
					onPress={() => {
						setUserName({ value: userName.value, error: !userName.value.trim() });
						setEmail({ value: email.value, error: !email.value.trim() });
						setPassword({ value: password.value, error: !password.value.trim() });
						if (!(userName.error || email.error || password.error || rePasswordError)) {
							console.log(userName.value, email.value, password.value, rePassword);
						}
					}}
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
