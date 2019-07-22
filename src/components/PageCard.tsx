/**
 * Container for pages in main screen.
 *
 * @param {number} topPercent The y coordinate of the card in term of percentage of window height.
 * @param {string} backgroundCard The backgroundColor of the page card.
 * @param {number} topMargin The top margin of page card when expanded.
 * @param {number} bottomPadding The bottom padding of page card when collapsed.
 * @param {StyleProp<ViewStyle>} [rootStyle] The style applied to the root View.
 * @param {StyleProp<ViewStyle>} [containerStyle] The style applied to the children container View.
 */
import React, { Component } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle, View, Text } from "react-native";
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
	triggerMargin: TriggerMargin;
}

interface TriggerMargin {
	unCollapse: number;
	expand: number;
	collapse: number;
	unExpand: number;
}

export default class PageCard extends Component<Props> {
	translateYPan = new Animated.Value(0);
	// translateYCard = new Animated.Value(0);
	yCoord = dimension.height(this.props.topPercent);
	originY = this.yCoord;
	translateYRange = [
		-this.yCoord + this.props.topMargin,
		0,
		dimension.height(1 - this.props.topPercent) - this.props.bottomPadding
	];
	currentIndex = 1;
	toValue = 0;
	triggered = false;

	constructor(props: Props) {
		super(props);
		const { triggerMargin } = props;
		this.translateYPan.addListener(({ value }) => {
			const val = value - this.translateYRange[this.currentIndex];
			if (!this.triggered) {
				let direction = 0;
				switch (this.currentIndex) {
					case 0:
						if (val >= triggerMargin.unExpand) {
							direction = 1;
						}
						break;
					case 1:
						if (val <= -triggerMargin.expand) {
							direction = -1;
						} else if (val >= triggerMargin.collapse) {
							direction = 1;
						}
						break;
					case 2:
						if (val <= -triggerMargin.unCollapse) {
							direction = -1;
						}
						break;
				}
				this.toValue =
					this.translateYRange[this.currentIndex + direction] -
					this.translateYRange[this.currentIndex];
				this.currentIndex += direction;
				this.triggered = direction != 0;
			}
		});
	}

	onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: this.translateYPan
			}
		}
	]);

	onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			Animated.timing(this.translateYPan, {
				toValue: this.toValue
			}).start(() => {
				this.translateYPan.setOffset(this.translateYRange[this.currentIndex]);
				this.triggered = false;
			});
		}
	};

	render() {
		const { children, rootStyle, containerStyle, backgroundColor } = this.props;
		return (
			<Animated.View
				style={{
					...(rootStyle as object),
					...styles.root,
					top: this.yCoord,
					backgroundColor: backgroundColor,
					transform: [
						{
							translateY: this.translateYPan.interpolate({
								inputRange: this.translateYRange,
								outputRange: this.translateYRange,
								extrapolate: "clamp"
							})
						}
					]
				}}
			>
				<PanGestureHandler
					onGestureEvent={this.onPanEvent}
					onHandlerStateChange={this.onPanStateChange}
				>
					<View style={styles.handleBarContainer}>
						<View style={styles.handleBar} />
					</View>
				</PanGestureHandler>

				<View style={[containerStyle, styles.childrenContainer]}>{children}</View>
			</Animated.View>
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
