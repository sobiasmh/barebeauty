import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput,Text, View ,ImageBackground, TouchableOpacity,ScrollView,Image,FlatList} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from '../const/categories';


export default ({ navigation }) => {
 
  
        return(
          
                <View style={styles.container}>
                  <ScrollView
                  showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#8267BE',
                        width: 299,
                        height: 100,
                        borderRadius: 12,
                        marginBottom: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Face"})}>
                      <View>
                        <Text style={styles.text}>Face</Text>
                      </View>
                      <View>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            height: 100,
                            width: 100,
                            marginLeft: 100,
                            marginTop: 9,
                          }}
                          source={{uri: 'https://cdn-icons-png.flaticon.com/512/1940/1940922.png'}}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#A3E4DB',
                        width: 299,
                        height: 100,
                        borderRadius: 12,
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Lips"})}>
                      <View>
                        <Text style={styles.text}>Lips</Text>
                      </View>
                      <Image
                        style={{
                          resizeMode: 'cover',
                          height: 100,
                          width: 100,
                          marginLeft: 100,
                          marginTop: 9,
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/2798/2798018.png',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#F999B7',
                        width: 299,
                        height: 100,
                        borderRadius: 12,
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Eyes"})}>
                      <View>
                        <Text style={styles.text}>Eyes</Text>
                      </View>
                      <Image
                        style={{
                          resizeMode: 'cover',
                          height: 100,
                          width: 100,
                          marginLeft: 100,
                          marginTop: 9,
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/3163/3163195.png',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#2C272E',
                        width: 299,
                        height: 100,
                        borderRadius: 12,
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Skincare"})}>
                      <View>
                        <Text style={styles.text}>Skin</Text>
                      </View>
                      <Image
                        style={{
                          resizeMode: 'cover',
                          height: 100,
                          width: 100,
                          marginLeft: 100,
                          marginTop: 9,
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/3501/3501241.png',
                        }}
                      />
                    </TouchableOpacity>
                  </ScrollView>
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
        color: 'white',
        fontWeight: 'bold',
        fontSize: 27,
        margin: 15,
      },
      inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: "#E5E5E5",
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      carts: {
        backgroundColor:"#f5dfe6",
        borderRadius:10,
        width: 147,
        height: 190,
        margin: 12,
        padding: 5,
        
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        flexBasis: '50%',
      },
      productImg: {
        resizeMode: 'cover',
        height: 100,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 8,
      },
      prdtext1: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 9,
        marginLeft: 9,
      },
      prdtext2: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 9,
        marginLeft: 9,
      },
  });
  
