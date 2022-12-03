import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, FlatList,Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import YoutubePlayer from "react-native-youtube-iframe";
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import COLORS from '../const/colors';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
export default function VideoDesc({ navigation, route }) {
  const [postData, setpostData] = useState(route.params.data);
  const [list, setlist] = useState();

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
    <View style={styles.mainPlayerView}>
      <View style={styles.videoView}>
      <VideoPlayer
          style={{ width: 450, height: 240, }}
          videoProps={{
            shouldPlay: true,
            resizeMode: ResizeMode.COVER,

            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: {
              uri: postData.video.videoUrl,
            },
          }}
        /> 
      </View>
      <Text style={styles.postTitle}>{postData.title}</Text>
      <Text style={styles.desc}>{postData.Description}</Text>


      <View>
        <Text style={styles.text4}>Products of the Brand</Text>
      </View>

      <View style={{ flex: 1}}>
          <FlatList
            data={list
              ? list.filter((item) => (item.brand.match(postData.BrandName)))
              : null}
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
  mainPlayerView: {
    flex: 1,
    backgroundColor: "#ffff"

  },
  videoView: {
    height: 210,
    width: "100%",
    backgroundColor: "grey"
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "black",
    padding: 5
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: 'center'
  },
  desc: {

    color: "grey",
    fontSize: 14,
    padding: 5

  },
  text4: {
    fontSize: 24,
    marginLeft: 14,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
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
});