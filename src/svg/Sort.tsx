import React, {Component} from "react";
import Svg, {Path, SvgProps} from "react-native-svg";

export default class Sort extends Component<SvgProps> {
    
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
            <Svg width={24} height={24} viewBox="0 0 24 24" {...this.props}>
                <Path fill="none" d="M0 0h24v24H0V0z" />
                <Path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
            </Svg >
        )
    }

}

