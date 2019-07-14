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
 * @param {StyleProp<TextStyle>} [textStyle] The style applied to the text in the button. 
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, TextStyle, StyleProp } from "react-native";

interface Props {
	text: string;
	color: string;
	width?: number | string;
	height: number;
	onPress?: Function;
	textStyle?: StyleProp<TextStyle>;
}

interface State {
	down: boolean;
}

export default class Button_ extends Component<Props, State> {
	state: State = {
		down: false
	};

	onTouchDown = () => {
		this.setState({ down: true });
		this.props.onPress && this.props.onPress();
	};

	onTouchUp = () => {
		this.setState({ down: false });
	};

	render() {
		const { text, color, width, height, textStyle } = this.props;
		const { down } = this.state;
		return (
			<View
				style={{ width: width, height: height }}
				onTouchStart={this.onTouchDown}
				onTouchEnd={this.onTouchUp}
			>
				{/* The button itself */}
				<View
					style={{
						...styles.button,
						backgroundColor: color,
						height: height - 8,
						top: down ? 8 : 0
					}}
				>
					{/* The text container. */}
					<View style={styles.textContainer}>
						{/* The text */}
						<Text
							style={{
								...styles.text,
								...(textStyle ? textStyle : {}) as object
							}}
						>
							{text}
						</Text>
					</View>
				</View>
				{/* Shadow */}
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
