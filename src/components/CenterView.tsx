/**
 * A spoilplate component.
 * If both `main` and `cross` are false, 
 * the children will be centered on both axis.
 * Else, the children will only be centered on the axis if specified.
 * 
 * @param {boolean} [main] Center children on main axis.
 * @param {boolean} [cross] Center children on cross axis.
 */
import React, { FC } from "react";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
	main?: boolean;
	cross?: boolean;
}

const CenterView: FC<Props> = props => {
    const { main, cross } = props;
	return (
		<View
			style={[
				props.style,
				{
					flex: 1,
					justifyContent: main || cross === main ? "center" : "flex-start",
					alignItems: cross || cross === main ? "center" : "stretch"
				}
			]}
		>
			{props.children}
		</View>
	);
};

export default CenterView;
