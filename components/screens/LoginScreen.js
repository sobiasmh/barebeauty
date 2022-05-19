import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


export default ({ navigation }) => {
 
    const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/fa0c25119217391.60993ce2a3cc6.jpg" };
  
    return(
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View>
        <ImageBackground source={image} resizeMode="cover" style={styles.backimg}>
        <View style={{flexDirection: 'column'}}>
          <View>
        <Text style={styles.text}>BareBeauty</Text>
        </View>
        <View>
        <Text style={styles.text2}>Hey girl, do you want some amazing makeup?</Text>
        </View>
        <View>
        <TouchableOpacity
                            style={{
                              backgroundColor: '#815bcf',
                              width: 100,
                              height: 70,
                              borderRadius: 8,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 49,
                              alignSelf: "flex-end",
                              activeOpacity:0.8,
                              
                            }}
                            onPress={() => {
                              navigation.navigate('Home', {
                              });
                            }}>
                                          <Icon name="angle-double-right" color='white' size={36} />

                          </TouchableOpacity>
        </View>

        </View>
      </ImageBackground>
  
        </View>
        
      </View>
  
    
   
    
  );
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
      width: 400,

  
    },
    text: {
      color: "white",
      fontSize: 58,
      marginTop: 445,
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
  