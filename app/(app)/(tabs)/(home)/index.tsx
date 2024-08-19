import React, { useEffect } from 'react'
import { Link,useNavigation } from 'expo-router'
import { Text,StyleSheet ,Dimensions, Pressable,View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Image} from "expo-image";
import Cart from '@/components/shop/Cart';
import Title from '@/components/shop/Title';
const {width,height}=Dimensions.get("window");
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function index() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown:false
    },);
  },[navigation])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
      <Pressable>
        <Image
        style={styles.image}
        source={require("@/assets/images/n.png")}
        placeholder={{blurhash}}
        contentFit='cover'
        transition={1000}
        />
      </Pressable>
      <Pressable>
        <Cart/>
      </Pressable>
      </View>
      <View>
        <Image
          style={styles.banner}
          source={require("@/assets/images/banner6.png")}
        />
      </View>
      <View>
        <Title title='Shop By Category' action='See All'/>
      </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  container:{
    backgroundColor: "white",
    minHeight: height,
  },
  image:{
      width: 50,
      height: 25,
  },
  section:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal:15
  },
  banner:{
    width: "100%",
    aspectRatio: 20/9,
    marginTop:10
  }
});