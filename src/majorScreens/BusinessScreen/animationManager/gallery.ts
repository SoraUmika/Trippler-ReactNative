import { Animated, Easing } from "react-native";
import { PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";

import dimension from "../../../dimension";

export default class GalleryAnimationManager {
	translateX = new Animated.Value(0);
	translateXRange = [dimension.width(-0.8), 0, dimension.width(0.8)];
	currentGalleryIndex = 0;
	galleryLength = 3;
	imageWidth = dimension.width() + 24;
	setGalleryIndex: Function = () => null;
	isInAnimation = false;
	direction: -1 | 0 | 1 = 0;

	constructor() {
		this.translateX.addListener(({ value }) => {
			if (!this.isInAnimation) {
				this.direction = 0;
				if (this.currentGalleryIndex && value >= 100) {
					this.direction = -1;
				} else if (this.currentGalleryIndex < this.galleryLength - 1 && value <= -100) {
					this.direction = 1;
				}
			}
		});
	}

	onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationX: this.translateX
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
            toValue: this.imageWidth * this.direction * -1,
            easing: Easing.quad
		}).start(() => {
			this.setGalleryIndex(this.currentGalleryIndex + this.direction);
			this.currentGalleryIndex += this.direction;
			this.direction = 0;
			this.translateX.setValue(0);
			this.isInAnimation = false;
		});
	};

	provideGalleryIndexSetter = (setter: Function) => (this.setGalleryIndex = setter);

	updateGalleryLength = (length: number) => (this.galleryLength = length);
}
