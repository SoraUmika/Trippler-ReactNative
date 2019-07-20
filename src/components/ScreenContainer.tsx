"use strict";
import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, StatusBar, TouchableHighlight, Image } from 'react-native';
import TitleBar from './TitleBar'
import ImageDisplay from './ImageDisplay'
import InfoContainer from './InfoContainer'
import InfoDetailedContainer from './InfoDetailedContainer'

export default class ScreenContainer extends Component{
  constructor(props){
    super(props);
  }
   
  state = {
    currentImage: 'https://cdn.dribbble.com/users/371094/screenshots/3884115/ramen.jpg',
    currentImageIndex: 0
  }

  change_image = () => {
    let ImageList: string[] = [
      'https://cdn.dribbble.com/users/371094/screenshots/3884115/ramen.jpg',
      'https://exploremcallen.com/wp-content/uploads/2018/05/mcallen-donut-day.jpg',
      'https://www.ewapointe.com/uploads/2/4/9/4/24941691/picture-menu-poster_2_orig.jpg'
    ]

    if(this.state.currentImageIndex < ImageList.length-1){
      let index = this.state.currentImageIndex + 1;
      this.setState({currentImageIndex: index});
      this.setState({currentImage: ImageList[index]})
    }else{
      this.setState({currentImageIndex: 0});
      this.setState({currentImage: ImageList[0]});
    }

    console.log(this.state.currentImageIndex + ': ' + this.state.currentImage)
  }

  render(){
    return(
      <View style={styles.layout_rules}>
        <View style={styles.top_border}/>

        <View>
          <TouchableHighlight onPress={() => this.change_image()}>
            <Image source={{uri: this.state.currentImage}} 
              style={styles.image_style}/
            >
          </TouchableHighlight>
        </View>  

        <View style={styles.header_container}>
          <InfoContainer/>
        </View>

        <View style={styles.info_container}/>
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
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#87ceeb',
  },

  info_container:{
    backgroundColor: 'black'
  },
});