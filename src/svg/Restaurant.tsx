import React, {Component} from "react";
import Svg, {Path, SvgProps} from "react-native-svg";

export default class Restaurant extends Component<SvgProps> {
    
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
            <Svg width={24} height={24} viewBox="0 0 24 24" {...this.props}>
                <Path fill="none" d="M0 0h24v24H0V0z" />
                <Path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z" />
            </Svg >
        )
    }

}

