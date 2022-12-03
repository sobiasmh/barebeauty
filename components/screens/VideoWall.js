import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList, Image, Pressable, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import COLORS from '../const/colors';
import { SliderBox } from 'react-native-image-slider-box';
import { useScrollToTop } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { TextInput } from 'react-native-gesture-handler';
import mime from 'mime';
import * as FileSystem from 'expo-file-system';

export default function VideoWall({ navigation }) {
  const [getcondition, setcondition] = useState(true);
  const [title, settitle] = useState()
  const [BrandName, setBrandName] = useState()
  const [Description, setDescription] = useState()
  const [uservideo, setvideo] = useState()
  const [getmodalvisible, setModalVisible] = React.useState(false);
  const [userimg, setimg] = useState()
  const [imgid, setimgid] = useState()
  const [imgurl, setimgurl] = useState()
  const [videoid, setvideoid] = useState()
  const [videourl, setvideourl] = useState()
  const [uploadImg, setuploadImg] = useState(false)
  const [getImagesofuser, setImageofuser] = useState()

  // const [file, setFile] = useState();

  const [getImage, setImage] = useState([
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/makeup-design-template-42dee198feed2d0837c0f3b64178c24a_screen.jpg?ts=1597977980',
    'https://img.freepik.com/free-vector/realistic-makeup-artist-youtube-thumbnail-template_23-2149379508.jpg?w=2000',
    'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/6065b70db02c2_json_image_1617278733.webp',
  ]);
  const [getfeed, setfeed] = useState();
  useEffect(() => {
    axios.get(`${baseURL}video/getVideo`)
      .then((res) => {
        setcondition(false)
        console.log(res.data);
        setfeed(res.data);
      })
      axios.get(`${baseURL}video/userImg`)
      .then((resp) => {
     //   setcondition(false)
       // console.log(res.data);
        setImageofuser(resp.data);
      })
    return () => {
      setfeed([])
      //setImageofuser([])
    };
  }, [getcondition]);
  const ref = React.useRef(null);
  useScrollToTop(ref);


  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true


    });

    if (!result.cancelled) {
      setvideo(result.uri)
      //console.log("user")
      // console.log(uservideo)
      // const imgurl = "file:///"+result.uri.split("file:/").join("");

      const fsRead = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });

      const base64Im = `data:video/mp4;base64,${fsRead}`;
      let f = {
        "file": base64Im,
        "upload_preset": "vqjcnili",

      }
      //console.log(f)
      sendVid(f)

    }

  }

  const sendVid = (d) => {
    // const form = new FormData()
    // form.append('file', d)
    // form.append("upload_preset", "vqjcnili")

    fetch('https://api.cloudinary.com/v1_1/dhmolukeg/video/upload', {
      body: JSON.stringify(d),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      setvideoid(data.public_id)
      setvideourl(data.url)
      //console.log("url",data)
      // console.log("url",data.url)
      // const image = {
      //   publicId: data.public_id,
      //   imageUrl: data.url
      // }
      //console.log(image)
      // axios
      // .post(`${baseURL}video/img`, {
      //   publicId: data.public_id,
      //   imageUrl: data.url
      // }  
      // )
      // .then((res) => {
      //     console.log(res)
      //     }
      // )
      // .catch((err) => {
      //     console.log("error",err);
      // });

      return data.pun
    }).catch(err => console.log("error", err))


  }
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
      base64: true

    });
    console.log(result)

    if (!result.cancelled) {
      setimg(result.uri)
      let base64Img = `data:image/jpg;base64,${result.base64}`
      let data = {
        "file": base64Img,
        "upload_preset": "vqjcnili",
      }
      // console.log(file.uri)
      sendImg(data)
    }

  }
  const sendImg = (d) => {

    fetch('https://api.cloudinary.com/v1_1/dhmolukeg/image/upload', {
      body: JSON.stringify(d),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      setimgid(data.public_id)
      setimgurl(data.url)
      // console.log("url", data.url)
      // const image = {
      //     publicId: data.public_id,
      //     imageUrl: data.url
      // }
      // console.log(image)
      // axios
      //     .post(`${baseURL}skin/postimg`, {
      //         publicId: data.public_id,
      //         imageUrl: data.url
      //     }
      //     )
      //     .then((res) => {
      //       //  console.log(res)
      //     }
      //     )
      //     .catch((err) => {
      //         console.log("error", err);
      //     });

      return data.pun
    }).catch(err => console.log("error", err))


  }
  const imguplod = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 10],
      quality: 1,
      base64: true

    });
    console.log(result)

    if (!result.cancelled) {
      // setimg(result.uri)
      let base64Img = `data:image/jpg;base64,${result.base64}`
      let data = {
        "file": base64Img,
        "upload_preset": "vqjcnili",
      }
      // console.log(file.uri)
      senduserimg(data)
    }

  }
  const senduserimg = (d) => {

    fetch('https://api.cloudinary.com/v1_1/dhmolukeg/image/upload', {
      body: JSON.stringify(d),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()

      // console.log("url", data.url)
      // const image = {
      //     publicId: data.public_id,
      //     imageUrl: data.url
      // }
      // console.log(image)
      axios
        .post(`${baseURL}video/postimg`, {
          publicId: data.public_id,
          imageUrl: data.url
        }
        )
        .then((res) => {
          //  console.log(res)
          setuploadImg(true)
        }
        )
        .catch((err) => {
          console.log("error", err);
        });

      return data.pun
    }).catch(err => console.log("error", err))


  }
  const send = () => {
    axios
      .post(`${baseURL}video/shopvideo`, {
        title: title,
        BrandName: BrandName,
        Description: Description,
        publicId: imgid,
        imageUrl: imgurl,
        vpublicId: videoid,
        videoUrl: videourl
      }
      )
      .then((res) => {
        console.log(res)
        console.log("done")
      }
      )
      .catch((err) => {
        console.log("error", err);
      });
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
    <View style={styles.container}>
      <Modal animationType="fade" visible={getmodalvisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Fill The Details</Text>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(title) =>
                  settitle(title)
                }
                placeholder="Enter Title"
                placeholderTextColor="#8b9cb5"
                underlineColorAndroid="#f000"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(BrandName) =>
                  setBrandName(BrandName)
                }
                placeholder="Enter Brand Name"
                placeholderTextColor="#8b9cb5"
                underlineColorAndroid="#f000"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Description) =>
                  setDescription(Description)
                }
                placeholder="Enter Description"
                placeholderTextColor="#8b9cb5"
                underlineColorAndroid="#f000"
              />
            </View>
            <View>
              {userimg && imgid ? <Pressable
                style={{
                  backgroundColor: '#00FF00',
                  width: 120,
                  height: 30,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 7,
                }}
                onPress={() => {
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Uploaded
                </Text>
              </Pressable>
                :
                <Pressable
                  style={{
                    backgroundColor: '#EC255A',
                    width: 120,
                    height: 30,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7,
                  }}
                  onPress={() => {
                    pickImg()
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Upload Image
                  </Text>
                </Pressable>
              }
            </View>
            <View>
              {uservideo && videoid ? <Pressable
                style={{
                  backgroundColor: '#00FF00',
                  width: 120,
                  height: 30,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 7,
                }}
                onPress={() => {

                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Uploaded
                </Text>
              </Pressable>
                :
                <Pressable
                  style={{
                    backgroundColor: '#EC255A',
                    width: 120,
                    height: 30,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7,
                  }}
                  onPress={() => {
                    pickVideo()
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Upload Video
                  </Text>
                </Pressable>
              }
            </View>
            <View>
              <Pressable
                style={{
                  backgroundColor: '#EC255A',
                  width: 120,
                  height: 30,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 7,
                }}
                onPress={() => {
                  send();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Upload
                </Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={{
                  backgroundColor: '#EC255A',
                  width: 120,
                  height: 30,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 7,
                }}
                onPress={() => {
                  setModalVisible(false);
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
      <View >
        <SliderBox
          images={getImage}
          sliderBoxHeight={200}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#1A3C40"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={10}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            marginRight: 100,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',

          }}
          ImageComponentStyle={{ borderRadius: 15, width: '83%', marginTop: 5 }}
          imageLoadingColor="#2196F3"
        />
      </View>

      <View>
        <View style={{flexDirection:'row'}}>
        <View style={{ marginTop: 10, paddingTop: 5, marginLeft: 15 }}>
          <Text style={styles.text4}>User's Gallery</Text>
        </View>
        {/* {uservideo && <Image
                    style={{
                      resizeMode: 'cover',
                      height: 400,
                      width: '83%',
                      marginRight:11,
                      marginTop:15,
                      marginLeft:30
                    }}
                    source={{
                      uri: uservideo,
                    }}
                  />
        
        
       } */}
        {/* <VideoPlayer
          style={{ width: 100, height: 140, }}
          videoProps={{
            shouldPlay: true,
            resizeMode: ResizeMode.COVER,

            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: {
              uri: uservideo,
            },
          }}
        /> */}

        <View style={{ marginTop:25, marginLeft:60}}>
          {
            uploadImg ?
              <TouchableOpacity
                style={
                  {
                    width: 100,
                    height: 25,
                    backgroundColor: '#00FF00',
                    marginRight: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9,
                  }
                }
                onPress={() => {


                }}>
                <Text style={styles.buttontext}>Uploaded</Text>
              </TouchableOpacity> :
              <TouchableOpacity
                style={styles.buttonstyle}
                onPress={() => {
                  imguplod()

                }}>
                <Text style={styles.buttontext}>Upload</Text>
              </TouchableOpacity>
          }


        </View>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>

            {getImagesofuser?.map((i, index) => (
              
                    <Image
                    source={{
                      uri: i.image.imageUrl,
                    }}
                     style={{ height: 170, width: 110, resizeMode: 'cover' ,marginLeft:10, borderRadius:9}}
                    />
                 
            ))}
          </ScrollView>
      </View>
      <View style={{flexDirection:'row'}}>
      <View style={{ marginTop: 10, paddingTop: 5, marginLeft: 15 }}>
        <Text style={styles.text4}>Videos Tutorial Here</Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() => {
              setModalVisible(true)

            }}>
            <Text style={styles.buttontext}>Upload</Text>
          </TouchableOpacity>


        </View>
      </View>
      

      <FlatList
        ref={ref}
        data={getfeed}
        renderItem={({ item }) => {
          return (
            <View style={styles.postView}>
              <View style={styles.postTitle}>
                <View style={styles.imageView}>
                  <Image style={styles.profilepic} source={{ uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/makeup-design-template-42dee198feed2d0837c0f3b64178c24a_screen.jpg?ts=1597977980" }} />
                  <View style={styles.titleView}>
                    <Text style={styles.titlename} >{item.BrandName}</Text>
                    <Text style={styles.post_title} >Click to Watch Video</Text>

                  </View>
                </View>
                <View>
                  <Icon name="options-vertical" color="green" />
                </View>

              </View>
              <TouchableOpacity style={styles.coverButton} onPress={() => { navigation.navigate('Video Description', { data: item }) }}>
                <Image style={styles.coverPhoto} source={{ uri: item.image.imageUrl }} />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

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
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  reviewcard: {
    backgroundColor: '#EDD2F3',
    width: 190,
    height: 260,
    margin: 7,
    padding: 5,
    borderRadius: 20,
  },
  reviewImg: {
    resizeMode: 'cover',
    height: 150,
    width: 150,
    alignContent: 'flex-start',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    flexBasis: '50%',
  },
  titlename: {
    fontSize: 16,
    fontWeight: "bold"
  },
  post_title: {
    fontSize: 11,
    color: "grey",

  },
  postView: {
    width: "100%",
    alignItems: "center",
    marginTop: 40

  },
  postTitle: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",



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
  imageView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"

  },
  profilepic: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 50

  },
  titleView: {
    marginLeft: 15

  },
  coverPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 20,



  },
  text4: {
    fontSize: 20,
    marginRight: 60,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
    padding: 5
  },
  coverButton: {
    width: "90%",
    height: 200,
    backgroundColor: 'green',
    borderRadius: 20,
    marginTop: 10

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEECE9',
  },
  modalView: {
    margin: 6,
    backgroundColor: '#fff',
    height: 690,
    width: 350,
    borderRadius: 20,
    padding: 15,
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
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    margin: 10,

  },

});