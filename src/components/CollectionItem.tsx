import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import ArrowUpward from "../svg/ArrowUpward";
import CenterView from "./CenterView"

interface Props {
    businessId: string
}

export default class CollectionItem extends Component<Props> {
	render() {
		return (
			<View style={styles.root}>
				<View style={styles.container}>
					<View style={styles.avatar} />
					<View style={styles.description}>
						<CenterView main>
							<Text style={styles.name}>Name</Text>
                            <ArrowUpward fill="white" style={styles.pinIcon} opacity={0.75}/>
						</CenterView>
						<View style={styles.statContainer}>
							<CenterView main>
                                <Text style={styles.status}>Status</Text>
                            </CenterView>
							<CenterView main>
                                <Text style={styles.rating}>Rating</Text>
                            </CenterView>
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
		backgroundColor: "gray",
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
    pinIcon: {
        position: "absolute",
        right: 0
    }
});
