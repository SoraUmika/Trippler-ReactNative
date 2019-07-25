import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import BusinessImage from './Image'

export default class BusinessScreen extends Component{
  render(){
    return(
      <View style={styles.formatRules}>

        <View style={styles.ImageContainer}>
          <BusinessImage/>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formatRules: {
    flexDirection: 'column',
    flex: 1

  },

  ImageContainer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: 12
  },
}) 