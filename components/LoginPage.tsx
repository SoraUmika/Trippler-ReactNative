import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

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
					textProps={{ style: { color: "white" } }}
				/>
			</View>
			<View style={styles.bottom} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	}
});

export default LoginPage;
