import { useEffect,useState,useRef } from 'react'
import { Link,useNavigation } from 'expo-router'
import { Text,StyleSheet ,Dimensions, Pressable,View, FlatList, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Image} from "expo-image";
import Cart from '@/components/shop/Cart';
import Title from '@/components/shop/Title';
import Category from '@/components/shop/Category';
import {FlashList} from "@shopify/flash-list";
import Product from '@/components/shop/Product';
import { StatusBar } from 'expo-status-bar';
import { useScrollToTop } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useRouter } from 'expo-router';
import { fetchProducts,updateProduct,selectProductById,selectProductIds,selectTotalProducts,selectAllProducts,selectProductEntities, updateFavouriteApi } from '@/providers/redux/productSlice';
import { ProductType,CategoryType } from '@/types';
import Toast from "react-native-root-toast";
import { fetchRequiredInfo } from '@/providers/redux/requiredInfoSlice';
const {width,height}=Dimensions.get("window");
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function index() {
  const navigation = useNavigation();
  const first = useRef<ScrollView>(null);
  useScrollToTop(first);
  const router=useRouter();
  const [select, setSelect] = useState("uuid1");
  // const [data, setData] = useState();
  const dispatch=useAppDispatch();
  const products=useAppSelector(selectAllProducts);
  const productsLoading=useAppSelector((state)=>state.products.loading);
  const errorStatus=useAppSelector((state)=>state.products.error);
  const categories:CategoryType[]=useAppSelector((state)=>state.requiredInfo.categories);
  const productLists=products.filter((product)=>product.categories_id===select)
  
  const selectHandler=(name:string) => {
    setSelect(name);
  }
  const onPressToTop=()=>{
    first.current?.scrollTo({
      y: 0,
      animated:true
    })
  }
  const saveProductToRedux=(id:string)=>{
    router.push({
      pathname: "/details",
      params:{id},
    })
  }
  useEffect(() => {
    navigation.setOptions({
      headerShown:false
    },);
    dispatch(fetchProducts());
  },[navigation]);

  if(productsLoading){
    return <Text style={{textAlign:"center",flex:1,alignItems:"center",justifyContent:"center"}}>Loading...</Text>;
  }
  const addToFavourite=async(item:ProductType)=>{
    try{
      const data={id:item.id,data:{favourite:!item.favourite}}
      //const data={id:"abc",data:{}};
      await dispatch(updateFavouriteApi(data)).unwrap();
    }catch(error:any){
      Toast.show(error,{duration:Toast.durations.SHORT});
    }
  }
  if(categories.length==0){
    return (
      <View>
        <Text>Network connection failed</Text>
        <Pressable onPress={()=>fetchRequiredInfo()} style={styles.btnerror}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }
  if(errorStatus){
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>Network Connection Failed!</Text>
      <Pressable onPress={()=>dispatch(fetchProducts())} style={styles.btnerror}>
        <Text>Try Again</Text>
      </Pressable>
    </View>
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark'/>
      <View style={styles.section}>
      <Pressable onPress={onPressToTop}>
        <Image
        style={styles.image}
        source={require("@/assets/images/n.png")}
        placeholder={{blurhash}}
        contentFit='cover'
        transition={1000}
        />
      </Pressable>
      <Pressable onPress={()=>router.navigate('/cart')}> 
        <Cart/>
      </Pressable>
      </View>
      <ScrollView ref={first} showsVerticalScrollIndicator={false} >
      <View>
        <Image
          style={styles.banner}
          source={require("@/assets/images/banner6.png")}
        />
      </View>
      <View style={styles.ttcontainer}>
        <Title title='Shop By Category' action='See All'/>
        <FlashList
            data={categories}
            horizontal
            extraData={select}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => 
              <Category {...item} select={select} onSelect={selectHandler} />
            }
             estimatedItemSize={60}

    />
    <Title title='Recommended for You' action='See All' />
    <FlashList
    data={productLists}
    horizontal
    showsHorizontalScrollIndicator={false}
    estimatedItemSize={60}
    renderItem={(({ item }) =>
            <Product {...item} onCall={()=>saveProductToRedux(item.id)} addFavourite={()=>addToFavourite(item)}/>
    )}
    />        
    <Title title='Popular List for You' action='See All'/>
    <FlashList
    estimatedItemSize={60}
      showsHorizontalScrollIndicator={false}
      data={productLists}
      horizontal
      
      renderItem={({ item }) =>(
        <Product {...item} onCall={()=>saveProductToRedux(item.id)} addFavourite={()=>addToFavourite(item)}/>
      )}
    />
        <View style={{marginBottom:110}}></View>

    </View>
    </ScrollView>
    
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
    paddingHorizontal:15,
    paddingVertical:8
  },
  banner:{
    width: "100%",
    aspectRatio: 20/9,
    marginTop:10
  },
  ttcontainer:{
    marginHorizontal: 20,
  
  },
  btnerror:{
    marginVertical:10,
    borderWidth:0.5,
    borderColor:"black",
    paddingHorizontal:10,
    paddingVertical:7
  }
});