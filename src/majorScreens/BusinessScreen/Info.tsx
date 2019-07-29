import React, {FC} from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import Business from "../../redux/state/Business";

interface Props{
  currentBusiness: Business
}

const BusinessInfo: FC<Props> = (props) =>{

    return(
        <View style={styles.root}>
          <Text style={styles.businessName}>{props.currentBusiness.name}</Text>
          <Text style={styles.ratings}> {props.currentBusiness.rating} {props.currentBusiness.ratingNum} </Text>
          <Text style={styles.address}> {props.currentBusiness.address} </Text>
          <Text style={styles.hours}> {props.currentBusiness.hours[0].toString()} </Text>
        </View>    
    )    

}

const styles = StyleSheet.create({
  root: {
    width: "100%",
		backgroundColor: "white",
		borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16
  },

  businessName: {
    fontSize: 40,
    fontWeight: "bold"
  },

  address: {
    fontSize: 15,
    fontStyle: 'normal',
  },

  ratings: {
    fontSize: 15,
    fontStyle: 'normal',
  },

  hours: {
    fontSize: 15,
    fontStyle: 'normal',
  }

})

export default BusinessInfo