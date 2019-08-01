/**
 * Login page component.
 *
 * TODO improve user friendiness.
 * TODO server communication.
 */
import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/Button";
import Input from "../components/Input";
import KeyboardAvoidView from "../components/KeyboardAvoidView";
import { getIsFontLoaded } from "../redux/selectors";

const LoginScreen: FC<any> = props => {
	const { navigate } = props.navigation;

	const [userName, setUserName] = useState({ value: "", error: false });
	const [password, setPassword] = useState({ value: "", error: false });
	const isFontLoaded = useSelector(getIsFontLoaded);

	return (
		<KeyboardAvoidView>
			<View style={styles.logoContainer}>
				{isFontLoaded && <Text style={styles.logo}>Tripplar</Text>}
			</View>
			<View style={styles.form}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName({ value: e.nativeEvent.text, error: false })}
					textContentType="username"
					autoCompleteType="username"
					error={userName.error}
					containerStyle={styles.input}
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword({ value: e.nativeEvent.text, error: false })}
					textContentType="password"
					autoCompleteType="password"
					secureTextEntry
					error={password.error}
					containerStyle={styles.input}
				/>
				<Button
					width="80%"
					height={60}
					color="black"
					onPress={() => navigate("Main", { transition: "none" })}
					style={styles.button}
				>
					<Text style={{ color: "white", textAlign: "center" }}>Login</Text>
				</Button>
			</View>
			<Text style={styles.signUpText} onPress={() => navigate("Signup")}>
				sign up
			</Text>
		</KeyboardAvoidView>
	);
};

const styles = StyleSheet.create({
	form: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	signUpText: {
		textAlign: "center",
		fontSize: 20,
		width: "100%",
		fontWeight: "bold",
		marginBottom: 32
	},
	input: {
		marginVertical: 16
	},
	button: {
		marginTop: 32
	},
	logoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	logo: {
		fontSize: 48,
		fontFamily: "FredokaOne"
	}
});

export default LoginScreen;
