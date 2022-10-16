import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput,Text, View ,ImageBackground, TouchableOpacity,ScrollView,Image,FlatList} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from '../const/categories';
import AllMakeup from './AllMakeup';
import Category from './Category';
export default ({ navigation }) => {

  const Tab = createMaterialTopTabNavigator();

  

        return(
          
          <Tab.Navigator
        
          screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarLabelStyle: {
              fontSize: 15,
              color: COLORS.primary,
            },
            tabBarItemStyle: { height: 60 },
            tabBarStyle: { backgroundColor: COLORS.lightprimary , margin:20, borderRadius:6, marginTop:40},
            tabBarIndicatorStyle: { backgroundColor: COLORS.primary, height: 3 },
            swipeEnabled: true}}>
          <Tab.Screen name="Category" component={Category}  />
          <Tab.Screen name="AllMakeup" component={AllMakeup} />



        </Tab.Navigator>
          )
  
    
   
    
  
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
  });
  
