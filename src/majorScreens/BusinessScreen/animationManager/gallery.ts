import { Animated } from "react-native";
import { PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";

import dimension from "../../../dimension";

const galleryTransXOffset = -dimension.width() - 24;

export default class GalleryAnimationManager {
	translateX = new Animated.Value(0);
	translateXRange = [dimension.width(-0.8), dimension.width(0.8)];
	isInAnimation = false;

	constructor() {
		this.translateX.setOffset(galleryTransXOffset);
		this.translateX.addListener(({ value }) => {});
	}

	onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: this.translateX
			}
		}
	]);

	onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			this.update();
		}
	};

	update = () => {
		this.isInAnimation = true;
		Animated.timing(this.translateX, {
			toValue: 0
		}).start(() => {
			this.isInAnimation = false;
		});
	};
}
