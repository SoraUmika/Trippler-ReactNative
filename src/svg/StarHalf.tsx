import React, { Component } from "react";
import Svg, { Path, SvgProps, Defs } from "react-native-svg";

export default class StarHalf extends Component<SvgProps> {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Svg width={24} height={24} viewBox="0 0 24 24" {...this.props}>
				<Defs>
					<Path id="a" d="M0 0h24v24H0V0z" />
				</Defs>
				<Path
					clip-path="url(#b)"
					d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
				/>
			</Svg>
		);
	}
}
