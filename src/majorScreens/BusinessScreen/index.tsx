import React, {Component, FC} from 'react'
import { View, StyleSheet } from 'react-native'
import BusinessImage from './Image'
import { getCurrentRecomIndex } from "../../redux/selectors";
import useSelector from 'react-redux'

interface Props{
  currentRecomIndex?: number
}

const BusinessScreen: FC<Props> = props => {
  const currentRecomIndex = useSelector(getCurrentRecomIndex);

  return(
    <View style={styles.formatRules}>

      <View style={styles.ImageContainer}>
        <BusinessImage/>
      </View>
        
    </View>
    )
}

const styles = StyleSheet.create({
  formatRules: {
    flexDirection: 'column',
    flex: 1

  },

  ImageContainer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: 12
  },
}) 

export default BusinessScreen