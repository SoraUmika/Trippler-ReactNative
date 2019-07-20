import React, { Component } from 'react'
import {View, StyleSheet, Animated, Button, Dimensions, StatusBar} from 'react-native'

interface Props{
  slideup?: boolean
}

export default class InfoDetailedContainer extends Component<Props>{
  state = {
    top_amt: new Animated.Value(0),
    slide_current_pos: 'down'
  }

  slide = (slide_to_value: number) => {Animated.timing(
    this.state.top_amt,
    {
      toValue: slide_to_value,
      duration: 300
    }
  ).start(); }
  
  slideCheck = () => {
    if(this.state.slide_current_pos === 'down'){
      this.slide(-1 * Dimensions.get('window').height+StatusBar.currentHeight+10);
      this.state.slide_current_pos = 'up';
    }else if(this.state.slide_current_pos === 'up'){
      this.slide(0);
      this.state.slide_current_pos = 'down';
    }
  }

  componentDidMount(){
    if(this.props.slideup === true){
      this.slide(0) 
    }else{
      console.log('DOWN')
    }
  }

  render(){
    return(
      <View> 
        <Animated.View style={{...styles.containerProperties, top: this.state.top_amt}}/>
        <Button title={'Slide Up'} onPress={()=>this.slideCheck()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerProperties: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 0,     
      borderRadius: 10,
      backgroundColor: 'blue',
  }
})