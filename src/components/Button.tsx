/**
 * Button component.
 *
 * @precondition The height prop >= 8.
 *
 * @param {string} text The text displayed inside the button.
 * @param {string} color The color of the button.
 * @param {number|string} [width] The width of the button.
 * @param {number} height The height of the button.
 * @param {function} [onPress] The callback when pressed.
 * @param {StyleProp<ViewStyle>} [style] The style applied to the button.
 * @param {StyleProp<TextStyle>} [textStyle] The style applied to the text in the button.
 * @param {boolean} [disable] If true, the button won't respond to touch.
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, TextStyle, StyleProp, ViewStyle } from "react-native";

import { objectsEqual } from "../util";

interface Props {
	text: string;
	color: string;
	width?: number | string;
	height: number | string;
	onPress?: Function;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	disable?: boolean;
}

interface State {
	down: boolean;
}

export default class Button_ extends Component<Props, State> {
	state: State = {
		down: false
	};

	onTouchDown = () => {
		if (!this.props.disable) {
			this.setState({ down: true });
			this.props.onPress && this.props.onPress();
		}
	};

	onTouchUp = () => {
		if (!this.props.disable) {
			this.setState({ down: false });
		}
	};

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return nextState.down !== this.state.down || !objectsEqual(nextProps, this.props);
	}

	render() {
		const { text, color, width, height, textStyle, style } = this.props;
		const { down } = this.state;
		return (
			<View
				style={{ ...(style as object), width: width, height: height, flex: 0 }}
				onTouchStart={this.onTouchDown}
				onTouchEnd={this.onTouchUp}
			>
				<View
					style={{
						...styles.button,
						backgroundColor: color,
						flex: 1,
						top: down ? 8 : 0
					}}
				>
					<View style={styles.textContainer}>
						<Text
							style={{
								...styles.text,
								...((textStyle ? textStyle : {}) as object)
							}}
						>
							{text}
						</Text>
					</View>
				</View>
				<View
					style={{
						...styles.shadow,
						backgroundColor: color,
						opacity: 0.2
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		zIndex: 2
	},
	textContainer: {
		flex: 1,
		justifyContent: "center"
	},
	text: {
		textAlign: "center"
	},
	shadow: {
		height: 16,
		top: -8,
		zIndex: 1,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8
	}
});
