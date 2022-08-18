import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,TextInput, View ,ImageBackground, TouchableOpacity,ScrollView, Image,FlatList, SafeAreaView} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from '../const/categories';
import { color } from 'react-native-reanimated';
import prod from '../const/prod';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';

export default ({ navigation }) => {
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = React.useState(0);

  const [search, setSearch] = useState('');
  const [filtered, setFilterted] = useState('');
  const [listings, setlistings] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}products`)
    .then((res)=>{
      console.log(res.data);
      setlistings(res.data);
    })
    return()=>{
      setlistings([])
    };
  }, []);

  const updateSearch = (search) => {
    const d = categories.filter((item) => {
      return item.name.match(search);
    });

    setSearch(search);
    setFilterted(d);
  };
  
  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}>
          
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>{
             setSelectedCategoryIndex(index)
             setSelectedCategoryName(category.name)}}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.lightprimary,
                ...styles.categoryBtn,
              }}>
              <View style={styles.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: 'cover' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
 const Popular = () =>{
   return(
    <FlatList
    style={{ marginBottom: 80, width: '100%' }}
    data={filtered.length > 0 ? filtered : listings}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => {
      return (
        <View style={styles.row}>
          <View style={styles.carts}>
            <Image
              style={styles.productImg}
              source={{uri: item.Img}}
            />
            <View>
              <Text style={styles.prdtext1}>{item.Title}</Text>
            </View>
            
          </View>
        </View>
      );
    }}
    keyExtractor={(item, index) => index.toString()}
  />
   )
 }
 
  
        return(
    <SafeAreaView style={styles.container}>
              <View>
            <Text style={styles.text}>BareBeauty.</Text>
            </View>
            <View>
            <Text style={styles.text2}>Product of your choice.</Text>
            </View>
            <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={styles.inputContainer}>
          <Icon 
          name="search" 
          size={28} 
                        />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for food"
            onChangeText={updateSearch}

          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
            <Text style={styles.text4}>Makeup Here</Text>
            </View>
        <ListCategories />
        
        <View>
            <Text style={styles.text3}>Popular Products</Text>
            </View>
           <Popular/>
    </SafeAreaView>
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
      color:COLORS.primary,
      marginTop: 50,
      fontSize: 30,
      marginRight: 150,
      fontWeight: "bold",
      textAlign: "left",
    },
    text2: {
      color: "grey",
      fontSize: 15,
      marginRight: 150,
      textAlign: "left",
    },
    text3: {
      fontSize: 20,
      marginRight: 150,
      textAlign: "left",
      fontWeight:"bold",
      
    },
    text4: {
      fontSize: 20,
      marginRight: 190,
      textAlign: "left",
      fontWeight:"bold",
      marginTop:10
    },
    inputContainer: {
      flex: 1,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: "#E5E5E5",
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop:0
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
    categoriesListContainer: {
      
      paddingVertical: 20,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    categoryBtn: {
      height: 45,
      width: 120,
      marginRight: 7,
      borderRadius: 30,
      alignItems: 'center',
      paddingHorizontal: 5,
      flexDirection: 'row',
    },
    categoryBtnImgCon: {
      height: 35,
      width: 35,
      backgroundColor: COLORS.white,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    carts: {
      backgroundColor: COLORS.lightprimary,
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
      height: 130,
      width: 130,
      borderRadius:15,
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
  
