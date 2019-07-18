import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import ArrowUpward from "../svg/ArrowUpward";

export default class CollectionItem extends Component {
	render() {
		return (
			<View style={styles.root}>
				<View style={styles.container}>
					<View style={styles.avatar} />
					<View style={styles.description}>
						<View style={styles.textContainer}>
							<Text style={styles.name}>Name</Text>
                            <ArrowUpward fill="white" style={styles.pinIcon} opacity={0.75}/>
						</View>
						<View style={styles.statContainer}>
							<View style={styles.textContainer}>
                                <Text style={styles.status}>Status</Text>
                            </View>
							<View style={styles.textContainer}>
                                <Text style={styles.rating}>Rating</Text>
                            </View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#0D0D0D",
		margin: 16,
		height: 80
	},
	container: {
		flex: 1,
		flexDirection: "row"
	},
	avatar: {
		backgroundColor: "red",
		width: 80,
		height: 80
	},
	description: {
        flex: 1,
        padding: 16
	},
	name: {
		// paddingLeft: 16,
		color: "white",
		opacity: 0.75,
		fontWeight: "bold",
        fontSize: 24,
        // backgroundColor: "green"
	},
	status: {
        // paddingLeft: 16,
        color: "white",
        opacity: 0.5,
        fontSize: 16,
        // backgroundColor: "blue"
    },
	rating: {
        color: "white",
        opacity: 0.5,
        textAlign: "right",
        // paddingRight: 16,
        fontSize: 16,
        // backgroundColor: "pink"
    },
	statContainer: {
		flex: 1,
        flexDirection: "row",
        marginTop: 16
    },
    textContainer: {
        flex: 1,
        justifyContent: "center"
    },
    pinIcon: {
        position: "absolute",
        right: 0
    }
});
