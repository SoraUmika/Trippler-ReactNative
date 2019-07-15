import React, { FC, useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, StatusBar } from "react-native";

import Button from "./Button";
import Input from "./Input";

const SignupScreen: FC<any> = props => {
	const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");

    const { navigate } = props.navigation;

	useEffect(() => {
		StatusBar.setBackgroundColor("#ffffff");
		StatusBar.setBarStyle("dark-content");
	});

	return (
		<ScrollView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Sign Up</Text>
			</View>
			<KeyboardAvoidingView style={styles.formContainer} enabled behavior="padding">
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
				/>
                <Button
					width="80%"
					height={50}
					text="Confirm"
					color="black"
                    textStyle={{ color: "white" }}
                    style={styles.confirmButton}
					onPress={() => console.log(`${userName}, ${email}, ${password}`)}
				/>
                <Button
					width="80%"
					height={50}
					text="Cancel"
					color="white"
                    textStyle={{ color: "black", fontWeight: "bold" }}
					onPress={() => navigate("Login")}
				/>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {},
	titleContainer: {
		flex: 1,
		height: 100,
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
    }
});

export default SignupScreen;
