/**
 * Container for pages in main screen.
 *
 * @param {number} topPercent The y coordinate of the card in term of percentage of window height.
 * @param {string} backgroundCard The backgroundColor of the page card.
 * @param {StyleProp<ViewStyle>} rootStyle The style applied to the root View.
 * @param {StyleProp<ViewStyle>} containerStyle The style applied to the children container View.
 */
import React, { Component } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle, View } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

import dimension from "../dimension";

interface Props {
	topPercent: number;
	containerStyle?: StyleProp<ViewStyle>;
	rootStyle?: StyleProp<ViewStyle>;
	backgroundColor: string;
	topMargin: number;
	bottomPadding: number;
}

export default class PageCard extends Component<Props> {
	translateY = new Animated.Value(0);
	yCoord = dimension.height(this.props.topPercent);
	maxTranslateY = dimension.height(1 - this.props.topPercent) - this.props.bottomPadding;
	minTranslateY = -this.yCoord + this.props.topMargin;

	onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: this.translateY
			}
		}
	]);

	onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			Animated.timing(this.translateY, {
				toValue: 0,
				duration: 500
			}).start();
		}
	};

	render() {
		const { children, rootStyle, containerStyle, backgroundColor } = this.props;
		return (
			<PanGestureHandler
				onGestureEvent={this.onPanEvent}
				onHandlerStateChange={this.onPanStateChange}
			>
				<Animated.View
					style={{
						...(rootStyle as object),
						...styles.root,
						top: this.yCoord,
						backgroundColor: backgroundColor,
						transform: [
							{
								translateY: this.translateY.interpolate({
									inputRange: [this.minTranslateY, 0, this.maxTranslateY],
									outputRange: [this.minTranslateY, 0, this.maxTranslateY],
									extrapolate: "clamp"
								})
							}
						]
					}}
				>
					<View style={styles.handleBarContainer}>
						<View style={styles.handleBar} />
					</View>
					<View style={[containerStyle, styles.childrenContainer]}>{children}</View>
				</Animated.View>
			</PanGestureHandler>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: 0,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24
	},
	handleBarContainer: {
		width: "100%",
		height: 24,
		justifyContent: "center",
		alignItems: "center"
	},
	handleBar: {
		width: "33%",
		height: "35%",
		backgroundColor: "black",
		opacity: 0.1,
		borderRadius: 4
	},
	childrenContainer: {
		flex: 1
	}
});
