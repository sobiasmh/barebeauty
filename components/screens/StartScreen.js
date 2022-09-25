import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { set } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import Error from '../const/error';
import UserProfile from './UserProfile';
import {useDispatch, useSelector} from 'react-redux';

import {
  userLogin, register

} from '../../Redux/Actions/UserAction';


export default ({ navigation }) => {
  const dispatch = useDispatch();
  const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg" };

  const [email, setuseremail] = useState("")
    const [password, setuserPassword] = useState("")
    const {error, isAuthenticated} = useSelector(state => state.user);

    useEffect(() => {
      if (error) {

        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again"
        });
      }
      if (isAuthenticated) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "You're Successfully Logged In",
          text2: ".",
        });
        props.navigation.navigate("UserProfile")
      }
    }, [dispatch, error, isAuthenticated]);
  

    const handleSubmit = () => {

      dispatch(userLogin(email, password));
    }
        return(
          <View style={styles.container}>
          <View style={styles.circle}>
            <ImageBackground source={image} resizeMode="cover" style={styles.backimg}>
            </ImageBackground>
          </View>
          <Text style={styles.text3}>BareBeauty.</Text>
  
          <View style={{ width: '100%' }}>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setuseremail}
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
  
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setuserPassword}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
              />
            </View>
            <View>
              {error ? <Error message={error} /> : null}
            </View>
            <View style={{ flexDirection: 'row-reverse', paddingRight: 10 }}>
              <Text
                style={styles.passTextStyle}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                Forgot Password?
              </Text>
            </View>
  
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => { handleSubmit() }}>
              <Text style={styles.buttonTextStyle}>Sign In</Text>
            </TouchableOpacity>
            <View style={{ alignContent: 'center' }}>
              <Text
                style={styles.passTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                Don't have an Account? Register Now
              </Text>
            </View>
          </View>
        </View>
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