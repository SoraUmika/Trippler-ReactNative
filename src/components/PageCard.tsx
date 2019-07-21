import React, { Component } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

interface Props {
	y: number | string;
	style?: StyleProp<ViewStyle>;
}

export default class PageCard extends Component<Props> {
	translateY = new Animated.Value(0);

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
				duration: 1000
			}).start();
		}
	};

	render() {
		const { children, y, style } = this.props;
		return (
			<PanGestureHandler
				onGestureEvent={this.onPanEvent}
				onHandlerStateChange={this.onPanStateChange}
			>
				<Animated.View
					style={{
                        ...style as object,
						...styles.root,
						top: y,
						transform: [{ translateY: this.translateY }]
					}}
				>
					{children}
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
		left: 0
	}
});
