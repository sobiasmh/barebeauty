import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from '../const/categories';
import { SliderBox } from 'react-native-image-slider-box';

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
      .then((res) => {
        console.log(res.data);
        setlistings(res.data);
      })
    return () => {
      setlistings([])
    };
  }, []);

  const updateSearch = (search) => {
    const d = listings.filter((item) => {
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
            onPress={() => {
              setSelectedCategoryIndex(index)
              setSelectedCategoryName(category.name)
            }}>
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
                  style={{ height: 35, width: 35, resizeMode: 'cover', borderRadius:50 }}
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
  const Popular = () => {
    return (
      <FlatList
        style={{ width: '100%' }}
        data={filtered.length > 0 ? filtered : listings}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <View style={styles.carts}>
                <Image
                  style={styles.productImg}
                  source={{ uri: "https://www.vegas.pk/btPublic/bt-uploads/large/nyx-stay-matte-but-not-flat-liquid-foundation.jpg" }}
                />
                <View>
                  <Text style={styles.prdtext1}>{item.name}</Text>
                </View>

              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  const SliderView = () => {
    const [getImage, setImage] = useState([
      'https://seventury.com/wp-content/uploads/2016/08/banner-maybelline.png',
      'https://media.ourfashionpassion.com/wp-content/uploads/2022/08/28053418/Loreal-Make-up-Main-banner_1122x400.jpg',
      'https://mir-s3-cdn-cf.behance.net/projects/404/bb1850144788885.Y3JvcCwxMTUwLDkwMCwyNSww.jpg',
      'https://missroseonline.pk/wp-content/uploads/2022/02/deal-07-1.png'
    ]);
    return (
      <View style={{ height: "30%", paddingVertical: 5 }}>
        <SliderBox
          images={getImage}
          sliderBoxHeight={200}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor={COLORS.primary}
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={10}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: 'absolute',
            paddingHorizontal: 10,
            bottom: 0,
            padding: 0,
            marginRight: 100,
            height: "100%",
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          ImageComponentStyle={{ borderRadius: 15, width: '90%', marginTop: 5 }}
          imageLoadingColor="#2196F3"
        />
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width:"98%"}}>
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
            placeholder="Search for Makeup"
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
        <Text style={styles.text4}>Brands Available</Text>
      </View>

      <SliderView />

      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Text style={styles.text3}>Popular Products</Text>
        <Text style={styles.text5}
          onPress={() => navigation.navigate('Shop')}>
          (View All)</Text>

      </View>
      <Popular />
      </ScrollView>
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
    color: COLORS.primary,
    marginTop: 50,
    fontSize: 30,
    marginLeft: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  text2: {
    color: "grey",
    fontSize: 15,
    marginLeft: 14,
    textAlign: "left",
  },
  text3: {
    fontSize: 20,
    marginLeft: 14,
    textAlign: "left",
    fontWeight: "bold",


  },
  text4: {
    fontSize: 20,
    marginLeft: 14,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
  },
  text5: {
    fontSize: 13,
    marginRight: 10,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 3,
    padding:4,
    color: COLORS.primary
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: "#E5E5E5",
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 0
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

    alignItems: 'center',
    paddingHorizontal: 2,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    paddingVertical: 2,
    margin: 9
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
    borderRadius: 10,
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
    borderRadius: 15,
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

