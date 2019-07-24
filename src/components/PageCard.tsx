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

const PageCard: FC<Props> = props => {
	const translateYPan = new Animated.Value(0);
	const yCoord = dimension.height(props.topPercent);
	const translateYRange = [
		-yCoord + props.topMargin,
		0,
		dimension.height(1 - props.topPercent) - props.bottomPadding
	];
	let currentIndex = 1;
	let toValue = 0;
	let triggered = false;

	const { triggerMargin } = props;

	translateYPan.addListener(({ value }) => {
		const val = value - translateYRange[currentIndex];
		console.log(val);
		if (!triggered) {
			let direction = 0;
			switch (currentIndex) {
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

			toValue = translateYRange[currentIndex + direction] - translateYRange[currentIndex];
			currentIndex += direction;
			triggered = direction != 0;
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
			Animated.timing(translateYPan, {
				toValue: toValue
			}).start(() => {
				translateYPan.setOffset(translateYRange[currentIndex]);
				triggered = false;
			});
		}
	};

	const { children, rootStyle, containerStyle, backgroundColor } = props;
	return (
		<Animated.View
			style={{
				...(rootStyle as object),
				...styles.root,
				top: yCoord,
				backgroundColor: backgroundColor,
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

			<View style={[containerStyle, styles.childrenContainer]}>{children}</View>
		</Animated.View>
	);
};

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

export default PageCard;
