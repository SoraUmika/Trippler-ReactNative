/**
 * Container for pages in main screen.
 *
 * @param {number} topPercent The y coordinate of the card in term of percentage of window height.
 * @param {string} backgroundCard The backgroundColor of the page card.
 * @param {number} topMargin The top margin of page card when expanded.
 * @param {number} bottomPadding The bottom padding of page card when collapsed.
 * @param {TriggerMargin} triggerMargin The margin in which expand/collapse is triggered. More below.
 * @param {StyleProp<ViewStyle>} [rootStyle] The style applied to the root View.
 * @param {StyleProp<ViewStyle>} [containerStyle] The style applied to the children container View.
 *
 * TriggerMargin object
 * ====================
 * @param {number} unExpand The expanded -> normal trigger margin.
 * @param {number} expand The normal -> expanded trigger margin.
 * @param {number} collapse The normal -> collapsed trigger margin.
 * @param {number} unCollapse The collapsed -> normal trigger margin.
 */
import React, { FC } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle, View } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

import dimension from "../../dimension";

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

const PageCard: FC<Props> = props => {
	const translateYPan = new Animated.Value(0);
	const translateYRange = [dimension.height(-0.4), 0, dimension.height(0.4)];
	let currentIndex = 1;
	let toValue = 0;
	let isInAnimation = false;
	let direction = 0;

	translateYPan.addListener(({ value }) => {
		const val = value - translateYRange[currentIndex];
		console.log(val);
		if (!isInAnimation) {
			direction = 0;
			switch (currentIndex) {
				case 0:
					if (val >= 150) {
						direction = 1;
					}
					break;
				case 1:
					if (val <= -150) {
						direction = -1;
					} else if (val >= 150) {
						direction = 1;
					}
					break;
				case 2:
					if (val <= -150) {
						direction = -1;
					}
					break;
			}

			if (direction == 0) {
				toValue = 0;
			} else {
				toValue = translateYRange[currentIndex + direction] - translateYRange[currentIndex];
			}
		}
	});

	const onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: translateYPan
			}
		}
	]);

	const onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			isInAnimation = true;
			Animated.timing(translateYPan, {
				toValue: toValue
			}).start(() => {
				currentIndex += direction;
				translateYPan.setOffset(translateYRange[currentIndex]);
				direction = 0;
				isInAnimation = false;
			});
		}
	};

	return (
		<Animated.View
			style={{
				...styles.root,
				transform: [
					{
						translateY: translateYPan.interpolate({
							inputRange: translateYRange,
							outputRange: translateYRange,
							extrapolate: "clamp"
						})
					}
				]
			}}
		>
			<PanGestureHandler onGestureEvent={onPanEvent} onHandlerStateChange={onPanStateChange}>
				<View style={styles.handleBarContainer}>
					<View style={styles.handleBar} />
				</View>
			</PanGestureHandler>

			<View style={styles.childrenContainer} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	root: {
		position: "absolute",
		width: "100%",
		height: "100%",
        left: 0,
        top: dimension.height(0.5),
		borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "white"
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

export default PageCard;
