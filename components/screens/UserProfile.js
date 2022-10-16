import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, ImageBackground, Image, ActivityIndicator, Modal, TouchableOpacity, SafeAreaView, FlatList, BackHandler, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';

import CustomDrawer from './CustomDrawer';
import COLORS from '../const/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getWishList, getCart, removeWishList } from '../../Redux/Actions/ProductAction';
import { deleteAccount } from '../../Redux/Actions/UserAction';

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';
import OrderSteps from './OrderSteps';
import Cart from './Cart';
import CartOrder from './CartOrder';
import UserOrder from './UserOrder';


export default ({ navigation }) => {
  const [getmodalvisible, setModalVisible] = React.useState(false);



  const dispatch = useDispatch();
  const { wishlistData, error } = useSelector(state => state.wishList);

  useEffect(() => {

    dispatch(getWishList());
    dispatch(getCart());
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()


  }, []);

  // delete account
  const deleteaccount = (id) => {

    dispatch(deleteAccount(id));

    setModalVisible(false);
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `Your Account was deleted .`,
    });
    navigation.navigate("StartScreen")




  };



  const UserProf = (props) => {
    const { user, error, isAuthenticated } = useSelector(state => state.user);
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fffafd',
          }}>
          <Modal animationType="fade" visible={getmodalvisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ textAlign: 'center' }}>
                  Are you sure you want to delete your Account?
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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
                      deleteaccount(user._id)
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      Yes
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
        </View>
        <Image style={styles.bgImg} source={{
          uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg"
        }} />
        <View style={styles.bottomContainer}>
          <Image style={styles.profile} source={{
            uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26b9e8141844505.625c1611254c7.jpg"
          }} />
          <Text style={styles.name}>{user ? user.name : ""}</Text>
          <Text style={styles.name2}>{user ? user.email : ""}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={styles.btntext}>Delete</Text>
            </TouchableOpacity>
            
          </View>
        </View>




      </SafeAreaView>
    )
  }

  const Wishlist = () => {
    const [getcondition, setcondition] = useState(true);

    useEffect(() => {
      setcondition(false)
      
  
    }, [getcondition, wishlistData]);

    const removeWishlistData = (key, id, name) => {
      setcondition(true)
      dispatch(removeWishList(id))
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: `${name} removed from wishlist`,
      });
      setcondition(false)



    }

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
          <Icon name="heart" size={28} onPress={navigation.goBack} color={COLORS.primary}
          />
          <Text style={{
            fontSize: 25, fontWeight: 'bold', color: COLORS.primary
          }}> Wishlist</Text>
        </View>


        {wishlistData?.length > 0 ? (
          <View>

            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
              data={wishlistData}
              extraData={wishlistData}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cartCard}>
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
                        {item.ingredients}
                      </Text>
                      <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rs. {item.productPrice}</Text>
                    </View>
                    <View style={{ marginRight: 20, alignItems: 'center' }}>
                      <View style={{ marginRight: 5, alignItems: 'center' }}>
                        <View>
                          <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => {

                              removeWishlistData(item.key, item._id, item.productName)
                            }}>
                          <Icon name="alpha-x-circle" size={19} style={{ padding: 5 }} color={COLORS.white} />
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
              marginTop: 200
            }}

              source={{ uri: "https://www.saugatonline.com/images/emptywishlist.jpg" }} />

            <Text style={{ color: '#333', fontSize: 20, textAlign: 'center', fontWeight: "bold" }}>
              Ooops... Your wishlist is empty
            </Text>
            <Text style={{ color: '#333', fontSize: 18, textAlign: 'center', color: "grey", padding: 6, margin: 8 }}>
              Looks like you have not added anything to your wishlist
            </Text>

          </View>
        )}



      </SafeAreaView>
    )
  }




  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="UserProf"
      drawerContent={props => <CustomDrawer {...props} />}

      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: 240,

        },
      }}>
      <Drawer.Screen name="UserProf"

        component={UserProf}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="account"
              size={size}
              color={focused ? COLORS.primary : '#ccc'}
            />
          ),
          headerStyle: {
            backgroundColor: COLORS.primary
          },
          headerShown: false,
          headerTintColor: 'white',
          drawerLabel: 'Profile',

        }} />
      <Drawer.Screen name="Wishlist"

        component={Wishlist}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="heart"
              size={size}
              color={focused ? COLORS.primary : '#ccc'}
            />
          ),

          headerShown: false,
          headerTintColor: 'white',
          drawerLabel: 'Wishlist'
        }}
      />
      <Drawer.Screen name="Cart"

        component={CartOrder}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="cart"
              size={size}
              color={focused ? COLORS.primary : '#ccc'}
            />
          ),

          headerShown: false,
          headerTintColor: 'white',
          drawerLabel: 'Your Cart'
        }}
      />
      <Drawer.Screen name="Your Orders"

        component={UserOrder}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="cart"
              size={size}
              color={focused ? COLORS.primary : '#ccc'}
            />
          ),

          headerShown: false,
          headerTintColor: 'white',
          drawerLabel: 'Your Orders'
        }}
      />

    </Drawer.Navigator>
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
  name2: {
    fontSize: 18,
    bottom: "8%",
    color: "grey"

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
    marginTop: 20

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
  checkouttextStyle: {
    color: COLORS.white,
    fontSize: 15,
    padding: 4,
    textAlign: "center"
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

