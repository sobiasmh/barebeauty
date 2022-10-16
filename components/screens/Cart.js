import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, VirtualizedList, ImageBackground, Image, ActivityIndicator, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';


import COLORS from '../const/colors';
import { useDispatch, useSelector } from 'react-redux';
import {  removeCart, updateCart } from '../../Redux/Actions/ProductAction';



import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';



const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector(state => state.cart);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [quantity, setquantity] = useState();
  const [getcondition, setcondition] = useState(false);

  // remove item from cart
  const cartRemoveHandler = (index, id, name) => {

      Toast.show({
        topOffset: 60,
        type: "success",
        text1: `${name} removed from cart`,
      });
    dispatch(removeCart(id));
    setcondition(true);
   

  };

  // decreaseQuantity handler
  const decreaseQuantity = (id) => {
    if (quantity > 1) {
      setquantity(quantity-1);
      dispatch(updateCart(id, quantity-1));

    }
  };

  // increaseQuantity handler
  const increaseQuantity = (id, Stock) => {
    if (Stock - 1 < quantity) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `${item.name} out of stock.`,
      });
    } else {
      setquantity(quantity + 1);
      console.log(quantity)
      dispatch(updateCart(id, quantity + 1));

    }
  };

 

  useEffect(() => {
    setcondition(true)
    if (cartData?.length > 0) {
      cartData.map(item => {
        setquantity(item.quantity);
      });
    }
    setcondition(false)

  }, [cartData, getcondition]);
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
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon name="cart" size={28} onPress={navigation.goBack} color={ COLORS.primary}
/>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary
 }}> Cart</Text>
      </View>


      {cartData?.length > 0 ? (
        <View >
          <View style={{ height:"70%"}}>

            <FlatList

              data={cartData}
              extraData={cartData}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.cartCard} key={item.key}>
                    <Image source={{ uri: item.productImage }} style={{ height: 80, width: 80 }} />
                    <View
                      style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                      }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.productName}</Text>
                      <Text style={{ fontSize: 13, color: COLORS.grey }}>
                      </Text>
                      <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rs. {item.productPrice}</Text>
                    </View>
                    <View style={{ marginRight: 5, alignItems: 'center' }}>
                      <View style={{marginBottom:18, marginLeft:18}}>
                        <TouchableOpacity
                          style={styles.actionBtn}
                          onPress={() => {

                            cartRemoveHandler(item.index, item._id, item.productName)
                          }}>
                          <Icon name="alpha-x-circle" size={19} style={{ padding: 5 }} color={COLORS.white} />
                        </TouchableOpacity>

                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={styles.incrementBox}>
                          <TouchableOpacity
                            style={styles.incrementButtonStyle}

                            onPress={() => { decreaseQuantity(item._id) }}>
                            <Text style={styles.incrementtextStyle}>-</Text>
                          </TouchableOpacity>
                          <Text style={{ fontSize: 15, padding: 4, textAlign: "center" }}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.incrementButtonStyle}

                            onPress={() => { increaseQuantity(item._id, item.Stock) }}>
                            <Text style={styles.incrementtextStyle}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                  </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 20,
                height: 80,
                elevation: 15,
                backgroundColor: COLORS.white,
                marginVertical: 10,
                marginHorizontal: 20,
                paddingHorizontal: 10,
              }}>
              <Text style={{ color: '#333', fontSize: 20, paddingLeft: 15 }}>
                Total Price:
              </Text>
              <Text
                style={{
                  color: 'crimson',
                  fontSize: 22,
                  paddingRight: 15,
                  fontWeight: '700',
                }}>
                Rs. {cartData.reduce(
                  (total, item) => total + item.productPrice * item.quantity,
                  0,
                )}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  height: 33,
                  width: 150,
                  marginLeft: 170,
                  elevation: 8,
                  borderRadius: 10,

                }}
                onPress={() => navigation.navigate('Order')}>
                <Text style={styles.checkouttextStyle}>
                  Go to Checkout
                </Text>
              </TouchableOpacity>
            </View>

          </View>


        </View>





      ) : (

        <View
          style={{
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{
            resizeMode: 'cover',
            height: 250,
            width: 250,
            marginTop:200
          }}

            source={{ uri: "https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" }} />

          <Text style={{ color: '#333', fontSize: 20, textAlign: 'center', fontWeight:"bold" }}>
            Ooops... Your cart is empty
          </Text>
          <Text style={{ color: '#333', fontSize: 18, textAlign: 'center', color:"grey", padding:6, margin:8 }}>
            Looks like you have not added anything to your cart
          </Text>
          <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 33,
                    width: 150,
                    borderRadius: 10,
                    marginRight: 18
                  }}

                  onPress={() => {
                    navigation.navigate('Shop')
                  }}>
                  <Text style={styles.adcarttextStyle}>Shop</Text>
                </TouchableOpacity>
        </View>
      )}

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
  bgImg: {
    flex: 1,
    position: 'absolute',
    width: "100%",
    height: '100%',
    justifyContent: 'center'
  },
  bottomContainer: {
    marginTop: "52%",
    height: "90%",
    width: 400,
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: 'center'
  },
  profile: {
    height: 120,
    width: 120,
    borderRadius: 25,
    bottom: "10%",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    bottom: "8%"

  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  btnStyle: {
    height: 40,
    width: 100,
    backgroundColor: COLORS.primary,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 5,
    bottom: "8%"
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    padding: 4,
    textAlign: "center"
  },
  header: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,

  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 30,
    height: 30,
    marginLeft: 70,
    backgroundColor: "lightgrey",
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  incrementButtonStyle: {
    backgroundColor: COLORS.primary,
    height: 30,
    width: 34,
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
    height: 32,
    width: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 18
  },
  checkouttextStyle: {
    color: COLORS.white,
    fontSize: 15,
    padding: 4,
    textAlign: "center"
  },
  adcarttextStyle: {
    color: COLORS.white,
    fontSize: 16,
    padding: 4,
    textAlign: "center",
    fontWeight:"bold"
  },
});
export default Cart;

