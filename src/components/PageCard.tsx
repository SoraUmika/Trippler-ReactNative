import React, { Component } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

import dimension from "../dimension";

interface Props {
	topPercent: number;
	style?: StyleProp<ViewStyle>;
}

export default class PageCard extends Component<Props> {
	translateY = new Animated.Value(0);

	maxTranslateY = dimension.height(1 - this.props.topPercent);
	minTranslateY = dimension.height(-this.props.topPercent);

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
		const { children, style } = this.props;
		return (
			<PanGestureHandler
				onGestureEvent={this.onPanEvent}
				onHandlerStateChange={this.onPanStateChange}
			>
				<Animated.View
					style={{
						...(style as object),
						...styles.root,
						top: -this.minTranslateY,
						transform: [{ translateY: this.translateY.interpolate({
                            inputRange: [this.minTranslateY, 0, this.maxTranslateY],
                            outputRange: [this.minTranslateY, 0, this.maxTranslateY],
                            extrapolate: "clamp"
                        }) }]
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
        left: 0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
	}
});
