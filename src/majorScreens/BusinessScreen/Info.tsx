import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class BusinessInfo extends Component{
  render(){
    return(
      <View style={styles.layoutRule}>
        <Text style={styles.businessName}> Bussiness Name </Text>
        <Text style={styles.address}> Ratings </Text>
        <Text style={styles.address}> 3825 Parsons Blvd, NY, 11354 </Text>
      </View>    
    )    
  }
}

const styles = StyleSheet.create({
  layoutRule: {
    flexDirection: 'column',
    alignItems: 'center'
  },

  businessName: {
    fontSize: 25,
    fontStyle: 'italic',
    color: 'white'
  },

  address: {
    fontSize: 15,
    fontStyle: 'normal',
    color: 'white'
  }

})