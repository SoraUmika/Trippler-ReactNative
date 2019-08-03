/**
 * Animation manager for the business screen.
 */
import React, { FC, memo } from "react";
import { Animated } from "react-native";
import { PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";

import dimension from "../../dimension";
import Screen, { DisplayState } from "./Screen";

/**
 * This component if for managing animation.
 * The actual presentational component is down below.
 */
const AnimationManager: FC = () => {
	const translateY = new Animated.Value(0);
	// Each value is correspond to a `DisplayState`.
	// `DisplayState` acts as an index key, `translateYRange[DisplayState.galleryFull]` -> 99.
	// The value at index of `DisplayState.infoNormal`(1) is 0,
	// because its value can't be known beforehand.
	// Its value is determind by the `onLayout` callback below.
	let translateYRange = [dimension.height(-1) + 207, 0, 0, 119];
	let currentDisplayState: DisplayState = DisplayState.infoNormal;
	let setCurrentDisplayState: Function = () => null;
	let isInAnimation = false;
	// This variable describe how to move to the next `DisplayState`.
	// The new `DisplayState` is calculated by adding this variable to the old one.
	let direction: -1 | 0 | 1 = 0;

	translateY.addListener(({ value }) => {
		// Get the relative value by remove the offset.
		const val = value - translateYRange[currentDisplayState];
		if (!isInAnimation) {
			// Determind what is the next `DisplayState`.
			direction = 0;
			switch (currentDisplayState) {
				case DisplayState.galleryNormal:
					if (val <= -50) {
						direction = -1;
					} else if (val >= 70) {
						direction = 1;
					}
					break;
				case DisplayState.infoNormal:
					if (val >= 80) {
						direction = 1;
					} else if (val <= -100) {
						direction = -1;
					}
					break;
				case DisplayState.infoFull:
					if (val >= 100) {
						direction = 1;
					}
					break;
			}
		}
	});

	const onPanEvent = Animated.event([
		{
			nativeEvent: {
				translationY: translateY
			}
		}
	]);

	const onPanStateChange = (event: PanGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState == State.ACTIVE) {
			update();
		}
	};

	const update = () => {
		let toValue;
		// Calculate the `toValue` paramter.
		if (direction == 0) {
			// If the `DisplayState` didn't change, move to the origin.
			toValue = 0;
		} else {
			// Get the difference between the y translations of current and next `DisplayState`.
			toValue =
				translateYRange[currentDisplayState + direction] -
				translateYRange[currentDisplayState];
		}
		isInAnimation = true;
		setCurrentDisplayState(currentDisplayState + direction);
		const noBounce =
			(currentDisplayState == DisplayState.infoFull && !direction) ||
			(currentDisplayState == DisplayState.galleryNormal && direction == 1);
		Animated.spring(translateY, {
			toValue: toValue,
			speed: 20,
			bounciness: noBounce ? 0 : undefined
		}).start(() => {
			currentDisplayState += direction;
			translateY.extractOffset();
			translateY.setOffset(translateYRange[currentDisplayState]);
			direction = 0;
			isInAnimation = false;
		});
	};

	const onGalleryClick = () => {
		if (!isInAnimation) {
			direction = currentDisplayState < DisplayState.galleryFull ? 1 : -1;
			update();
		}
	};

	const provideDisplayStateSetter = (setter: Function) => (setCurrentDisplayState = setter);

	return (
		<Screen
			translateY={translateY}
			onLayout={e => {
				const height = e.nativeEvent.layout.height;
				if (height) {
					const yTranslate = -height + 20;
					if (currentDisplayState == DisplayState.infoNormal) {
						isInAnimation = true;
						Animated.spring(translateY, {
							toValue: yTranslate - translateYRange[DisplayState.infoNormal],
							speed: 20
						}).start(() => {
							translateY.setOffset(translateYRange[currentDisplayState]);
							translateY.setValue(0);
							isInAnimation = false;
						});
					}
					translateYRange[DisplayState.infoNormal] = yTranslate;
				}
			}}
			onPanEvent={onPanEvent}
			onPanStateChange={onPanStateChange}
			translateYRange={translateYRange}
			onGalleryClick={onGalleryClick}
			provideDisplayStateSetter={provideDisplayStateSetter}
		/>
	);
};

export default memo(AnimationManager, () => true);
