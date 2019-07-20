"use strict";
import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native';

interface Props{
    Info: object
    ItemName?: string,
    ItemAddress?: string,
    ItemOpenTime?: string,
}

interface State{

}

export default class InfoContainer extends Component<Props, State>{
  render(){
    return(
      <View>
        <Text style={styles.name}> {this.props.Info['names']} </Text>
        <Text style={styles.adress}> {this.props.Info['address']} </Text>
        <View style={styles.rating_container}>
          <Text> ratings: {this.props.Info['ratings']} (will have image of stars here) </Text>
        </View>
        <Text style={styles.openTime}> {this.props.Info['hours']} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingLeft: 4

  },

  adress: {
    fontSize: 16,
    fontStyle: 'italic',
    paddingLeft: 5
  },

  rating_container: {
    flexDirection: 'row',
    paddingLeft: 5
  },

  openTime: {
    fontSize: 16,
    fontStyle: 'italic',
    paddingLeft: 5
  }

})