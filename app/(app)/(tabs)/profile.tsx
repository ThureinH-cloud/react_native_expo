import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image'
import React,{useRef, useState} from 'react'
import { SafeAreaView,Text,View,StyleSheet,Switch, Pressable,ScrollView, Dimensions } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useSession } from '@/providers/ctx';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width,height}=Dimensions.get("window");

export default function profile() {
  const {signOut}=useSession();
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const [isEnabled, setIsEnabled] = useState(false);
  const first=useRef<ScrollView>(null);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onPresstoTop=()=>{
    first.current?.scrollTo(
      {
        y:0,
        animated:true
      }
    )
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.profile_container}>
          <Image 
            style={styles.image}
            source={require("@/assets/images/man.png")}
            contentFit='cover'
            placeholder={blurhash}
            transition={1000}
          />
          <Text style={{position:'relative',top:-53,fontSize:19,fontWeight:"700",color:"#fff"}}>TH</Text>
          <Text style={styles.name}>Thurein Htet</Text>
        </View>
        <ScrollView ref={first} showsVerticalScrollIndicator={false}>
        <View style={styles.list_item}>
          <View style={{flexDirection:'row',flexBasis:'auto'}}>
            <Ionicons style={{marginRight:10}} name='clipboard-outline' size={20}  />
            <Text style={{fontSize:17,fontWeight:600}}>My orders</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </View>
        <View style={{width:'auto',height:1,backgroundColor:'#000',opacity:0.2,margin:10}}>
        </View>
       <View>
        <Text style={styles.sec_title}>SETTINGS</Text>
        <View style={styles.list_item}>
          <View style={{flexDirection:'row',flexBasis:'auto'}}>
            <Ionicons style={{marginRight:10}} name='person-outline' size={20}  />
            <Text style={{fontSize:17,fontWeight:600}}>User profile</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </View>
        <View style={styles.list_item}>
          <View style={{flexDirection:'row',flexBasis:'auto'}}>
            <Ionicons style={{marginRight:10}} name='notifications-outline' size={20}  />
            <View style={{width:'80%'}}>
              <Text style={{fontSize:17,fontWeight:600}}>Allow push notifications</Text>
              <Text style={{fontSize:14,fontWeight:'bold',opacity:0.4,marginVertical:7}}>Get updates on your sales, purchases, and key activities</Text>
            </View>
          </View>
            <Switch
              trackColor={{false: '#cacabcbc', true: 'grey'}}
              thumbColor={isEnabled ? '#fffe' : '#f4f3f4'}
              ios_backgroundColor="rgba(206, 204, 204, 0.913)"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>
        <View style={styles.list_item}>
          <View style={{flexDirection:'row',flexBasis:'auto'}}>
            <Ionicons style={{marginRight:10}} name='card-outline' size={20}  />
            <Text style={{fontSize:17,fontWeight:600}}>Payment methods</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </View>
        <View style={styles.list_item}>
          <View style={{flexDirection:'row',flexBasis:'auto'}}>
            <Feather style={{marginRight:10}} name='map-pin' size={20}  />
            <Text style={{fontSize:17,fontWeight:600}}>Delivery address</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </View>
        <View style={{width:'auto',height:1,backgroundColor:'#000',opacity:0.2,margin:10}}>
        </View>
        </View>
        <View>
          <Text style={styles.sec_title}>HELP</Text>
          <View style={styles.list_item}>
            <View style={{flexDirection:'row',flexBasis:'auto'}}>
              <FontAwesome5 style={{marginRight:10}} name='question-circle' size={20}  />
              <Text style={{fontSize:17,fontWeight:600}}>FAQ</Text>
            </View>
          </View>
          <View style={styles.list_item}>
            <View style={{flexDirection:'row',flexBasis:'auto'}}>
              <Ionicons style={{marginRight:10}} name='mail-outline' size={20}  />
              <Text style={{fontSize:17,fontWeight:600}}>Support</Text>
            </View>
          </View>
       </View>
       <View>
        <TouchableOpacity onPress={signOut}>
          <Text style={[styles.link_button,{marginRight:3}]}>Log  out</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <Pressable>
            <Text style={styles.link_button}>Privacy Policy</Text>
          </Pressable>
          <Text style={[styles.link_button]}>|</Text>
          <Pressable>
              <Text style={[styles.link_button,{marginLeft:3}]}>Terms & Conditions</Text>
          </Pressable>
        </View>
        <Text style={styles.link_button}>1.0.0</Text>
       </View>
       
        </ScrollView>
        <View style={{height:110}}>
       </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  image:{
    width: 80,
    height: 80,
    marginTop:6
  },
  profile_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "darkgreen",
  },
  list_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"baseline",
    padding: 10,
    marginTop:10,
  },
  sec_title: {
    fontSize:19,
    fontWeight: "600",
    margin:10
  },
  link_button: {
    fontWeight:"600",
    margin:8,
    color:"darkgreen"
  },
  container: {
    minHeight:height
  }
})