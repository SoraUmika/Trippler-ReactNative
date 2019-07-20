"use strict";
import React, { Component } from 'react';
import { View, Image, StyleSheet, Button} from 'react-native';

interface Props{
  width?: number,
  height?: number
}

interface State{

}

export default class ImageDislpay extends Component<Props, State>{
  state = {
    img_source: 'https://cdn.dribbble.com/users/371094/screenshots/3884115/ramen.jpg'
  }

  setImageProperties = () => {
    return {width: this.props.width, 
            height: this.props.height,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#87ceeb',
            }
  }

  render(){
    return(
      <View>
        <Image source={{uri: this.state.img_source}} style={this.setImageProperties()}/>
      </View>        
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  }
});