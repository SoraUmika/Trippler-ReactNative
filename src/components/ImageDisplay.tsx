"use strict";
import React, { Component } from 'react';
import { View, Image, StyleSheet, Button} from 'react-native';

interface Props{
  width?: number,
  height?: number,
  image: string
}


export default class ImageDislpay extends Component<Props>{
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
        <Image source={{uri: this.props.image}} style={this.setImageProperties()}/>
      </View>        
    )
  }
}
