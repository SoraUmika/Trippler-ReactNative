import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'

export default class NavigationBar extends Component{
  render(){
    let color = ['red', 'blue', 'green', 'yellow']
    return(
      <View style={styles.layoutRule}>
        {color.map(color => (
          <View key={color} style={{flex: 1, backgroundColor: color}}/>
        ))}
      </View>    
    )    
  }
}

const styles = StyleSheet.create({
  layoutRule: {
    flexDirection: 'row',
    flex: 1
  },

})