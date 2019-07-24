import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SwipeScreenImage from './SwipeScreenImage'

export default class SwipeScreenContainer extends Component{
  render(){
    return(
      <View style={styles.formatRules}>

        <View style={styles.ImageContainer}>
          <SwipeScreenImage/>
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