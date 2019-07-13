import React, { Component } from "react";
import { StyleSheet, Text, View, BackAndroid } from "react-native";

interface Props {
	text: string;
	bgColor: string;
	shadowColor: string;
	width?: number;
	height?: number;
	onPress?: Function;
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
		const { text, bgColor, width, height, shadowColor } = this.props;
		const { down } = this.state;
		return (
			<View style={{ width: width, height: height }}>
				<View
					style={{
						...styles.button,
						backgroundColor: bgColor,
						height: height - 8,
						top: down ? 8 : 0
					}}
					onTouchStart={this.onTouchDown}
					onTouchEnd={this.onTouchUp}
				>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{text}</Text>
					</View>
				</View>
				{!down && (
					<View
						style={{
                            ...styles.shadow,
							backgroundColor: shadowColor
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
