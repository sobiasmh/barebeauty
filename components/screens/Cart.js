import React, { useState, useEffect, useContext,useCallback } from 'react';
import { StyleSheet, View ,ImageBackground,Image, ActivityIndicator,TouchableOpacity, SafeAreaView, FlatList} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from '../../context/actions/auth_actions';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import CustomDrawer from './CustomDrawer';
import COLORS from '../const/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getWishList, getCart, removeCart, updateCart} from '../../Redux/Actions/ProductAction';



import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';
import OrderSteps from './OrderSteps';


const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const {wishlistData, error} = useSelector(state => state.wishList);
  const {cartData} = useSelector(state => state.cart);

  
        
          const [refreshFlatlist, setRefreshFlatList] = useState(false);
          const [totalPrice, setTotalPrice] = useState(0);
          const [quantity, setquantity] = useState(1);
          // remove item from cart
        const cartRemoveHandler = (key, id, name) => {
          cartData.filter((i) => i.key !== key),
      
          Toast.show({
            topOffset: 60,
            type: "success",
            text1:  `${name} removed from cart`,
          });
          dispatch(removeCart(id));
          setRefreshFlatList(!refreshFlatlist)
      
        };
      
        // decreaseQuantity handler
        const decreaseQuantity = (id) => {
          if (quantity > 1) {
            setquantity(quantity - 1);
            dispatch(updateCart(id, quantity - 1));
      
          }
        };
      
        // increaseQuantity handler
        const increaseQuantity = (id, Stock) => {
          if (Stock - 1 < quantity) {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1:  `${item.name} out of stock.`,
            });
          } else {
            setquantity(quantity + 1);
            console.log(quantity)
            dispatch(updateCart(id, quantity + 1));
      
          }
        };
      
        useEffect(() => {
          setTotalPrice(
            cartData.reduce(
              (total, item) => total + item.productPrice * item.quantity,
              0,
            ),
          );
          if (cartData.length > 0) {
            cartData.map(item => {
              setquantity(item.quantity);
            });
          }
        }, [cartData, quantity]);
      
        
          return(
            <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
              <View style={styles.header}>
              <Icon name="cart" size={28} onPress={navigation.goBack} />
              <Text style={{fontSize: 25, fontWeight: 'bold'}}> Cart</Text>
            </View>
            
      
            {cartData?.length > 0 ? (
              <View>
                <View>
      
              <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}
              
              data={cartData}
              extraData={refreshFlatlist}
      
              renderItem={({item}) => {
                return(
                <View style={styles.cartCard} key={item.key}>
              <Image source={{uri:item.productImage}} style={{height: 80, width: 80}} />
              <View
                style={{
                  height: 100,
                  marginLeft: 10,
                  paddingVertical: 20,
                  flex: 1,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.productName}</Text>
                <Text style={{fontSize: 13, color: COLORS.grey}}>
                  {item.ingredients}
                </Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Rs. {item.productPrice}</Text>
              </View>
              <View style={{marginRight: 5, alignItems: 'center'}}>
                <View>
                <TouchableOpacity
              style={styles.actionBtn}
              onPress={()=>{
                
                cartRemoveHandler(item.key, item._id, item.productName)
              }}>
                  <Icon name="alpha-x-circle" size={25} style = {{padding : 5}} color={COLORS.white} />
                  </TouchableOpacity>
                  
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={styles.incrementBox}>
                      <TouchableOpacity
                      style={styles.incrementButtonStyle}
                        
                        onPress={()=>{decreaseQuantity(item._id)}}>
                        <Text style={styles.incrementtextStyle}>-</Text>
                      </TouchableOpacity>
                      <Text style={{fontSize:15, padding:4, textAlign:"center"}}>{quantity}</Text>
                      <TouchableOpacity
                      style={styles.incrementButtonStyle}
                        
                        onPress={()=>{increaseQuantity(item._id, item.Stock)}}>
                        <Text style={styles.incrementtextStyle}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
              
            </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
      
            <View>
            <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginVertical: 20,
                      height: 80,
                      elevation: 15,
                      backgroundColor: COLORS.white,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: '#333', fontSize: 20, paddingLeft: 15}}>
                      Total Price:
                    </Text>
                    <Text
                      style={{
                        color: 'crimson',
                        fontSize: 22,
                        paddingRight: 15,
                        fontWeight: '700',
                      }}>
                      Rs. {totalPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      width:"100%",
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:COLORS.primary,
                        height:33,
                        width: 150,
                        marginLeft: 170,
                        elevation: 8,
                        borderRadius: 10,
      
                      }}
                      onPress={() => navigation.navigate('Order')}>
                      <Text style={styles.checkouttextStyle}>
                        Go to Checkout
                      </Text>
                    </TouchableOpacity>
                  </View>
                
            </View>
            
            
            </View>
            
            
      
            
      
              ):(
            
              <View
                style={{
                  height: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
                  Your cart is empty 😢
                </Text>
              </View>
              )}
            
            
          </SafeAreaView>
          
          )
  
    
   
    
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImg: {
    flex : 1,
    position : 'absolute',
    width : "100%",
    height: '100%',
    justifyContent: 'center'
  },
  bottomContainer: {
    marginTop: "52%",
    height: "90%",
    width: 400,
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: 'center'
  },
  profile:{
    height: 120,
    width: 120,
    borderRadius: 25,
    bottom: "10%",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    bottom: "8%"

  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  btnStyle: {
    height: 40,
    width: 100,
    backgroundColor: COLORS.primary,
    borderColor:"white",
    borderWidth: 3,
    borderRadius: 5, 
    bottom: "8%"
  },
  btntext:{
    color: "white",
    fontWeight:"bold", 
      fontSize:16,
      padding:4, 
      textAlign:"center"
  },
  header: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop:20
    
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 40,
    height: 40,
    marginLeft:70,
    marginBottom:7,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
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
  checkouttextStyle:{
    color:COLORS.white, 
    fontSize:15,
    padding:4, 
    textAlign:"center"
  },
  });
  export default Cart;

