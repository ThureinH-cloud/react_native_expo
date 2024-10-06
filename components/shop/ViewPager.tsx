import React,{useState,useEffect} from 'react'
import {Text, View,Animated,Dimensions,StyleSheet } from 'react-native';

import PagerView,{PagerViewOnPageScrollEventData} from 'react-native-pager-view'
import { sample } from '@/data'
import {
    SlidingDot,
  } from 'react-native-animated-pagination-dots';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
  const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ViewPager() {
  const {width,height} = Dimensions.get('window');
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, sample.length];
  const [current,setCurrent]=useState(0);
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, sample.length * width],
  });
  useEffect(() => {
    const intervalId=setInterval(() => {
        setCurrent((prev)=>{
            const nextpage=(prev+1) % sample.length;
            ref.current?.setPage(nextpage);
            return nextpage;
        })
    },3000)
  },[])
  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    []
  );
  return (
    <View style={{width:width,height:height/3}}>
        <AnimatedPagerView testID="pager-view" initialPage={0} ref={ref} style={{height:height/3}} onPageScroll={onPageScroll}> 
            {sample.map((item)=>(
                <View style={styles.imageView} testID={`pager-view-data${item.key}`} key={item.key} >
                    <Image source={item.image} transition={1000} placeholder={blurhash} contentFit='contain' style={styles.image}/> 
                </View>
            ))}
        </AnimatedPagerView>
        <View style={styles.dotContainer}>
          <SlidingDot
            testID={'sliding-dot'}
            marginHorizontal={3}
            data={sample}
            //@ts-ignore
            scrollX={scrollX}
            dotSize={9}
          />
        </View>
    </View>
  )
}
const styles= StyleSheet.create({
    imageView: {
        width: "100%",
        height: "100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "#fffeee",
        paddingVertical: 30,
    },
    image:{
        width: "100%",
        height: "100%",
    },
    dotContainer: {
        marginTop:25
    }
})