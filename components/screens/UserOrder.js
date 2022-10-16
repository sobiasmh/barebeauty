import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, VirtualizedList, ImageBackground, Image, ActivityIndicator, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';


import baseURL from '../../assets/common/baseURL';
import axios from 'axios';

import COLORS from '../const/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getWishList, getCart, removeCart, updateCart } from '../../Redux/Actions/ProductAction';



import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';



const UserOrder = ({ navigation }) => {
    const [getcondition, setcondition] = useState(false);

    const [listings, setlistings] = useState([]);
  
    useEffect(() => {
      setcondition(true);
      axios.get(`${baseURL}order/userorders`)
        .then((res) => {
          console.log(res.data);
          setlistings(res.data);
          setcondition(false);
  
        })
      return () => {
        setlistings([])
      };
    }, []);

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
 }}> Orders</Text>
      </View>

      {listings?.length > 0 ? (
        <View >
            


            {listings.map(i => (
              <View
                key={i._id}
                style={{
                  
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
                  }}>Trackig ID: 
                   {i.trackigID}
                 
                  </Text>
                  <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    fontWeight: '700',
                    paddingLeft: 5,
                  }}>Total Price: 
                   {i.totalPrice}
                 
                  </Text>
                  {i.orderItems.map(m => (
              <View
                key={m._id}
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
                  {m.quantity}
                 
                  </Text>
                  <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    fontWeight: '700',
                    paddingLeft: 5,
                  }}>
                  {m.product.name}
                 
                  </Text>
                  <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    fontWeight: '700',
                    paddingLeft: 5,
                  }}>
                  {m.product.price}
                 
                  </Text>
                  
                    </View>
                    
                  ))}
                 
               
                
              </View>
            ))}
          

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
            Ooops... No Orders placed yet.
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
export default UserOrder;