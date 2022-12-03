import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default ({ navigation }) => {
    const BannerPage = (props) => {
        const image = {
            uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f513f6151650233.630f9fb0892d8.jpg',
        };

        return (
            <View style={styles.container}>
                <View>
                    <ImageBackground
                        source={image}
                        resizeMode="cover"
                        style={{
                            height: '100%',
                            width: 410,
                        }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 38,
                                        marginTop: 520,
                                        marginLeft: 30,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                    }}>
                                    Virtual Makeup Try
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 17,
                                        marginLeft: 30,
                                        textAlign: 'left',
                                    }}>
                                    See how you look in you favourite products!
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', marginLeft: 200 }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#F7A4A4',
                                        width: 100,
                                        height: 70,
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 40,
                                        alignSelf: "flex-end",
                                        activeOpacity: 0.8,

                                    }}
                                    onPress={() => {
                                        navigation.navigate('Virtual', {
                                        });
                                    }}>
                                    <Icon name="angle-double-right" color='white' size={36} />

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    };

    const Virtual = () => {
       
        const [userimg, setimg] = useState()
        const [picurl, seturl] = useState()

        const pickImg = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [10, 10],
                quality: 1,
                base64:true

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
                console.log("url", data.public_id)
                seturl(data.url)
                console.log("url", data.url)
                const image = {
                    publicId: data.public_id,
                    imageUrl: data.url
                }
               // console.log(image)
                axios
                    .post(`${baseURL}skin/postimg`, {
                        publicId: data.public_id,
                        imageUrl: data.url
                    }
                    )
                    .then((res) => {
                      //  console.log(res)
                    }
                    )
                    .catch((err) => {
                        console.log("error", err);
                    });

                return data.pun
            }).catch(err => console.log("error", err))


        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        marginLeft: 30
                    }}>Virtual Makeup Try</Text>
                    <Text style={{
                        marginTop: 5,
                        fontSize: 15,
                        marginRight: 100,
                        marginLeft: 30,
                        marginBottom: 20,

                        color: "grey"
                    }}>Virtually Try Makeup and create a look with your favourite products.</Text>

                </View>
                <View>
                {userimg? <Image
                    style={{
                      resizeMode: 'cover',
                      height: 320,
                      width: '83%',
                      marginRight:11,
                      marginTop:7,
                      marginLeft:30
                    }}
                    source={{
                      uri: userimg,
                    }}
                  />:<Image
                    style={{
                      resizeMode: 'cover',
                      height: 320,
                      width: '83%',
                      marginRight:11,
                      marginTop:7,
                      marginLeft:30
                    }}
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png",
                    }}
                  />}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{
                        marginTop: 15,
                        fontSize: 15,
                        marginRight: 100,
                        marginLeft: 17,
                        marginBottom: 20,

                        color: "grey"
                    }}>Apply makeup here.</Text>
                    {userimg ? <TouchableOpacity
                        style={{
                            backgroundColor: '#00FF00',
                            width: 120,
                            height: 45,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                            marginRight: 25,
                            alignSelf: "flex-end",
                            activeOpacity: 0.8,

                        }}
                        onPress={() => {
                            //console.log(picurl)
                            navigation.navigate("Report", {im:userimg, url: picurl})
                            
                        }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Icons name="check" color='white' size={36} />
                            <Text style={{
                                color: "white",
                                padding: 3,
                                fontSize: 15,
                            }}>Uploaded</Text>
                        </View>

                    </TouchableOpacity> : <TouchableOpacity
                        style={{
                            backgroundColor: '#F7A4A4',
                            width: 120,
                            height: 45,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                            marginRight: 20,
                            alignSelf: "flex-end",
                            activeOpacity: 0.8,

                        }}
                        onPress={() => {
                            pickImg()
                        }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Icons name="camera" color='white' size={36} />
                            <Text style={{
                                color: "white",
                                padding: 3,
                                fontSize: 15,
                            }}>Upload</Text>
                        </View>

                    </TouchableOpacity>}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginLeft: 10,
                        marginTop: 15
                    }}>Makeup Try On</Text>
                    <Image
                        style={{
                            resizeMode: 'cover',
                            height: 50,
                            width: 50,
                            marginRight: 11,
                            marginTop: 15
                        }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/1940/1940922.png',
                        }}
                    />
                </View>
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:6}}>
                    <TouchableOpacity
                    style={{
                        height:150, 
                        width:150,
                        margin:9,
                        marginTop:16,
                        backgroundColor:"#FFACC7",
                        borderRadius:5
                    }}
                    onPress={() => {
                       
                    }}
                    >
                        <Image
                    style={{
                      resizeMode: 'cover',
                      height: 80,
                      width: 80,
                      marginTop:30, 
                      marginLeft:30
                    }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/307/307579.png",
                    }}
                  />
                  <Text style={{fontSize:19, color: 'white', fontWeight:'bold', marginBottom:10, marginLeft:38}}>
                    Lipstick
                  </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                        height:150, 
                        width:150,
                        margin:9,
                        marginTop:16,
                        backgroundColor:"#DEBACE",
                        borderRadius:5
                    }}
                    onPress={() => {
                       
                    }}
                    >
                        <Image
                    style={{
                      resizeMode: 'cover',
                      height: 80,
                      width: 80,
                      marginTop:30, 
                      marginLeft:30
                    }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3258/3258600.png",
                    }}
                  />
                  <Text style={{fontSize:19, color: 'white', fontWeight:'bold', marginBottom:10, marginLeft:38}}>
                    Eye Liner
                  </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                        height:150, 
                        width:150,
                        margin:9,
                        marginTop:16,
                        backgroundColor:"#AF7AB3",
                        borderRadius:5
                    }}
                    onPress={() => {
                       
                    }}
                    >
                        <Image
                    style={{
                      resizeMode: 'cover',
                      height: 80,
                      width: 80,
                      marginTop:30, 
                      marginLeft:30
                    }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2370/2370938.png",
                    }}
                  />
                  <Text style={{fontSize:19, color: 'white', fontWeight:'bold', marginBottom:10, marginLeft:45}}>
                    Blush
                  </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                        height:150, 
                        width:150,
                        margin:9,
                        marginTop:16,
                        backgroundColor:"#B7D3DF",
                        borderRadius:5
                    }}
                    onPress={() => {
                       
                    }}
                    >
                        <Image
                    style={{
                      resizeMode: 'cover',
                      height: 80,
                      width: 80,
                      marginTop:30, 
                      marginLeft:30
                    }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3258/3258608.png",
                    }}
                  />
                  <Text style={{fontSize:19, color: 'white', fontWeight:'bold', marginBottom:10, marginLeft:25}}>
                    Eyeshadows
                  </Text>

                    </TouchableOpacity>
                    
                </View>
                </ScrollView>
                
                
            </View>
        );
    };
    const Report = ({navigation, route})=>{
        const {im, url} = route.params;
        const [result, setresult] = useState()

        const sendreq = () =>{
            console.log(url)
            axios
            .post('http://192.168.100.4:3000/skin_color', {
                "name": url
            },  {headers: {
                Accept: 'application/json'
            }},
            )
            .then((res) => { 
                if(res.status==200){

                    console.log(res.data.Color)
                    setresult(res.data.Color)
                }

            //   console.log("Your Skin Color", res.named_color)
              
            }
            )
            .catch((err) => {
                console.log("error", err);
            });

        }
       
        return(
            <View style={styles.container}>
                <View>
                <Image
                    style={{
                      resizeMode: 'cover',
                      height: 400,
                      width: '83%',
                      marginRight:11,
                      marginTop:15,
                      marginLeft:30
                    }}
                    source={{
                      uri: im,
                    }}
                  />
                </View>
                
                <View>
                <TouchableOpacity
                        style={{
                            backgroundColor: '#F7A4A4',
                            width: 120,
                            height: 45,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                            marginRight: 20,
                            alignSelf: "flex-end",
                            activeOpacity: 0.8,

                        }}
                        onPress={() => {
                            sendreq()
                        }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Icons name="camera" color='white' size={36} />
                            <Text style={{
                                color: "white",
                                padding: 3,
                                fontSize: 15,
                            }}>Check</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginLeft: 30,
                        marginBottom: 10,
                        marginTop: 15
                    }}>Your Skin Tone Result</Text>
                    <Image
                        style={{
                            resizeMode: 'cover',
                            height: 40,
                            width: 40,
                            marginRight: 11,
                            marginTop: 15
                        }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/1831/1831908.png',
                        }}
                    />
                </View>
                <View>
                    <View style={{height:40, width:340, margin:20, backgroundColor:result}}>

                    </View>
                </View>
            </View>
        )
    }
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BannerPage" component={BannerPage} />
            <Stack.Screen name="Virtual" component={Virtual} />
            <Stack.Screen name="Report" component={Report} />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});