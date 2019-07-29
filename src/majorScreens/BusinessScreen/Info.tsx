import React, {FC} from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import {timeToString} from "../../util/time";
import Business from "../../redux/state/Business";

interface Props{
  currentBusiness: Business
}

const BusinessInfo: FC<Props> = (props) =>{

    return(
        <View style={styles.layoutRule}>
          <Text style={styles.businessName}> {props.currentBusiness.name} </Text>
          <Text style={styles.ratings}> {props.currentBusiness.rating} {props.currentBusiness.ratingNum} </Text>
          <Text style={styles.address}> {props.currentBusiness.address} </Text>
          <Text style={styles.hours}> {props.currentBusiness.hours[0].toString()} </Text>
        </View>    
    )    

}

const styles = StyleSheet.create({
  layoutRule: {
    flexDirection: 'column',
    alignItems: 'center'
  },

  businessName: {
    fontSize: 25,
    fontStyle: 'italic',
    color: 'white',
    marginBottom: 8
  },

  address: {
    fontSize: 15,
    fontStyle: 'normal',
    color: 'white'
  },

  ratings: {
    fontSize: 15,
    fontStyle: 'normal',
    color: 'white'
  },

  hours: {
    fontSize: 15,
    fontStyle: 'normal',
    color: 'white'
  }

})

export default BusinessInfo