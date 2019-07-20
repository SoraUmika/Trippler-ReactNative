import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native';

export default class TitleBar extends Component{
  render(){
    return(
      <View>
        <Text style={styles.title_container}>Trippler</Text>      
      </View>
    )
  }

}

const styles = StyleSheet.create({
  title_container: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  }
  });