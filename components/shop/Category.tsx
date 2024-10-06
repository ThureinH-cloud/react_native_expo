import React from 'react'
import { View,Text,StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image';
import { API_URL } from '@/config';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Category({id,name,image,onSelect,select}:{id:any,name:any,image:any,onSelect:(name:string)=>void,select:string}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={()=>onSelect(id)}> 
        <Image
          style={[styles.image, select === id && styles.borderLine]}
          source={{uri: API_URL+image}}
          placeholder={{blurhash}}
          contentFit='cover'
          transition={1000}
        />
          <Text style={{marginTop:5}}>{name}</Text>
      </Pressable>
    </View>
  )
}
const styles=StyleSheet.create({
    container: {
      marginHorizontal: 9,
      marginVertical: 15,
    },
    image: {
        width: 60,
        height: 60,
    },
    borderLine:{
      borderColor:'orange',
      borderWidth:2,
      borderRadius:30
    },
    pressable: {
      justifyContent: "center",
      alignItems: "center",
    }
    
})