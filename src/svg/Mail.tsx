import React, {Component} from "react";
import Svg, {Path, SvgProps} from "react-native-svg";

export default class Mail extends Component<SvgProps> {
    
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
            <Svg width={24} height={24} viewBox="0 0 24 24" {...this.props}>
                <Path fill="none" d="M0 0h24v24H0V0z" />
                <Path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" />
            </Svg >
        )
    }

}

