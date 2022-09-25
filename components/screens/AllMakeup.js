import React, { useState, useEffect, useContext,useCallback } from 'react';
import { StyleSheet, TextInput,Text, View ,ImageBackground, TouchableOpacity,ScrollView,Image,FlatList, Button} from 'react-native';


import {createStackNavigator} from '@react-navigation/stack';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import prod from '../const/prod';
import Toast from 'react-native-toast-message';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import {
  addWishList,removeWishList, addCart,getCart
 
} from '../../Redux/Actions/ProductAction';

export default ({ navigation ,route}) => {
    const [search, setSearch] = useState('');
    const [filtered, setFilterted] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = React.useState(0);

    const [listings, setlistings] = useState([]);

    useEffect(() => {
      axios.get(`${baseURL}products`)
      .then((res)=>{
        console.log(res.data);
        setlistings(res.data);
      })
      return()=>{
        setlistings([])
      };
    }, []);

    
    const Stack = createStackNavigator();

    const {n} = route.params != undefined ? route.params : {}
    const updateSearch = (search) => {
      const d = prod.filter((item) => {
        return item.name.match(search);
      });
  
      setSearch(search);
      setFilterted(d);
    };

    const MakeupStore = ({route}) =>{
        return(
            <View style={styles.container}>
                  <View
                  style={{
                    marginTop: 80,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  }}>
                  <View style={styles.inputContainer}>
                    <Icon 
                    name="search" 
                    size={28} 
                                  />
                    <TextInput
                      style={{ flex: 1, fontSize: 18 }}
                      placeholder="Search for food"
                      onChangeText={updateSearch}
          
                    />
                     <Icon 
                    name="cancel" 
                    size={20} 
                    onPress={()=>{
                      setFilterted('')}}
                                  />
                  </View>
                  <View style={styles.sortBtn}>
                    <Icon name="tune" size={28} color={COLORS.white} />
                  </View>
                  </View>
                  <View>
                  <FlatList
               style={{ flex:1}}
               data={listings}
               numColumns={2}
               showsVerticalScrollIndicator={false}
               renderItem={({ item }) => {
                 return (
                   <View style={styles.row}>

                     <View style={styles.carts}>
                     <Image
              style={styles.productImg}
              source={{uri: item.images[0].filePath}}
            />
                       
                       <View>
                         <Text style={styles.prdtext1}>{item.name}</Text>
                       </View>
                       <View style={styles.row}>
                         <Text style={styles.prdtext2}>Rs {item.price}</Text>
           
                         <TouchableOpacity
                           style={{
                             backgroundColor: COLORS.primary,
                             width: 30,
                             height: 30,
                             borderRadius: 10,
                             justifyContent: 'center',
                             alignItems: 'center',
                             marginTop: 7,
                             marginRight:5
                           }}
                           onPress={() => navigation.navigate('DetailScreen', {product:item})}>
                           <Text
                             style={{
                               color: 'white',
                               fontSize: 18,
                               fontWeight: 'bold',
                             }}>
                             +
                           </Text>
                         </TouchableOpacity>
                       </View>
                     </View>
                   </View>
                 );
               }}
               keyExtractor={(item, index) => index.toString()}
             />
                  </View>
                </View>
        )

    }
    const DetailScreen = ({route}) =>{
      const dispatch = useDispatch();
      const {user} = useSelector(state => state.user);
      const {wishlistData} = useSelector(state => state.wishList);

      const {product} = route.params;
      const [quantity, setquantity] = useState(1);
      const [selectedStar,starCount] = useState(2)
      const onStarRatingPress=(rating)=> {
        
          starCount(rating)
       
      }
      const[click, setclick] = useState(false)
      const [data, setData] = useState('')

      const [cart, setCart] = useState(false);
      const [cartdata, setCartData] = useState();
      const {cartData} = useSelector(state => state.cart);
     
     
      let Img ="yo"
      // decreaseQuantity handler
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  // increaseQuantity handler
  const increaseQuantity = () => {
    if (route.params?.product.Stock - 1 < quantity) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1:  `${route.params?.product.name} out of stock.`,
      });
    } else {
      setquantity(quantity + 1);
    }
  };

      const wishListHandler = () =>{
        setclick(true)
        console.log(user._id)
        console.log(data)

        dispatch(
          addWishList(
            route.params?.product.name,
            route.params?.product.price,
            Img,
            user._id,
            route.params?.product._id,
          ),
        );
        Toast.show({
          topOffset: 60,
          type: "success",
          text1:  `${route.params?.product.name} Added to wishlist`,
        });
  
      };
      const removeWishlistData = (data) =>{
        setclick(false)
        let id = data;
        dispatch(removeWishList(id))
        Toast.show({
          topOffset: 60,
          type: "success",
          text1:  `${route.params?.product.name} removed from wishlist`,
        });
  
      }

       // addToCartHandler
  const addToCartHandler = async () => {
    await dispatch(
      addCart(
        route.params?.product.name,
        quantity,
        Img,
        route.params?.product.price,
        user._id,
        route.params?.product._id,
        route.params?.product.Stock,
      ),
    );
    Toast.show({
      topOffset: 60,
      type: "success",
      text1:  `${route.params?.product.name} added to cart successfully`,
    });
  };

  // cartAlreadyAdded handler
  const cartAlreadyAdded = () => {
    Toast.show(
      route.params?.product.Stock === 0
        ? `${route.params?.product.name} out of stock`
        : `${route.params?.product.name} already have in cart`,
      Toast.SHORT,
      Toast.BOTTOM,
  );
  };

      useEffect(() => {
        if (wishlistData && wishlistData.length > 0) {
          wishlistData.map(data => {
            setData(data);
            if (data.productId === route.params?.product._id) {
              setclick(true);
            }
          });
        }
        if (cartData && cartData.length > 0) {
          cartData.map(data => {
            setCartData(data);
            if (data.productId === route.params?.product._id) {
              setCart(true);
            }
          });
        }
        
        dispatch(getCart());

      }, [wishlistData, cartData]);
        return(
          <View style={styles.container}>
          <ScrollView
          showsVerticalScrollIndicator={false}>
            <View>
              <Image
                style={{ height: 290, width: 290,marginLeft:30, borderRadius:20, marginTop:15, marginBottom:15}}
                source={{uri: product.Img}}
              />
            </View>
              <View>
                <Text style={{fontSize:25, fontWeight:"bold", marginLeft:14}}>{product.name}</Text>
              </View>
              <View>
                <Text style={{fontSize:20, marginRight:17,fontWeight:"bold", marginLeft:14}}>Rs. {product.price}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent:"flex-start", marginTop:5, marginLeft:14}}>

             
                <View>
              <StarRating
              starSize={20}
        disabled={false}
        maxStars={5}
        rating={selectedStar}
        fullStarColor={'#fcba03'}        
        selectedStar={(rating) => {onStarRatingPress(rating)}}
      />
      
              </View>
              <View style={{marginLeft:10, marginBottom:10}}>
                <Text style={{fontSize:17}}>{selectedStar}</Text>
                </View>
                <View style={{justifyContent:"flex-end", flexDirection:"row-reverse", marginRight: 180}}>
                    {click? (
                    <Icons
                      name="heart"
                      size={25}
                      color={COLORS.primary}
                      backgroundColor= {COLORS.white}
                      onPress={() => {removeWishlistData(data._id)
                        console.log(data._id)
                      }}
                    /> 
                    ) : (
                      <Icons
                      name="heart-outline"
                      size={25}
                      color={COLORS.primary}
                      backgroundColor= {COLORS.white}
                      onPress={() => {wishListHandler()
                      }}
                    /> 
                    )
              }
                             
                  </View>
              </View>
              
              <View style={{ padding: 4, marginTop:5,margin:14,alignContent: 'center' }}>
                
                <Text
                  style={{ backgroundColor: COLORS.lightprimary, padding: 8,borderRadius:10 }}>
                    {product.description}
                </Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <View style={styles.incrementBox}>
                <TouchableOpacity
                style={styles.incrementButtonStyle}
                  
                  onPress={()=>{decreaseQuantity()}}>
                  <Text style={styles.incrementtextStyle}>-</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15, padding:4, textAlign:"center"}}>{quantity}</Text>
                <TouchableOpacity
                style={styles.incrementButtonStyle}
                  
                  onPress={()=>{increaseQuantity()}}>
                  <Text style={styles.incrementtextStyle}>+</Text>
                </TouchableOpacity>
              </View>

              {cart === true || route.params?.product.Stock === 0 ? (

              <View>
              <TouchableOpacity
                style={{
                  backgroundColor:"#000",
                  height:33,
                  width: 150,
                  borderRadius:10,
                  marginRight:18
                }}
                  
                  onPress={()=>{cartAlreadyAdded()}}>
                  <Text style={styles.adcarttextStyle}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>


              ) : (

                <View>
                <TouchableOpacity
                  style={{
                    backgroundColor:COLORS.primary,
                    height:33,
                    width: 150,
                    borderRadius:10,
                    marginRight:18
                  }}
                    
                    onPress={()=>{addToCartHandler()
                    console.log("no")}}>
                    <Text style={styles.adcarttextStyle}>ADD TO CART</Text>
                  </TouchableOpacity>
                </View>

              )}


            </View>
            
          </ScrollView>
        </View>
        )

    }


  
        return(
            <Stack.Navigator initialRouteName="MakeupStore">
            <Stack.Screen
              name="StartScrMakeupStoreeen"
              component={MakeupStore}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailScreen"
              component={DetailScreen}
              options={{
                title: 'Product',
                headerStyle:{height:50},
                headerShadowVisible:false,
               
              
              }}
            />
            
          </Stack.Navigator>
                
              )
    
   
    
  
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
      },
      backimg: {
        height: 700,
        width: 400
    
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 27,
        margin: 15,
      },
      inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: "#E5E5E5",
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      carts: {
        backgroundColor:"#f5dfe6",
        borderRadius:10,
        width: 147,
        height: 190,
        margin: 12,
        padding: 5,
        
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        flexBasis: '50%',
      },
      productImg: {
        resizeMode: 'cover',
        height: 100,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 8,
        borderRadius:10
      },
      prdtext1: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 9,
        marginLeft: 9,
      },
      prdtext2: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 9,
        marginLeft: 9,
      },
      incrementButtonStyle:{
        backgroundColor:COLORS.primary,
        height:33,
        width: 38,
        borderRadius:10
      },
      incrementtextStyle:{
        color:COLORS.white, 
        fontWeight:"bold", 
        fontSize:16,
        padding:4, 
        textAlign:"center"
      },
      incrementBox:{
        borderWidth:1, borderColor:COLORS.lightprimary,
        backgroundColor:COLORS.lightprimary,
        borderRadius:10, 
        height:35, 
        width:110, 
        flexDirection:"row", 
        justifyContent:"space-between",
        marginLeft:18
      },
      
      adcarttextStyle:{
        color:COLORS.white, 
        fontSize:15,
        padding:4, 
        textAlign:"center"
      },
  });
  
