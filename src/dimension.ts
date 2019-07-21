import { Dimensions } from "react-native";

class DimensionGetter {
    private windowWidth: number = Dimensions.get("window").width;
    private windowHeight: number = Dimensions.get("window").height;

    width(multiplier: number = 1){
        return this.windowWidth * multiplier; 
    }

    height(multiplier: number = 1){
        return this.windowHeight * multiplier;
    }
}

export default new DimensionGetter();
