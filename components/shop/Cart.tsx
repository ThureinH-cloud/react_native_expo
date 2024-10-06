import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View ,Text,StyleSheet} from "react-native";
import { useAppSelector } from '@/hooks/useRedux';
import { selectCount } from '@/providers/redux/cartSlice';
export default function Cart() {
  const count=useAppSelector(selectCount);
  return (
    <>
        <Ionicons
        name='cart-outline' size={24} color="black"
        />
        <View style={styles.container}>
            <Text style={{color:'white'}}>{count}</Text>
        </View>
    </>
  )
}
const styles=StyleSheet.create({
    container: {
        width:23,
        height:23,
        backgroundColor:"red",
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:10,
        left:10,
    }
})
