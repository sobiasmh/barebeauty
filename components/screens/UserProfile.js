import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from '../../context/actions/auth_actions';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import profile from './profile';

export default ({ navigation }) => {

  const UserProf = (props) =>{
    const context = useContext(AuthGlobal)
    const [userProfile, setuserProfile] = useState()

    useEffect(()=>{
      if(context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null){
          props.navigation.navigate('StartScreen')
        }

        AsyncStorage.getItem("jwt")
        .then((res)=>{
          axios.get(`${baseURL}users/${context.stateUser.user.sub}`,{
            headers: { Authorization: `Bearer ${res}`},
          })
          .then((user)=> setuserProfile(user.data))
        })
        .catch((error)=> console.log(error))

        return () =>{
          setuserProfile();
        }
    }, [context.stateUser.isAuthenticated])


    return(
      <View style={styles.container}>
        <Text>Hi ur profile {console.log(userProfile)}</Text>
        <Text>{userProfile? userProfile[0].userName : "No"}</Text>
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch)
             }}>
            <Text style={styles.buttonTextStyle}>Sign Out</Text>
          </TouchableOpacity>
      </View>
    )
  }
  const Wishlist = () =>{
    return(
      <View style={styles.container}>
        
      </View>
    )
  }
 
  const Drawer = createDrawerNavigator();

        return(
          <Drawer.Navigator initialRouteName="UserProf">
            <Drawer.Screen name="UserProf" component={UserProf} />
            <Drawer.Screen name="Wishlist" component={Wishlist} />
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
  
