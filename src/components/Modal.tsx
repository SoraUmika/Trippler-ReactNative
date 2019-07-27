import React, { Component } from "react";
import {
	Modal as BuiltInModal,
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
	ModalProps
} from "react-native";

interface Props extends Omit<ModalProps, "transparent"> {
	onHide: () => void;
	style?: StyleProp<ViewStyle>;
	shadowStyle?: StyleProp<ViewStyle>;
}

export default class Modal extends Component<Props> {
	render() {
		const { onHide, style, children, shadowStyle, ...restProps } = this.props;

		return (
			<BuiltInModal {...restProps} transparent={true}>
				<View style={[styles.background, shadowStyle]} onTouchStart={onHide}>
					<View style={style} onTouchStart={evt => evt.stopPropagation()}>
						{children}
					</View>
				</View>
			</BuiltInModal>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.1)",
		zIndex: 1
	}
});
