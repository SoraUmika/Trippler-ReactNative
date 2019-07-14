import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "./Button";
import Input from "./Input";

interface Props {}

const LoginPage: FC<Props> = props => {
	return (
		<View style={styles.container}>
			<View style={styles.top} />
			<View style={styles.form}>
				<Input width="80%" placeholder="User name" />
				<Input width="80%" placeholder="Password" />
				<Button
					width="80%"
					height={50}
					text="Login"
					color="black"
					textStyle={{ color: "white" }}
				/>
			</View>
			<View style={styles.bottom}>
				<Text style={styles.signUpText} onPress={() => console.log("?")}>sign up</Text>
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
        flexDirection: "column-reverse",
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
