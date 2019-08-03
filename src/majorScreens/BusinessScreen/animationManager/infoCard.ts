import { Animated, LayoutChangeEvent } from "react-native";
import { PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";

import dimension from "../../../dimension";
import { DisplayState } from "../Screen";

export default class InfoCardAnimationManager {
	translateY = new Animated.Value(0);
	// Each value is correspond to a `DisplayState`.
	// `DisplayState` acts as an index key, `translateYRange[DisplayState.galleryFull]` -> 99.
	// The value at index of `DisplayState.infoNormal`(1) is 0,
	// because its value can't be known beforehand.
	// Its value is determind by the `onLayout` callback below.
	translateYRange = [dimension.height(-1) + 207, 0, 0, 119];
	currentDisplayState: DisplayState = DisplayState.infoNormal;
	setCurrentDisplayState: Function = () => null;
	isInAnimation = false;
	// This variable describe how to move to the next `DisplayState`.
	// The new `DisplayState` is calculated by adding this variable to the old one.
	direction: -1 | 0 | 1 = 0;

	constructor() {
		this.translateY.addListener(({ value }) => {
			// Get the relative value by remove the offset.
			const val = value - this.translateYRange[this.currentDisplayState];
			if (!this.isInAnimation) {
				// Determind what is the next `DisplayState`.
				this.direction = 0;
				switch (this.currentDisplayState) {
					case DisplayState.galleryNormal:
						if (val <= -50) {
							this.direction = -1;
						} else if (val >= 70) {
							this.direction = 1;
						}
						break;
					case DisplayState.infoNormal:
						if (val >= 80) {
							this.direction = 1;
						} else if (val <= -100) {
							this.direction = -1;
						}
						break;
					case DisplayState.infoFull:
						if (val >= 100) {
							this.direction = 1;
						}
						break;
				}
			}
		});
	}

	onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: this.translateY
			}
		}
	]);

	onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			this.update();
		}
	};

	update = () => {
		let toValue;
		// Calculate the `toValue` paramter.
		if (this.direction == 0) {
			// If the `DisplayState` didn't change, move to the origin.
			toValue = 0;
		} else {
			// Get the difference between the y translations of current and next `DisplayState`.
			toValue =
				this.translateYRange[this.currentDisplayState + this.direction] -
				this.translateYRange[this.currentDisplayState];
		}
		this.isInAnimation = true;
		this.setCurrentDisplayState(this.currentDisplayState + this.direction);
		const noBounce =
			(this.currentDisplayState == DisplayState.infoFull && !this.direction) ||
			(this.currentDisplayState == DisplayState.galleryNormal && this.direction == 1);
		Animated.spring(this.translateY, {
			toValue: toValue,
			speed: 20,
			bounciness: noBounce ? 0 : undefined
		}).start(() => {
			this.currentDisplayState += this.direction;
			this.translateY.extractOffset();
			this.translateY.setOffset(this.translateYRange[this.currentDisplayState]);
			this.direction = 0;
			this.isInAnimation = false;
		});
	};

	onGalleryClick = () => {
        console.log('!');
		if (!this.isInAnimation) {
			this.direction = this.currentDisplayState < DisplayState.galleryFull ? 1 : -1;
			this.update();
		}
	};

	provideDisplayStateSetter = (setter: Function) => (this.setCurrentDisplayState = setter);

	onLayout = (e: LayoutChangeEvent) => {
		const height = e.nativeEvent.layout.height;
		if (height) {
			const yTranslate = -height + 20;
			if (this.currentDisplayState == DisplayState.infoNormal) {
				this.isInAnimation = true;
				Animated.spring(this.translateY, {
					toValue: yTranslate - this.translateYRange[DisplayState.infoNormal],
					speed: 20
				}).start(() => {
					this.translateY.setOffset(this.translateYRange[this.currentDisplayState]);
					this.translateY.setValue(0);
					this.isInAnimation = false;
				});
			}
			this.translateYRange[DisplayState.infoNormal] = yTranslate;
		}
	};
}
