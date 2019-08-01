/**
 * Same as KeyboardAvidingView, but flexbox friendly :3
 * It is defaulted to flex display.
 * 
 * @param {StyleProp<ViewStyle>} style The style applied to the view.
 */
import React, { Component } from "react";
import {
	Animated,
	Dimensions,
	Keyboard,
	StyleSheet,
	UIManager,
	EmitterSubscription,
	KeyboardEvent,
	TextInput,
	StyleProp,
	ViewStyle
} from "react-native";

const { State: TextInputState } = TextInput;

interface Props {
	style?: StyleProp<ViewStyle>;
}

interface State {
	shift: Animated.Value;
}

export default class KeyboardAvoidView extends Component<Props, State> {
	state: State = {
		shift: new Animated.Value(0)
	};

	kbShowListener: EmitterSubscription;
	kbHideListener: EmitterSubscription;

	componentWillMount() {
		this.kbShowListener = Keyboard.addListener("keyboardDidShow", this.onKbShow);
		this.kbHideListener = Keyboard.addListener("keyboardDidHide", this.onKbHide);
	}

	componentWillUnmount() {
		this.kbShowListener.remove();
		this.kbHideListener.remove();
	}

	onKbShow = (event: KeyboardEvent) => {
		const { height: windowHeight } = Dimensions.get("window");
		const keyboardHeight = event.endCoordinates.height;
		const currentFocusField = TextInputState.currentlyFocusedField();
		UIManager.measure(currentFocusField, (originX, originY, width, height, pageX, pageY) => {
			const fieldHeight = height;
            const fieldTop = pageY;
            // windowHeight - keyboardHeight = the height of display minus the keyboard.
            // fieldTop + fieldHeight = The y value of the bottom of field.
            // The difference of those two values is the gap between focused field and keyboard.
			const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
			if (gap >= 0) {  // If the field is not being overlapped by keyboard.
				return;
			}
			Animated.timing(this.state.shift, {
				toValue: gap,
				duration: 100,
				useNativeDriver: true
			}).start();
		});
	};

	onKbHide = () => {
		Animated.timing(this.state.shift, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start();
	};

	render() {
		const { style } = this.props;
		const { shift } = this.state;
		return (
			<Animated.View
				style={{
					...styles.container,
					...(style as object),
					transform: [{ translateY: shift }]
				}}
				onTouchStart={() => Keyboard.dismiss()}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		left: 0,
		position: "absolute",
		top: 0,
		width: "100%"
	}
});
