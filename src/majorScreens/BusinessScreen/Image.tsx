import React, { FC } from "react";
import { View, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import BusinessInfo from "./Info";
import { getCurrentRecomIndex, getRecomFeed, getBusinessData } from "../../redux/selectors";
import { useSelector, useDispatch} from 'react-redux'
import { toNextRecom } from "../../redux/action/actions";

const BusinessImage: FC = props => {
  const currentRecomIndex = useSelector(getCurrentRecomIndex)
  const recomFeed = useSelector(getRecomFeed)
  const businessData = useSelector(getBusinessData)
  const currentBusiness  = businessData[recomFeed[currentRecomIndex]]
  
  const dispatch = useDispatch()

  return (
	<View style={{ flex: 1 }}>
		<TouchableHighlight style={{flex: 1}} onPress={()=>dispatch({type: "recommendation/NEXT_RECOMMENDATION"})}>
		<ImageBackground
		  style={styles.imageBackground}
		  imageStyle={styles.imageStyle}
	      source={{
		  uri: currentBusiness.gallery[0].url}}
		  >
	  	  <View style={styles.InformationContainer}>
	        <BusinessInfo currentBusiness={currentBusiness}/>
	      </View>
	    </ImageBackground>

		</TouchableHighlight>
	</View>
	);
}

const styles = StyleSheet.create({
	imageBackground: {
		flexDirection: "column-reverse",
		flex: 1
	},

	imageStyle: {
		borderRadius: 20
	},

	InformationContainer: {
		width: "100%",
		height: "20%",
		backgroundColor: "black",
		borderRadius: 12,
		opacity: 0.6
	}
});

export default BusinessImage