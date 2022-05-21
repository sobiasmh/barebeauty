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
                          source={{uri: 'https://cdn-icons.flaticon.com/png/512/1807/premium/1807363.png?token=exp=1641395761~hmac=6a69b4fe5c6246448c45248ef9251438'}}
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
                      onPress={() => navigation.navigate('AllMakeup')}>
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
                          uri: 'https://cdn-icons.flaticon.com/png/512/2975/premium/2975771.png?token=exp=1641395750~hmac=5178dc8f91076fbbab1b2bab911a9d03',
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
                      onPress={() => navigation.navigate('AllMakeup')}>
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
                      onPress={() => navigation.navigate('AllMakeup')}>
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
                          uri: 'https://cdn-icons.flaticon.com/png/512/1807/premium/1807383.png?token=exp=1641395758~hmac=cd735b823af1fa728225500133d35683',
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
  
