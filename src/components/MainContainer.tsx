import React, {Component} from 'react';
import { View } from 'react-native'
import SwipeScreenContainer from './SwipeScreenContainer'
import NavigationBar from './NavigationBar'


export default class MainContainer extends Component{
  render(){
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 11}}>
          <SwipeScreenContainer/> 
        </View>

        <View style={{flex: 1}}>
          <NavigationBar />
        </View>      
      </View>
    )
  }

}