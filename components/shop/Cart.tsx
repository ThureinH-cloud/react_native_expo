import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View ,Text,StyleSheet} from "react-native"
export default function Cart() {
  return (
    <>
        <Ionicons
        name='cart-outline' size={24} color="black"
        />
        <View style={styles.container}>
            <Text>13</Text>
        </View>
    </>
  )
}
const styles=StyleSheet.create({
    container: {
        width:24,
        height:24,
        backgroundColor:"red",
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:10,
        left:10,
    }
})
