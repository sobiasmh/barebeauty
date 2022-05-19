import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


export default ({ navigation }) => {
 
  
        return(
            <View style={styles.container}>
              <View>
            <Text style={styles.text}>BareBeauty.</Text>
            </View>
            <View>
            <Text style={styles.text2}>BareBeauty.</Text>
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
  
