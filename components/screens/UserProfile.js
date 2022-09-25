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
import Cart from './Cart';
import CartOrder from './CartOrder';


export default ({ navigation }) => {
  

  const dispatch = useDispatch();
  const {wishlistData, error} = useSelector(state => state.wishList);
  const {cartData} = useSelector(state => state.cart);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getWishList());
    dispatch(getCart());
  }, []);
      
  const UserProf = (props) =>{
    const {user} = useSelector(state => state.user);


    return(
      <SafeAreaView style={styles.container}>
      <Image style ={styles.bgImg} source={{
        uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg"
      }}/>
      <View style={styles.bottomContainer}>
      <Image style ={styles.profile} source={{
        uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg"
      }}/>
      <Text style={styles.name}>{user? user.name: ""}</Text>
      <View style={styles.row}>
        <TouchableOpacity
        style={styles.btnStyle}
        onPress={()=>{}}>
          <Text style={styles.btntext}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.btnStyle}
        onPress={()=>{
          
        }}>
        
          <Text style={styles.btntext}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
     


      
      </SafeAreaView>
    )
  }
  
  const Wishlist = () =>{
      
    
    
  
    return(
      <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
         
      <View style={styles.header}>
        <Icon name="heart" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 25, fontWeight: 'bold'}}> Wishlist</Text>
      </View>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={()=>{console.log("yohvhftd")}}>
          <Text style={styles.btntext}>Message</Text>
        </TouchableOpacity>
      
        {wishlistData?.length > 0 ? (
                <View>

        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={wishlistData}
        renderItem={({item}) => {
          return(
          <View style={styles.cartCard}>
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
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <View>
          <TouchableOpacity
        style={styles.actionBtn}
        onPress={()=>{
          console.log("uuughb")
        }}>
            <Icon name="alpha-x-circle" size={25} style = {{padding : 10}} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>

        ):(
      
        <View
          style={{
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
            Your wishList is empty 😢
          </Text>
        </View>
        )}
      
      
      
    </SafeAreaView>
    )
  }


  
 
  const Drawer = createDrawerNavigator();

        return(
          <Drawer.Navigator initialRouteName="UserProf"
          drawerContent={props => <CustomDrawer {...props} />}

          screenOptions={{
            drawerActiveTintColor:COLORS.primary,
            drawerStyle: {
              backgroundColor:COLORS.white,
              width: 240,
              
            },
          }}>
            <Drawer.Screen name="UserProf" 

            component={UserProf}
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                   name="account"
                   size={size}
                   color={focused ? COLORS.primary : '#ccc'}
                />
             ),
              headerStyle: {
                backgroundColor: COLORS.primary
              },
              headerShown: false,
              headerTintColor: 'white',
              drawerLabel: 'Profile',
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <Icon.Button
                    name="account-edit"
                    size={25}
                    color='white'
                    backgroundColor= {COLORS.primary}
                    onPress={() => {}}
                  />  
                           
                </View>
                
              ),
            }} />
            <Drawer.Screen name="Wishlist" 

            component={Wishlist} 
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                   name="heart"
                   size={size}
                   color={focused ? COLORS.primary : '#ccc'}
                />
             ),
              
              headerShown: false,
              headerTintColor: 'white',
              drawerLabel: 'Wishlist'
            }}
            />
            <Drawer.Screen name="Cart" 

            component={CartOrder} 
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                   name="cart"
                   size={size}
                   color={focused ? COLORS.primary : '#ccc'}
                />
             ),
              
              headerShown: false,
              headerTintColor: 'white',
              drawerLabel: 'Your Cart'
            }}
            />
             
          </Drawer.Navigator>
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
  
