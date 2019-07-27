/**
 * A dashed line, wrapper for Dash component from react-native-dash.
 */
import React, { Component } from "react";
import Dash from "react-native-dash"

export default class DashLine extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Dash
				style={{ width: "100%", height: 1 }}
				dashColor="#707070"
				dashLength={7}
				dashGap={7}
			/>
		);
	}
}
