import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';


import profile from './profile';
import UserProfile from './UserProfile';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default ({ navigation }) => {
    const Stack = createStackNavigator();

 
  
        return(
            <Stack.Navigator
            screenOptions={{headerShown: false}}
              >
                      <Stack.Screen name="StartScreen" component={profile} />
                      <Stack.Screen name="UserProfile" component={UserProfile} />
      
              
              
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
  
