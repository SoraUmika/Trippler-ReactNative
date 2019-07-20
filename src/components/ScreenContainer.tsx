"use strict";
import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, StatusBar, TouchableHighlight, Image } from 'react-native';
import ImageDisplay from './ImageDisplay'
import InfoContainer from './InfoContainer'
import InfoDetailedContainer from './InfoDetailedContainer'

export default class ScreenContainer extends Component{
  constructor(props){
    super(props);
  }
   
  state = {
    currentImageIndex: 0,
    info: {
      url: 'https://cdn.dribbble.com/users/371094/screenshots/3884115/ramen.jpg',
      names: 'RAMEN STORE',
      address: '111 ST NY, 11223',
      hours: '7AM - 8PM',
      ratings: '8/10'
    }
  }

  change_image = () => {
    let ItemList: object[] = [
      {
        url: 'https://cdn.dribbble.com/users/371094/screenshots/3884115/ramen.jpg',
        names: 'RAMEN STORE',
        address: '111 ST NY, 11223',
        hours: '7AM - 8PM',
        ratings: '8/10'
      },

      {
        url: 'https://exploremcallen.com/wp-content/uploads/2018/05/mcallen-donut-day.jpg',
        names: 'DONUT STORE',
        address: '222 ST NY, 12031',
        hours: '9AM - 5PM',
        ratings: '9/10'
      },
      {
        url: 'https://www.ediblebrooklyn.com/wp-content/uploads/sites/2/2017/12/IMG_1339.jpg',
        names: 'CHINESE FOOD STORE',
        address: '333 ST NY, 11223',
        hours: '9AM - 6PM',
        ratings: '9/10'
      }
    ]

    if(this.state.currentImageIndex < ItemList.length-1){
      let index = this.state.currentImageIndex + 1;
      this.setState({currentImageIndex: index});
      this.setState({info: ItemList[index]})
    }else{
      this.setState({currentImageIndex: 0});
      this.setState({info: ItemList[0]})
    }

    console.log(this.state.currentImageIndex + ': ' + this.state.info['url'])
  }

  render(){
    return(
      <View style={styles.layout_rules}>
        <View style={styles.top_border}/>

        <View style={styles.image_container}>
          <TouchableHighlight onPress={() => this.change_image()}>
            <Image source={{uri: this.state.info['url']}} 
              style={styles.image_style}/
            >
          </TouchableHighlight>
        </View>  

        <View style={styles.header_container}>
          <InfoContainer Info={this.state.info}/>
        </View>

        <View style={styles.info_container} />

        <InfoDetailedContainer slideup={false}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout_rules:{
    flexDirection: 'column'
  },

  top_border:{
    width: Math.round(Dimensions.get('window').width),
    height: 1,
    backgroundColor: 'grey',
    marginTop: StatusBar.currentHeight,
    
  },

  header_container:{
    backgroundColor: 'white',
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').height * 0.15),  
    borderRadius: 10,

  },
    
  image_container: {
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').height * 0.80),
    alignItems: 'center',
  },

  image_style:{
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').height * 0.80),
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#87ceeb',
  },

  info_container:{
    backgroundColor: 'black'
  },
});