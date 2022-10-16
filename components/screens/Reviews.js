import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, FlatList,Image, TouchableOpacity, Pressable, Modal} from 'react-native';
import Constants from 'expo-constants';
import YoutubePlayer from "react-native-youtube-iframe";
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import COLORS from '../const/colors';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Review({navigation}) {

  const [list, setlist] = useState();
  const [selectedStar, starCount] = useState()
  const [sortprice, setsortprice] = useState(false)
  const [highprice, sethighprice] = useState(false)
  const [getmodalvisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    axios.get(`${baseURL}products`)
      .then((res) => {
        console.log(res.data);
        setlist(res.data);

      })
    return () => {
      setlist([])
    };
  }, []);

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
      <Text style={styles.paragraph}>
        Best Rated Products
      </Text>
      <View style={styles.sortBtn}>
            <Icon name="tune" size={28} color={COLORS.white} onPress={()=>{setModalVisible(true)}} />
          </View>
      <View style={{ flex: 1}}>
          <FlatList
            data={list
              ? list.sort((i, j)=>i.ratings<j.ratings)
              : null && sortprice===true && list? list.sort((i, j)=>i.price>j.price): list
              || highprice===true && list? list.sort((i, j)=>i.price<j.price): list}
            numColumns={2}
            extraData={list}
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
                      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              <StarRating
                starSize={20}
                disabled={false}
                maxStars={5}
                rating={item.ratings}
                fullStarColor={'#fcba03'}
                // selectedStar={(rating) => { onStarRatingPress(rating) }}
              />
              <Text>
                {item.numOfReviews}
              </Text>

            </View>

                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 5
                        }}
                        onPress={() => {

                          navigation.navigate('Shop')
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carts: {
    backgroundColor: "#f5dfe6",
    borderRadius: 10,
    width: 147,
    height: 220,
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
  sortBtn: {
    width: 90,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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