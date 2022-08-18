import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

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

//Context
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from '../../context/actions/auth_actions';


export default ({ navigation }) => {




  const Stack = createStackNavigator();

  const StartScreen = (props) => {
    const context = useContext(AuthGlobal)
    const [getuseremail, setuseremail] = useState("")
    const [getuserPassword, setuserPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {

      if (context.stateUser.isAuthenticated === true) {
        props.navigation.navigate("UserProfile")
      }

    }, [context.stateUser.isAuthenticated])


    const handleSubmit = () => {
      const user = {
        getuseremail,
        getuserPassword
      }
      if (getuseremail === "" || getuserPassword === "") {
        setError("Please fill in your credentials")
      }
      else {
        loginUser(user, context.dispatch)
      }
    }


    return (
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
  }

  const ForgotPasswordScreen = () => {
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
    const [getname, setname] = useState("")
    const [getemail, setemail] = useState("")
    const [getPassword, setPassword] = useState("")
    const [getPhonenumber, setPhonenumber] = useState("")
    const [error, setError] = useState("")

    const register = () => {
      if (getname === '' || getemail === '' || getPassword === '' || getPhonenumber === '') {
        setError('Please fill in the form correctly')
      }
      else {
        let user = {
          userName: getname,
          userEmail: getemail,
          userPassword: getPassword,
          userPhoneNumber: getPhonenumber,
          Role: 'user'
        };

        axios.post(`${baseURL}users/register`, user).then((res) => {
          if (res.status == 201) {
            console.log("hello")
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

        })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again"
            });

          });
      };
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
          <View>
            {error ? <Error message={error} /> : null}
          </View>


          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => { register() }}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{ alignContent: 'center' }}>
            <Text
              style={styles.passTextStyle}
              onPress={() => navigation.navigate('StartScreen')}>
              Already have an Account? Sign in
            </Text>
          </View>
        </View>
      </View>
    )
  }


  const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg" };


  return (
    <Stack.Navigator initialRouteName="StartScreen">
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
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 40,
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
    height: 40,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  passTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    marginRight: 22,
    textDecorationLine: 'underline'
  }

});

