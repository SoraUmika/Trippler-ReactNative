/**
 * Login page component.
 *
 * TODO improve user friendiness.
 * TODO server communication.
 */
import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import KeyboardAvoidView from "../components/KeyboardAvoidView";

const LoginScreen: FC<any> = props => {
	const { navigate } = props.navigation;

	const [userName, setUserName] = useState({ value: "", error: false });
	const [password, setPassword] = useState({ value: "", error: false });

	return (
		<KeyboardAvoidView style={styles.container}>
			<View style={styles.top} />
			<View style={styles.form}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName({ value: e.nativeEvent.text, error: false })}
					textContentType="username"
					autoCompleteType="username"
					error={userName.error}
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword({ value: e.nativeEvent.text, error: false })}
					textContentType="password"
					autoCompleteType="password"
					secureTextEntry
					error={password.error}
				/>
				<Button
					width="80%"
					height={60}
					color="black"
					onPress={() => navigate("Main", { transition: "none" })}
				>
					<Text style={{ color: "white", textAlign: "center" }}>Login</Text>
				</Button>
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
		flex: 4
	},
	form: {
		flex: 2,
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
