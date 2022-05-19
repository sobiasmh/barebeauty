import React, { useState } from 'react';
import { StyleSheet, Text,TextInput, View ,ImageBackground, TouchableOpacity, ScrollView} from 'react-native';


import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { set } from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';

export default ({ navigation }) => {
    const[getEnteredemail, setEntereredemail] = useState("")
    const[getPass, setPass] = useState("")
    const[getfirstname, setfirstname] = useState("")
    const[getlastname, setlastname] = useState("")
    const[getemail, setemail] = useState("")
    const[getPassword, setPassword] = useState("")

    const Stack = createStackNavigator();

    const StartScreen = () =>{
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
                onChangeText={(getEnteredemail) =>
                  setEntereredemail(getEnteredemail)
                }
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
                onChangeText={(getPass) =>
                  setPass(getPass)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
              />
            </View>
            <View style={{flexDirection:'row-reverse', paddingRight:10}}>
                <Text
                style={styles.passTextStyle}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    Forgot Password?
                </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={()=>{}}>
              <Text style={styles.buttonTextStyle}>Sign In</Text>
            </TouchableOpacity>
            <View style={{alignContent:'center'}}>
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

    const ForgotPasswordScreen = () =>{
        return(
          <View style={styles.container}>
          <Text style={styles.text}>Change Password</Text>

          <View style={{ width: '95%' }}>  
          
        <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={() =>
                  {}
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
            onChangeText={() =>
              {}
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
            onChangeText={() =>
              {}
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
            onChangeText={() =>
              {}
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
          onPress={()=>{}}>
          <Text style={styles.buttonTextStyle}>Apply Changes</Text>
        </TouchableOpacity>
        
          </View>
        </View>
        )
    }
    const RegisterScreen = () =>{
        return(
          <View style={styles.container}>
          <Text style={styles.text}>Create an Account</Text>

          <View style={{ width: '95%' }}>  
          <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(getfirstname) =>
              setfirstname(getfirstname)
            }
            placeholder="Enter Firstname" 
            placeholderTextColor="#8b9cb5"
            underlineColorAndroid="#f000"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(getlastname) =>
              setlastname(getlastname)
            }
            placeholder="Enter Lastname" 
            placeholderTextColor="#8b9cb5"
            underlineColorAndroid="#f000"
          />
        </View>
        <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(getemail) =>
                  setemail(getemail)
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
            onChangeText={() =>
              {}
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
          onPress={()=>{}}>
          <Text style={styles.buttonTextStyle}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{alignContent:'center'}}>
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

  
        return(
            <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
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
      alignItems:"center",  
    },
    
    backimg:{
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
      marginTop:15,
      fontSize: 35,
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
        marginRight:22,
        textDecorationLine:'underline'
      }
      
  });
  
