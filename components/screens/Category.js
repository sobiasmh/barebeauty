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
                    
                     <View>
                      <Text style={styles.text4}>Categories</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFDBA4',
                        width: 160,
                        height: 160,
                        padding:19,
                        marginRight:10,
                        borderRadius: 12,
                        marginBottom: 20,
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Face"})}>

                      <View>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            height: 100,
                            width: 100,
                            borderRadius:50
                          }}
                          source={{uri: 'https://i.pinimg.com/736x/5d/66/d2/5d66d2a48f7b07ce84c3e5904ec68e51.jpg'}}
                        />
                      </View>
                      <View>
                        <Text style={styles.text}>Face</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#905E96',
                        width: 160,
                        height: 160,
                        padding:19,
                        marginRight:10,
                        borderRadius: 12,
                        marginBottom: 20,
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Eyes"})}>

                      <View>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            height: 100,
                            width: 100,
                            borderRadius:50
                          }}
                          source={{uri: 'https://cocorubyskin.com.au/wp-content/uploads/2016/09/middle-eastern-eye-makeup.jpg'}}
                        />
                      </View>
                      <View>
                        <Text style={styles.text}>Eyes</Text>
                      </View>
                    </TouchableOpacity>
                    </View>


                      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#8267BE',
                        width: 160,
                        height: 160,
                        padding:19,
                        marginRight:10,
                        borderRadius: 12,
                        marginBottom: 20,
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Lips"})}>

                      <View>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            height: 100,
                            width: 100,
                            borderRadius:50
                          }}
                          source={{uri: 'https://images.ctfassets.net/wlke2cbybljx/74ujAaQLh4pz64a6hM7gN4/85227282d4f00b281029d093ad300276/featuredimage_-_PT_ORIGINAL_LIGHT_SKIN_FINAL_copy_resized_1x1.jpg?fm=jpg'}}
                        />
                      </View>
                      <View>
                        <Text style={styles.text}>Lips</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#A2B38B',
                        width: 160,
                        height: 160,
                        padding:19,
                        marginRight:10,
                        borderRadius: 12,
                        marginBottom: 20,
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate('AllMakeup', {n:"Skin Care"})}>

                      <View>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            height: 100,
                            width: 100,
                            borderRadius:50
                          }}
                          source={{uri: 'https://i.ytimg.com/vi/IILoSS_-Skc/maxresdefault.jpg'}}
                        />
                      </View>
                      <View>
                        <Text style={styles.text}>Skin Care</Text>
                      </View>
                    </TouchableOpacity>
                   
                    </View>



                    <View>
                      <Text style={styles.text4}>Brands</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#8267BE',
                        margin:10
                        }}
                       onPress={() => navigation.navigate('AllMakeup', { n: 'Mayeblline' })}>
            
                        <View>
                          <Image
                            style={{
                              resizeMode: 'cover',
                              height: 120,
                              width: "100%",
                            }}
                            source={{uri: 'https://allurebeauty.pk/pub/media/catalog/category/Maybelline.jpg'}}
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                      style={{
                        backgroundColor: '#8267BE',
                        margin:10

                        }}
                       onPress={() => navigation.navigate('AllMakeup', { n: 'Elf' })}>
            
                        <View>
                          <Image
                            style={{
                              resizeMode: 'cover',
                              height: 120,
                              width: "100%",
                            }}
                            source={{uri: 'https://static.wixstatic.com/media/774745_781c3dbd201b4bd29afb54aa4b522fd9~mv2.jpeg/v1/crop/x_0,y_0,w_1918,h_630/fill/w_976,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/989340.jpeg'}}
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                      style={{
                        backgroundColor: '#8267BE',
                        margin:10

                        }}
                       onPress={() => navigation.navigate('AllMakeup', { n: 'Loreal' })}>
            
                        <View>
                          <Image
                            style={{
                              resizeMode: 'cover',
                              height: 120,
                              width: "100%",
                            }}
                            source={{uri: 'https://www.makeup.co.nz/images/349590/loreal-article-banner.jpg'}}
                          />
                        </View>
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
        fontSize: 24,
        textAlign: 'center',
        padding:3

      },
      
      text4: {
        fontSize: 24,
        marginLeft: 14,
        textAlign: "left",
        fontWeight: "bold",
        marginTop: 10,
      },
  });
  
