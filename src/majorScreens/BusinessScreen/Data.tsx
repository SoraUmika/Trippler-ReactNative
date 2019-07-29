import React, { FC } from "react";
import { View, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import BusinessInfo from "./Info";
import { getCurrentRecomIndex, getRecomFeed, getBusinessData } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { toNextRecom } from "../../redux/action/actions";

const BusinessImage: FC = props => {
	const currentRecomIndex = useSelector(getCurrentRecomIndex);
	const recomFeed = useSelector(getRecomFeed);
	const businessData = useSelector(getBusinessData);
	const currentBusiness = businessData[recomFeed[currentRecomIndex]];

	const dispatch = useDispatch();

	return (
		<View
			style={{ flex: 1 }}
			// onTouchStart={() => dispatch({ type: "recommendation/NEXT_RECOMMENDATION" })}
		>
			<ImageBackground
				style={styles.imageBackground}
				imageStyle={styles.imageStyle}
				source={{
					uri: currentBusiness.gallery[0].url
				}}
			>
				<BusinessInfo currentBusiness={currentBusiness} />
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		flexDirection: "column-reverse",
		flex: 1
	},

	imageStyle: {
		// borderRadius: 20
	}
});

export default BusinessImage;
