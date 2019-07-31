import React, { FC } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import BusinessInfo from "./Info";
import { getCurrentRecomIndex, getRecomFeed, getBusinessData } from "../../redux/selectors";
import { useSelector } from "react-redux";

const BusinessImage: FC = props => {
	const currentRecomIndex = useSelector(getCurrentRecomIndex);
	const recomFeed = useSelector(getRecomFeed);
	const businessData = useSelector(getBusinessData);
	const currentBusiness = businessData[recomFeed[currentRecomIndex]];

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				style={styles.imageBackground}
				source={{
					uri: currentBusiness.gallery[0].url
				}}
			>
				<BusinessInfo currentBusiness={currentBusiness} />
				<View style={styles.topShadow} />
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		flexDirection: "column-reverse",
		flex: 1,
		justifyContent: "space-between"
	},
	topShadow: {
		height: 8,
		backgroundColor: "white",
		opacity: 0.5
	}
});

export default BusinessImage;
