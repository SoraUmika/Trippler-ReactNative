import React, { Component } from "react";
import { StyleSheet, Text, View, TextProps } from "react-native";

interface Props {
	text: string;
	color: string;
	width?: number | string;
	height?: number;
	onPress?: Function;
	textProps?: TextProps;
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

	onTouchUp = () => this.setState({ down: false });

	render() {
		const { text, color, width, height, textProps } = this.props;
		const { down } = this.state;
		return (
			<View style={{ width: width, height: height }}>
				<View
					style={{
						...styles.button,
						backgroundColor: color,
						height: height - 8,
						top: down ? 8 : 0
					}}
					onTouchStart={this.onTouchDown}
					onTouchEnd={this.onTouchUp}
				>
					<View style={styles.textContainer}>
						<Text
							{...textProps}
							style={{ ...styles.text, ...textProps.style.valueOf() }}
						>
							{text}
						</Text>
					</View>
				</View>
				{!down && (
					<View
						style={{
							...styles.shadow,
							backgroundColor: color,
							opacity: 0.2
						}}
					/>
				)}
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
