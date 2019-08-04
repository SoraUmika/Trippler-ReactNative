import { Animated, Easing } from "react-native";
import { PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";

import dimension from "../../../dimension";
import { nextGalleryIndex } from "../../../redux/action/actions";
import store from "../../../redux/store";

export default class GalleryAnimationManager {
	translateX = new Animated.Value(0);
	translateXRange = [dimension.width(-0.8), dimension.width(0.8)];
	currentGalleryIndex = 0;
	imageWidth = dimension.width() + 24;
	isInAnimation = false;
	// direction: -1 | 0 | 1 = 0;

	constructor() {
		// this.translateX.addListener(({ value }) => {
		// 	if (!this.isInAnimation) {
		// 		this.direction = 0;
		// 		if (value >= 100) {
		// 			this.direction = -1;
		// 		} else if (value <= -100) {
		// 			this.direction = 1;
		// 		}
		// 	}
		// });
	}

	// onPanEvent = Animated.event([
	// 	{
	// 		nativeEvent: {
	// 			translationX: this.translateX
	// 		}
	// 	}
	// ]);

	// onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
	// 	if (event.nativeEvent.oldState == State.ACTIVE) {
	// 		this.update();
	// 	}
	// };

	update = (direction: 1 | -1) => {
		this.isInAnimation = true;
		Animated.timing(this.translateX, {
			toValue: this.imageWidth * direction * -1,
			easing: Easing.quad
		}).start(() => {
			this.translateX.setValue(0);
			this.isInAnimation = false;
			store.dispatch(nextGalleryIndex(direction == 1 ? "forward" : "backward"));
		});
	};

	updateGalleryIndex = (index: number) => {
		this.currentGalleryIndex = index;
	};

	move = (direction: 1 | -1) => this.update(direction);
}
