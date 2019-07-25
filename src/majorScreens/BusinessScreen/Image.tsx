import React, {Component} from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import SwipeScreenInfo from './Info'

export default class SwipeScreenImage extends Component{
  render(){
    return(
      <View style={{flex: 1}}>
        <ImageBackground style={styles.imageBackground} imageStyle={styles.imageStyle}
        source={{uri:'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/1543591797/collard-greens-ramen-ft-RECIPE0119.jpg?itok=ZmwAvi5t'}}>
          <View style={styles.InformationContainer}>
            <SwipeScreenInfo/>
          </View>
        </ImageBackground>

      </View>    
    )    
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    flexDirection: 'column-reverse',
    flex: 1,
  },

  imageStyle: {
    borderRadius: 20
  },

  InformationContainer: {
    width: '100%',
    height: '20%',
    backgroundColor: 'black',
    borderRadius: 12,
    opacity: 0.6
  },
})
