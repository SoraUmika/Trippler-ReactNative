import React, { FC } from "react";
import { View, ViewProps } from "react-native";

const CenterView: FC<ViewProps> = props => {
	return (
		<View style={[props.style, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
			{props.children}
		</View>
	);
};

export default CenterView;
