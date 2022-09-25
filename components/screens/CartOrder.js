import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import OrderSteps from './OrderSteps';
import Order from './Order';


export default ({ navigation }) => {
    const Stack = createStackNavigator();

 
  
        return(
            <Stack.Navigator
            screenOptions={{headerShown: false}}
              >
                      <Stack.Screen name="Cart" component={Cart} />
                      <Stack.Screen name="OrderSteps" component={OrderSteps} />
                      <Stack.Screen name="Order" component={Order} />

              
              
            </Stack.Navigator>
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
      color: "white",
      fontSize: 60,
      marginTop: 415,
      marginLeft: 30,
      fontWeight: "bold",
      textAlign: "left",
    },
    text2: {
      color: "white",
      fontSize: 20,
      marginLeft: 30,
      textAlign: "left",
    }
  });
  