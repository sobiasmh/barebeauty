import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, TouchableOpacity, ScrollView,SafeAreaView } from 'react-native';

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



  const Stack = createStackNavigator();
  const StartPage = (props)=>{
    const image = {
      uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d59ded149741425.62ecc1e8b329d.jpg',
    };
  
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{ height: 700,
              width: 400,}}>
            <View style={{ flexDirection: 'column' }}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 38,
                    marginTop: 430,
                    marginLeft: 30,
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}>
                  Let's Get Started
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 19,
                    marginLeft: 30,
                    textAlign: 'left',
                  }}>
                  Register now to experience the world of beauty and shop amazing makeup
                  products!
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F2357B',
                    color: '#FFFFFF',
                    borderColor: '#c21b59',
                    height: 45,
                    width: 120,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginTop: 35,
                    marginBottom: 25,
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    props.navigation.navigate('StartScreen')
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      alignItems: 'center',
                      padding: 9,
                      marginLeft: 19,
                      fontSize: 15,
                    }}>
                    Login In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fffffff',
                    color: '#FFFFFF',
                    borderColor: '#c21b59',
                    height: 45,
                    width: 120,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginTop: 35,
                    marginBottom: 25,
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate('RegisterScreen')
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      alignItems: 'center',
                      padding: 9,
                      marginLeft: 19,
                      fontSize: 15,
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }

  const StartScreen = (props) => {
    const image = {
      uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/28811c125493255.611a9f54dc464.jpg',
    };
    const [email, setuseremail] = useState("")
    const [password, setuserPassword] = useState("")
    const {error, isAuthenticated} = useSelector(state => state.user);

     const handleSubmit = () => {
      dispatch(userLogin(email, password));
    }
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
  

   


    return (
      <View style={styles.container}>
        <ImageBackground
            source={require('../../assets/sketch.png')}
            resizeMode="cover"
            style={{alignSelf:"stretch", flex:1, width:null, height:null }}>
            <View style={{marginTop:80}}>
        <View>
        <Text style={{marginTop: 15,
    fontSize: 32,
    fontWeight: "bold",
    marginRight:100,
    marginLeft:30
  }}>It's you again.</Text>
        <Text style={{
          marginTop: 15,
          fontSize: 15,
          marginRight:100,
          marginLeft:30,
          color:"grey"
        }}>Welcome back! Please login to continue.</Text>
       
</View>

        <View style={{ width: '100%' }}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={setuseremail}
              placeholder="Email address"
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
              placeholder="Password" //12345
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
            <Text style={styles.buttonTextStyle}>Log In</Text>
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
        </ImageBackground>
      </View>
    )
  }

  const ForgotPasswordScreen = () => {
    const {loading, error, message} = useSelector(state => state.forgotPassword);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Change Password</Text>

        <View style={{ width: '95%' }}>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={() => { }
}
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"

              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={() => { }
              }
              placeholder="Enter Current Password" //12345
              placeholderTextColor="#8b9cb5"
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={() => { }
              }
              placeholder="Enter New Password" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={() => { }
              }
              placeholder="Confirm Password" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => { }}>
            <Text style={styles.buttonTextStyle}>Apply Changes</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  const RegisterScreen = (props) => {

    const {error} = useSelector(state => state.user);

    const [getname, setname] = useState("")
    const [getemail, setemail] = useState("")
    const [getPassword, setPassword] = useState("")
    const [getPhonenumber, setPhonenumber] = useState("")

    useEffect(() => {
      if (error) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: 'Something went wrong',
          text2: "."
        });

      }         
       
      
    }, [dispatch, error]);
  
    


    const registerUser = () => {
     
        dispatch(register(getname, getemail, getPassword));
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "You're Successfully Registered",
          text2: "Please Login into your account",
        });
        setTimeout(() => {
          props.navigation.navigate('StartScreen');
        }, 500);
       
      
    }
 
       
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create an Account</Text>

        <View style={{ width: '95%' }}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(getname) =>
                setname(getname)
              }
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              underlineColorAndroid="#f000"
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={setemail}
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"

              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(getPhonenumber) =>
                setPhonenumber(getPhonenumber)
              }
              placeholder="Enter Phonenumber" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(getPassword) =>
                setPassword(getPassword)
              }
              placeholder="Enter Password" //12345
              placeholderTextColor="#8b9cb5"
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          
          
          <View>
            {error ? <Error message={error} /> : null}
          </View>


          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => { registerUser() }}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{ alignContent: 'center' }}>
            <Text
              style={styles.passTextStyle}
              onPress={() => props.navigation.navigate('StartScreen')}>
              Already have an Account? Sign in
            </Text>
          </View>
        </View>
      </View>
    )
  }


  const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg" };


  return (
    <Stack.Navigator initialRouteName="StartPage">
    <Stack.Screen
    name="StartPage"
    component={StartPage}
    options={{ headerShown: false }}
  />
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: 'Forgot Password', //Set Header Title
          headerStyle: {
            backgroundColor: COLORS.primary, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: COLORS.primary, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
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
  },
  circle: {
    height: 150,
    width: 150,
    alignItems: "center",
  },

  backimg: {
    height: 150,
    width: 150,
  },
  text: {
    fontSize: 25,
    marginRight: 70,
    fontWeight: "bold",
    textAlign: "left",
  },
  text2: {
    color: "white",
    fontSize: 20,
    marginLeft: 30,
    textAlign: "left",
  },
  text3: {
    marginTop: 15,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
  },
  text4: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius:10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    
  },

  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    borderRadius:10,
    height: 45,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  passTextStyle: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    marginRight: 22,
    textDecorationLine: 'underline'
  }

});

