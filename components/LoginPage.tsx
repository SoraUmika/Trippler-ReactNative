import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "./Button";
import Input from "./Input";

interface Props {}

const LoginPage: FC<Props> = props => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.top} />
			<View style={styles.form}>
				<Input
					width="80%"
					placeholder="User name"
					onChange={e => setUserName(e.nativeEvent.text)}
				/>
				<Input
					width="80%"
					placeholder="Password"
					onChange={e => setPassword(e.nativeEvent.text)}
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
