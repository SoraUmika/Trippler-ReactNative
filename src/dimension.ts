/**
 * This is a shorthand for react native's Diemnsions API.
 */
import { Dimensions } from "react-native";

/**
 * Wrapped Diemnsions API.
 * 
 * It stores and provides getters for window width and height.
 * The values are updated when window change.
 * 
 * @see react-native.Diemnsions
 */
class DimensionGetter {
	private windowWidth: number = Dimensions.get("window").width;
	private windowHeight: number = Dimensions.get("window").height;

	constructor() {
		Dimensions.addEventListener("change", () => {
			this.windowWidth = Dimensions.get("window").width;
			this.windowHeight = Dimensions.get("window").height;
		});
	}

    /**
     * Get the width of the window with optional multiplier.
     * 
     * Return the window width defined in react native's Diemnsions API
     * with a numer (multiplier) multiplied to it, which default to 1.
     * 
     * @example width(0.25)
     * 
     * @param [multiplier=1] The number that multiplied to the width.
     * @return The width of window multiplied by the multiplier. 
     */
	width(multiplier: number = 1) {
		return this.windowWidth * multiplier;
	}

    /**
     * Get the height of the window with optional multiplier.
     * 
     * Return the window height defined in react native's Diemnsions API
     * with a numer (multiplier) multiplied to it, which default to 1.
     * 
     * @example height(0.25)
     * 
     * @param [multiplier=1] The number that multiplied to the height.
     * @return The height of window multiplied by the multiplier. 
     */
	height(multiplier: number = 1) {
		return this.windowHeight * multiplier;
	}
}

export default new DimensionGetter();
