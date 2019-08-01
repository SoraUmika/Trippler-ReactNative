/**
 * Signup screen of Tripplar.
 *
 * TODO improve user friendiness.
 * TODO server comminication.
 */
import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import KeyboardAvoidView from "../components/KeyboardAvoidView";

const SignupScreen: FC<any> = props => {
	const [userName, setUserName] = useState({ value: "", error: false });
	const [password, setPassword] = useState({ value: "", error: false });
	const [rePassword, setRePassword] = useState("");
	const [email, setEmail] = useState({ value: "", error: false });

	const { navigate } = props.navigation;

	const rePasswordError = rePassword && password.value !== rePassword;

	return (
		<KeyboardAvoidView>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Join us ♥</Text>
			</View>
			<View style={styles.formContainer}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName({ value: e.nativeEvent.text, error: false })}
					textContentType="username"
					error={userName.error}
					containerStyle={styles.input}
				/>
				<Input
					width="80%"
					placeholder="Email"
					onChange={e => setEmail({ value: e.nativeEvent.text, error: false })}
					textContentType="emailAddress"
					error={email.error}
					containerStyle={styles.input}
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword({ value: e.nativeEvent.text, error: false })}
					textContentType="newPassword"
					secureTextEntry
					error={password.error}
					containerStyle={styles.input}
				/>
				<Input
					width="80%"
					placeholder="Re-enter password"
					onChange={e => setRePassword(e.nativeEvent.text)}
					textContentType="password"
					secureTextEntry
					error={rePasswordError as boolean}
					containerStyle={styles.input}
				/>
				<Button
					width="80%"
					height={60}
					color="black"
					style={styles.confirmButton}
					onPress={() => {
						setUserName({ value: userName.value, error: !userName.value.trim() });
						setEmail({ value: email.value, error: !email.value.trim() });
						setPassword({ value: password.value, error: !password.value.trim() });
						if (!(userName.error || email.error || password.error || rePasswordError)) {
							console.log(userName.value, email.value, password.value, rePassword);
						}
					}}
				>
					<Text style={{ color: "white", textAlign: "center" }}>Confirm</Text>
				</Button>
			</View>
			<Text onPress={() => navigate("Login")} style={styles.cancelText}>
				cancel
			</Text>
		</KeyboardAvoidView>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		flex: 3,
		justifyContent: "center",
		alignItems: "center",
		height: 400
	},
	input: {
		marginVertical: 16
	},
	confirmButton: {
		marginTop: 32
	},
	cancelText: {
		textAlign: "center",
		fontSize: 20,
		width: "100%",
		fontWeight: "bold",
		marginBottom: 32
	},
	titleContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 48,
		fontFamily: "FredokaOne"
	}
});

export default SignupScreen;
