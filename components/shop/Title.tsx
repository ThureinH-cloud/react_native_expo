import React from 'react'
import  {View,Text,StyleSheet} from "react-native"
export type titleProps={
    title: string,
    action:string
}
export default function Title({title,action}:titleProps) {
  return (
    <>
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.action}>{action}</Text>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:10,
        marginHorizontal: 10,
    },
    title:{
        fontSize: 18,
        fontWeight:"600"
    },
    action:{
        fontSize: 16,
        color:"grey",
        fontWeight:"500"
    }
})
