import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, TextInput, Text, View, ImageBackground, Pressable, TouchableOpacity,ActivityIndicator,  ScrollView, Image, FlatList, Modal,Button } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import prod from '../const/prod';
import Toast from 'react-native-toast-message';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import categories from '../const/categories';


import {
  addWishList, removeWishList, addCart, getCart, getWishList

} from '../../Redux/Actions/ProductAction';

export default ({ navigation, route }) => {

  const [selectedCategoryName, setSelectedCategoryName] = React.useState(0);
 


  const Stack = createStackNavigator();

  const { n } = route.params != undefined ? route.params : {}
  const dispatch = useDispatch();


  const MakeupStore = ({ route }) => {
    const [getcondition, setcondition] = useState(true);

    const [listings, setlistings] = useState([]);
  
    useEffect(() => {
      axios.get(`${baseURL}products`)
        .then((res) => {
          console.log(res.data);
          setlistings(res.data);
          setcondition(false);
          setsortprice(false)
          sethighprice(false)
  
        })
        dispatch(getWishList());
      return () => {
        setlistings([])
      };
      
    }, [getcondition]);
    const [search, setSearch] = useState('');
    const [filtered, setFilterted] = useState('');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = React.useState(0);
    const [getmodalvisible, setModalVisible] = React.useState(false);
    const [sortprice, setsortprice] = useState(false)
    const [highprice, sethighprice] = useState(false)
    const [close, setclose]  = useState(false)
    const updateSearch = (search) => {
      const d = listings.filter((item) => {
        return item.name.match(search);
      });

      setSearch(search);
      setFilterted(d);
    };

    if (getcondition) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <ActivityIndicator animating={true} color={COLORS.primary} />
    
          <Text>Loading..</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Modal animationType="fade" visible={getmodalvisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
               
                
                <View>
                  <Pressable
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 7,
                    }}
                    onPress={() => {
                      setsortprice(true)
                      setModalVisible(false)
                      sethighprice(false)
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                       Price Low to High

                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 7,
                    }}
                    onPress={() => {
                      sethighprice(true)
                      setModalVisible(false)
                      setsortprice(false)

                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                       Price High to Low

                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 7,
                    }}
                    onPress={() => {
                      setclose(true)
                      setModalVisible(false)
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      Go Back
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 7,
                    }}
                    onPress={() => {
                      setModalVisible(false)
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      Go Back
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        <View
          style={{
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
              onChangeText={(search) => updateSearch(search)}
              value={search}

            />
            <Icon
              name="cancel"
              size={20}
              onPress={() => {
                setSearch('')
                setFilterted('')
              }}
            />
          </View>
          <View style={styles.sortBtn}>
            <Icon name="tune" size={28} color={COLORS.white} onPress={()=>{setModalVisible(true)}} />
          </View>
        </View>

        <View style={{ height: "15%" }}>
          
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
                  console.log(category.name)
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
                      style={{ height: 35, width: 35, resizeMode: 'cover', borderRadius: 50 }}
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
        </View>
        {/* && (sortprice===true && listings? listings.sort((i, j)=>i.price>j.price): listings)
             || (highprice===true && listings? listings.sort((i, j)=>i.price<j.price): listings)) */}
        <View style={{ flex: 1}}>
          <FlatList
            data={filtered.length > 0 ? filtered : listings && listings
              ? listings.filter((item) => (item.brand.match(n) || item.category.match(n) || item.category.match(selectedCategoryName)))
              : null && close? listings:listings
              && (sortprice===true && listings? listings.sort((i, j)=>i.price>j.price): listings
             || highprice===true && listings? listings.sort((i, j)=>i.price<j.price): listings)
              }
            numColumns={2}
            extraData={listings}
            columnWrapperStyle={{ flexWrap: 'wrap' }}

            
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.row}>

                  <View style={styles.carts}>
                    <Image
                      style={styles.productImg}
                      source={{ uri: `http://192.168.100.4:5000/${item.images[0].fileName}` }}
                    />

                    <View>
                      <Text style={styles.prdtext1}>{item.name}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.prdtext2}>Rs {item.price}</Text>

                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 7,
                          marginRight: 5
                        }}
                        onPress={() => {
                          console.log(item.images[0].fileName)

                          navigation.navigate('DetailScreen', { product: item })
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

      </View>
    )

  }
  const DetailScreen = ({ route, navigation }) => {


    const { user } = useSelector(state => state.user);

   // const {userId} = {user}?._id || {};
    const { wishlistData } = useSelector(state => state.wishList);
    const [refresh, setrefresh] = useState(false);

    const { product } = route.params;
    const [quantity, setquantity] = useState(1);
    const [selectedStar, starCount] = useState(2)
    const onStarRatingPress = (rating) => {

      starCount(rating)

    }
    const [click, setclick] = useState(false)
    const [data, setData] = useState()

    const [cart, setCart] = useState(false);
    const [cartdata, setCartData] = useState();
    const { cartData } = useSelector(state => state.cart);
    const [getReview, setReview] = useState();


    let Img = "yo"
    // decreaseQuantity handler
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setquantity(quantity - 1);
      }
    };

    // increaseQuantity handler
    const increaseQuantity = () => {
      if (route.params?.product.Stock - 1 < quantity) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `${route.params?.product.name} out of stock.`,
        });
      } else {
        setquantity(quantity + 1);
      }
    };

    const wishListHandler = () => {
      if (user?._id != undefined) {

        setrefresh(true)

        dispatch(
          addWishList(
            route.params?.product.name,
            route.params?.product.price,
            Img,
            user._id,
            route.params?.product._id,
          ),
        );
        setclick(true)

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `${route.params?.product.name} Added to wishlist`,
        });
        setrefresh(false)
      }
      else {
        navigation.navigate("LoginScreens")
      }

    };
    const removeWishlistData = (id) => {
   
      dispatch(removeWishList(id))
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: `${route.params?.product.name} removed from wishlist`,
      });
      setclick(false)
  
    


    }

    // addToCartHandler
    const addToCartHandler = async () => {
      if (user?._id != undefined) {
        await dispatch(
          addCart(
            route.params?.product.name,
            quantity,
            Img,
            route.params?.product.price,
            user._id,
            route.params?.product._id,
            route.params?.product.Stock,
          ),
        );
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `${route.params?.product.name} added to cart successfully`,
        });
      }
      else {
        navigation.navigate("LoginScreens")

      }
    };

    // cartAlreadyAdded handler
    const cartAlreadyAdded = () => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Sorry it's already added."
        
    });
    };
     // wishAlreadyAdded handler
     const wishAlreadyAdded = () => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Sorry it's already added."
        
    });
    };

    //Reviews
    const sendReview = () => {
      if (user?._id != undefined) {
        setrefresh(true)
        axios
          .post(`${baseURL}product/review`, {
            productId: product._id,
            rating: selectedStar,
            comment: getReview,
          })
          .then((res) => {
            if (res.status == 200) {
              setrefresh(false)
              console.log(res);
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `Review posted successfully`,
              });
            }
          })+8
          .catch((err) => {
            console.log(err);
          });
      }

      else {

        navigation.navigate("LoginScreens")

      }
    }

    useEffect(() => {
      if (wishlistData && wishlistData.length > 0) {
        wishlistData.map(data => {
          setData(data);
          if (data.productId === route.params?.product._id) {
            setclick(true);
          }
        });
      }
      if (cartData && cartData.length > 0) {
        cartData.map(data => {
          setCartData(data);
          if (data.productId === route.params?.product._id) {
            setCart(true);
          }
        });
      }

      dispatch(getCart());
      // dispatch(getWishList());

    }, [wishlistData, cartData, refresh]);



    if (refresh) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <ActivityIndicator animating={true} color={COLORS.primary} />
    
          <Text>Loading..</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={{ height: 290, width: 290, marginLeft: 30, borderRadius: 20, marginTop: 15, marginBottom: 15 }}
              source={{ uri: product.Img }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 14 }}>{product.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, marginRight: 17, fontWeight: "bold", marginLeft: 14 }}>Rs. {product.price}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 5, marginLeft: 14 }}>


            <View>
              <StarRating
                starSize={20}
                disabled={false}
                maxStars={5}
                rating={selectedStar}
                fullStarColor={'#fcba03'}
                selectedStar={(rating) => { onStarRatingPress(rating) }}
              />

            </View>
            <View style={{ marginLeft: 10, marginBottom: 10 }}>
              <Text style={{ fontSize: 17 }}>{selectedStar}</Text>
            </View>
            <View style={{ justifyContent: "flex-end", flexDirection: "row-reverse", marginRight: 180 }}>
              {click===true && user?._id != undefined ?  (
                <Icons
                  name="heart"
                  size={25}
                  color={COLORS.primary}
                  backgroundColor={COLORS.white}
                  onPress={() => {
                    // wishAlreadyAdded()
                    removeWishlistData(data._id)
                    console.log(data._id)
                    // console.log(data.productN)
                   
                  }}
                />
              ) : (
                <Icons
                  name="heart-outline"
                  size={25}
                  color={COLORS.primary}
                  backgroundColor={COLORS.white}
                  onPress={() => {
                    wishListHandler()

                  }}
                />
              )
              }

            </View>
          </View>

          <View style={{ padding: 4, marginTop: 5, margin: 14, alignContent: 'center' }}>

            <Text
              style={{ backgroundColor: COLORS.lightprimary, padding: 8, borderRadius: 10 }}>
              {product.description}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.incrementBox}>
              <TouchableOpacity
                style={styles.incrementButtonStyle}

                onPress={() => { decreaseQuantity() }}>
                <Text style={styles.incrementtextStyle}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 15, padding: 4, textAlign: "center" }}>{quantity}</Text>
              <TouchableOpacity
                style={styles.incrementButtonStyle}

                onPress={() => { increaseQuantity() }}>
                <Text style={styles.incrementtextStyle}>+</Text>
              </TouchableOpacity>
            </View>


            {(cart === true && user?._id != undefined) || route.params?.product.Stock === 0 ? (

              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.lightprimary,
                    height: 33,
                    width: 150,
                    borderRadius: 10,
                    marginRight: 18
                  }}

                  onPress={() => { cartAlreadyAdded() }}>
                  <Text style={styles.adcarttextStyle}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>


            ) : (

              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 33,
                    width: 150,
                    borderRadius: 10,
                    marginRight: 18
                  }}

                  onPress={() => {
                    addToCartHandler()
                    
                  }}>
                  <Text style={styles.adcarttextStyle}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>

            )}




          </View>
          <View >

            <Text style={styles.text4}>Reviews</Text>
          </View>
          <View style={{ marginTop: 15, padding: 5 }}>
            <TextInput
              placeholder="Write your review here..."
              style={{
                margin: 5,
                padding: 8,
                backgroundColor: 'white',
                color: 'grey',
                shadowColor: '#000',
                height: 53,
                borderRadius: 10,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              onChangeText={setReview}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                sendReview()
              }}>
              <Text style={styles.buttontext}>Post</Text>
            </TouchableOpacity>
          </View>
          <View>
            {product.reviews.map(i => (
              <View
                key={i._id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 5,
                  padding: 8,
                  paddingTop: 15,
                  borderRadius: 10,
                  marginTop: 15,
                  elevation: 5,
                  backgroundColor: "#ffff",
                  marginVertical: 2,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    fontWeight: '700',
                    paddingLeft: 5,
                  }}>
                  {i.name}
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#555',
                      fontWeight: '600',
                      paddingLeft: 5,
                    }}>
                    {'  '}
                    {i.comment}
                  </Text>
                </Text>
                <Icon name="star" color="#C68600" size={18} />
                <Text style={{ color: '#333' }}>({i.rating})</Text>
              </View>
            ))}
          </View>



        </ScrollView>
      </View>
    )

  }



  return (
    <Stack.Navigator initialRouteName="MakeupStore">
      <Stack.Screen
        name="StartScrMakeupStoreeen"
        component={MakeupStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: 'Product',
          headerStyle: { height: 60 },
          headerShadowVisible: false,


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
    padding: 10
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
    backgroundColor: "#f5dfe6",
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
    height: 100,
    width: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 8,
    borderRadius: 10
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
  incrementButtonStyle: {
    backgroundColor: COLORS.primary,
    height: 33,
    width: 38,
    borderRadius: 10
  },
  incrementtextStyle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
    padding: 4,
    textAlign: "center"
  },
  incrementBox: {
    borderWidth: 1, borderColor: COLORS.lightprimary,
    backgroundColor: COLORS.lightprimary,
    borderRadius: 10,
    height: 35,
    width: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 18
  },

  adcarttextStyle: {
    color: COLORS.white,
    fontSize: 15,
    padding: 4,
    textAlign: "center"
  },
  text4: {
    fontSize: 20,
    marginRight: 190,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
    padding: 5
  },
  buttonstyle: {
    width: 100,
    height: 25,
    backgroundColor: COLORS.primary,

    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  buttontext: {
    color: 'white',
    fontSize: 14,
    padding: 0,
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
  categoriesListContainer: {

    alignItems: 'center',
    paddingHorizontal: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});

