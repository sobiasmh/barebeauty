import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';



const Cart = ({ navigation }) => {
 
  
        return(
            <View style={styles.container}>
              <Text>Watch</Text>
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
  export default Cart;

