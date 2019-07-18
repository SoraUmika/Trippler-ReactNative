import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class CollectionItem extends Component {
    render(){
        return <View style={styles.container}/>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green"
    }
});
