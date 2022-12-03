import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList
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
import COLORS from '../const/colors';

export default ({ navigation }) => {
    const First = (props) => {
        const image = {
            uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/087a3f154629197.6345b323c6ad3.jpg',
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
                                    Skin Tone Detection
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 19,
                                        marginLeft: 30,
                                        textAlign: 'left',
                                    }}>
                                    Detect you skin tone for best products!
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
                                        navigation.navigate('Skin', {
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

    const Skin = () => {
        const [getImage, setImage] = useState([
            'https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2020-virtual-services-page-glo793/GLO793-VTO_lip-683x683.jpg',
            'https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2020-virtual-services-page-glo793/GLO793-VTO_lip-683x683.jpg',
            'https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2020-virtual-services-page-glo793/GLO793-VTO_lip-683x683.jpg',
        ]);
        const [userimg, setimg] = useState()
        const [picurl, seturl] = useState()

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
                    }}>Detect you Skin Tone</Text>
                    <Text style={{
                        marginTop: 5,
                        fontSize: 15,
                        marginRight: 100,
                        marginLeft: 30,
                        marginBottom: 20,

                        color: "grey"
                    }}>Here's a demo on how you should take the picture.</Text>

                </View>
                <View>
                    <SliderBox
                        images={getImage}
                        sliderBoxHeight={400}
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
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{
                        marginTop: 15,
                        fontSize: 15,
                        marginRight: 100,
                        marginLeft: 30,
                        marginBottom: 20,

                        color: "grey"
                    }}>Now try yourself.</Text>
                    {userimg && picurl ? <TouchableOpacity
                        style={{
                            backgroundColor: '#00FF00',
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
                            //console.log(picurl)
                            navigation.navigate("Report", { im: userimg, url: picurl })

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

            </View>
        );
    };
    const Report = ({ navigation, route }) => {
        const { im, url } = route.params;
        const [result, setresult] = useState()
        const [usercolor, setusercolor] = useState()
        const [tone, settone] = useState()
        const [bestmatch, setbestmatch] = useState()

        const sendreq = () => {
            console.log(url)
            axios
                .post('http://192.168.100.4:3000/skin_color', {
                    "name": url
                }, {
                    headers: {
                        Accept: 'application/json'
                    }
                },
                )
                .then((res) => {
                    if (res.status == 200) {

                        console.log(res.data.allColors)
                        setresult(res.data.allColors)
                        setbestmatch(res.data.mostdominantColor)
                    }

                    //   console.log("Your Skin Color", res.named_color)

                }
                )
                .catch((err) => {
                    console.log("error", err);
                });

        }
        const checktone = (color) => {
            let colorOfUser = color.split("", 3)
            console.log("v", colorOfUser)

            if (colorOfUser[1] == 'f' && colorOfUser[2].match(/[a-zA-Z]/g) || colorOfUser[1] == 'e') {
                settone("Light")
            }
            else if (colorOfUser[1] == 'f' && colorOfUser[2].match(/^[0-9]+$/) || colorOfUser[1] == 'c' || colorOfUser[1] == 'd') {

                settone("Medium")
            }
            else if (colorOfUser[1] == 'b' || colorOfUser[1] == 'a') {
                settone("Tan")
            }
            else if (colorOfUser[1].match(/^[0-9]+$/)) {
                settone("Dark")
            }
            else {
                settone("Sorry try again")
            }


        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Image
                            style={{
                                resizeMode: 'cover',
                                height: 400,
                                width: '83%',
                                marginRight: 11,
                                marginTop: 15,
                                marginLeft: 30
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
                            marginLeft: 15,
                            marginBottom: 20,
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

                        {result ?
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={{
                                        marginTop: 2,
                                        fontSize: 15,
                                        marginLeft: 15,
                                        marginBottom: 10,

                                        color: "grey"
                                    }}>We believe this is your best match.</Text>
                                    <View style={{
                                        height: 50,
                                        width: 70,
                                        borderRadius: 100,
                                        marginRight: 10,
                                        backgroundColor: bestmatch
                                    }}>
                                    </View>

                                </View>
                                <Text style={{
                                    marginTop: 2,
                                    fontSize: 15,
                                    marginRight: 100,
                                    marginLeft: 15,
                                    marginBottom: 20,

                                    color: "grey"
                                }}>Choose the shade that you believe is close to your skintone.</Text>
                            </View>

                            : <View></View>}
                        <FlatList
                            style={{ marginTop: 10, width: '100%', margin: 15 }}
                            data={result}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <View>
                                            <TouchableOpacity
                                                style={{
                                                    height: 50,
                                                    width: 70,
                                                    backgroundColor: item.color
                                                }}
                                                onPress={() => {
                                                    setusercolor(item.color)
                                                    console.log(item.color)
                                                    checktone(item.color)

                                                }}>


                                            </TouchableOpacity>


                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {result ?
                        <View>

                            {usercolor ? <View><Text style={{
                                marginTop: 2,
                                fontSize: 15,
                                marginLeft: 15,
                                marginBottom: 10,

                                color: "grey"
                            }}>The skin tone you selected is {tone} tone.</Text>
                                <Text style={{
                                    marginTop: 2,
                                    fontSize: 15,
                                    marginLeft: 15,
                                    marginBottom: 10,

                                    color: "grey"
                                }}>Get products according to your tone.</Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#F7A4A4',
                                        width: 150,
                                        height: 40,
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 5,
                                        marginRight: 10,
                                        alignSelf: "flex-end",
                                        activeOpacity: 0.8,
                                        marginBottom: 20,


                                    }}
                                    onPress={() => {
                                        console.log(tone)
                                        navigation.navigate('Recommend', { toneOfuser: tone, im: im, url: url })
                                    }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{
                                            color: "white",
                                            padding: 3,
                                            fontSize: 15,
                                        }}>Recommendation</Text>
                                    </View>

                                </TouchableOpacity>
                            </View> : <View></View>}

                            <Text style={{
                                marginTop: 2,
                                fontSize: 15,
                                marginLeft: 15,
                                marginBottom: 10,

                                color: "grey"
                            }}>Not happy with your results? Try again.</Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#F7A4A4',
                                    width: 100,
                                    height: 40,
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 5,
                                    marginRight: 10,
                                    alignSelf: "flex-end",
                                    activeOpacity: 0.8,
                                    marginBottom: 20,


                                }}
                                onPress={() => {
                                    navigation.navigate('Skin')
                                }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{
                                        color: "white",
                                        padding: 3,
                                        fontSize: 15,
                                    }}>Try Again</Text>
                                </View>

                            </TouchableOpacity>
                        </View> :
                        <View></View>}
                </View>
            </ScrollView>
        )
    }

    const Recommend = ({ route }) => {
        const [list, setlist] = useState();
        const { toneOfuser, im, url } = route.params
        useEffect(() => {
            axios.get(`${baseURL}products`)
                .then((res) => {
                    setlist(res.data);

                })
            return () => {
                setlist([])
            };
        }, []);
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.primary, height: 40, }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            marginLeft: 15,
                            marginTop: 10,
                            color: 'white'
                        }}>Lips</Text>
                        <Image
                            style={{
                                resizeMode: 'cover',
                                height: 100,
                                width: 100,
                                marginLeft: 40,
                                borderRadius: 50,
                                marginBottom: 5
                            }}
                            source={{
                                uri: 'https://cdn.shopify.com/s/files/1/0276/5317/7437/products/MaybellineColorSensationalLiquidMatteLipstick08SensationallyMe_754x.jpg?v=1605512525',
                            }}
                        />


                    </View>
                    <View>
                        <FlatList
                            data={list ? list.filter((item) => (item.category.categoryName.match("Lips") && item.Skincolor.match(toneOfuser))) : null}
                            extraData={list}
                            horizontal={true}

                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.row}>

                                        <View style={styles.carts}>
                                            <Image
                                                style={styles.productImg}
                                                source={{ uri: item.images[0].imageUrl }}
                                            />

                                            <View>
                                                <Text style={styles.prdtext1}>{item.name}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.prdtext2}>Rs {item.price}</Text>



                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.primary, height: 40, }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            marginLeft: 15,
                            marginTop: 10,
                            color: 'white'
                        }}>Eyes</Text>
                        <Image
                            style={{
                                resizeMode: 'cover',
                                height: 100,
                                width: 100,
                                marginLeft: 40,
                                borderRadius: 50,
                                marginBottom: 5
                            }}
                            source={{
                                uri: 'https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/1/1159688-2_1.jpg',
                            }}
                        />


                    </View>
                    <View>
                        <FlatList
                            data={list ? list.filter((item) => (item.category.categoryName.match("Eyes") && item.Skincolor.match(toneOfuser))) : null}
                            extraData={list}
                            horizontal={true}

                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.row}>

                                        <View style={styles.carts}>
                                            <Image
                                                style={styles.productImg}
                                                source={{ uri: item.images[0].imageUrl }}
                                            />

                                            <View>
                                                <Text style={styles.prdtext1}>{item.name}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.prdtext2}>Rs {item.price}</Text>



                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.primary, height: 40, }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            marginLeft: 15,
                            marginTop: 10,
                            color: 'white'
                        }}>Face</Text>
                        <Image
                            style={{
                                resizeMode: 'cover',
                                height: 100,
                                width: 100,
                                marginLeft: 40,
                                borderRadius: 50,
                                marginBottom: 5
                            }}
                            source={{
                                uri: 'https://cdn.shopify.com/s/files/1/0500/8723/1683/products/0026206_maybelline-fit-me-matteporeless-normal-to-oily-sp.jpg?v=1631346552',
                            }}
                        />


                    </View>
                    <View>
                        <FlatList
                            data={list ? list.filter((item) => (item.category.categoryName.match("Face") && item.Skincolor.match(toneOfuser))) : null}
                            extraData={list}
                            horizontal={true}

                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.row}>

                                        <View style={styles.carts}>
                                            <Image
                                                style={styles.productImg}
                                                source={{ uri: item.images[0].imageUrl }}
                                            />

                                            <View>
                                                <Text style={styles.prdtext1}>{item.name}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.prdtext2}>Rs {item.price}</Text>



                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
                <View style={{ marginTop: 130 }}>
                    <Text style={{
                        marginTop: 2,
                        fontSize: 15,
                        marginLeft: 15,
                        marginBottom: 10,

                        color: "grey"
                    }}>Try the om Virtually.</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F7A4A4',
                            width: 150,
                            height: 40,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                            marginRight: 10,
                            alignSelf: "flex-end",
                            activeOpacity: 0.8,
                            marginBottom: 20,


                        }}
                        onPress={() => {
                            navigation.navigate('Virtual', { im: im, url: url, tone: toneOfuser })
                        }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{
                                color: "white",
                                padding: 3,
                                fontSize: 15,
                            }}>Let's Try</Text>
                        </View>

                    </TouchableOpacity>
                </View>


            </View>
        )
    }
    const Virtual = ({ route }) => {
        const { im, url, tone } = route.params
        const [userimg, setimg] = useState(im)
        const [picurl, seturl] = useState(url)
        const [list, setlist] = useState();
        const [showproducts, setshowproducts] = useState()
        const [products, setproducts] = useState()
        const [rgb, setrgb] = useState()
        const [shades, setshades] = useState()
        const [productshde, setproductshd] = useState()
        useEffect(() => {
            axios.get(`${baseURL}products`)
                .then((res) => {
                    setlist(res.data);

                })
            return () => {
                setlist([])
            };
        }, []);
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
        const req = (n, shade) => {
            console.log(shade)
            const a=shade.match(/\d+/g).map(Number);
    //console.log(Array.isArray(a))
    console.log(a)
            if (n == "Eye Liner") {
                axios
                    .post('http://192.168.100.4:3000/eyeliner', {
                        "url": picurl
                    }, {
                        headers: {
                            Accept: 'application/json'
                        }
                    },
                    )
                    .then((res) => {
                        if (res.status == 200) {

                            console.log(res.data)
                            setimg(res.data)
                            seturl(res.data)
                        }

                        //   console.log("Your Skin Color", res.named_color)

                    }
                    )
                    .catch((err) => {
                        console.log("error", err);
                    });
            }
            if (n == "Blush-On") {
                axios
                    .post('http://192.168.100.4:3000/blush', {
                        "url": picurl,
                        "rgb": a
                    }, {
                        headers: {
                            Accept: 'application/json'
                        }
                    },
                    )
                    .then((res) => {
                        if (res.status == 200) {

                            console.log(res.data)
                            setimg(res.data)
                            seturl(res.data)
                        }

                        //   console.log("Your Skin Color", res.named_color)

                    }
                    )
                    .catch((err) => {
                        console.log("error", err);
                    });
            }
            if (n == "Face") {
                axios
                    .post('http://192.168.100.4:3000/lips', {
                        "url": picurl,
                        "rgb": a
                    }, {
                        headers: {
                            Accept: 'application/json'
                        }
                    },
                    )
                    .then((res) => {
                        if (res.status == 200) {

                            console.log(res.data)
                            setimg(res.data)
                            seturl(res.data)
                        }

                        //   console.log("Your Skin Color", res.named_color)

                    }
                    )
                    .catch((err) => {
                        console.log("error", err);
                    });
           }

        }

        return (
            <ScrollView>

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
                        <Image
                            style={{
                                resizeMode: 'cover',
                                height: 320,
                                width: '83%',
                                marginRight: 11,
                                marginTop: 7,
                                marginLeft: 30
                            }}
                            source={{
                                uri: userimg,
                            }}
                        />
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
                                navigation.navigate("Report", { im: userimg, url: picurl })

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
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                            <TouchableOpacity
                                style={{
                                    height: 150,
                                    width: 150,
                                    margin: 9,
                                    marginTop: 16,
                                    backgroundColor: "#FFACC7",
                                    borderRadius: 5
                                }}
                                onPress={() => {
                                    setshowproducts(true)
                                    setproducts("Face")

                                }}
                            >
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        height: 80,
                                        width: 80,
                                        marginTop: 30,
                                        marginLeft: 30
                                    }}
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/307/307579.png",
                                    }}
                                />
                                <Text style={{ fontSize: 19, color: 'white', fontWeight: 'bold', marginBottom: 10, marginLeft: 38 }}>
                                    Lipstick
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: 150,
                                    width: 150,
                                    margin: 9,
                                    marginTop: 16,
                                    backgroundColor: "#DEBACE",
                                    borderRadius: 5
                                }}
                                onPress={() => {
                                    setshowproducts(true)
                                    setproducts("Eye Liner")

                                }}
                            >
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        height: 80,
                                        width: 80,
                                        marginTop: 30,
                                        marginLeft: 30
                                    }}
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/3258/3258600.png",
                                    }}
                                />
                                <Text style={{ fontSize: 19, color: 'white', fontWeight: 'bold', marginBottom: 10, marginLeft: 38 }}>
                                    Eye Liner
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: 150,
                                    width: 150,
                                    margin: 9,
                                    marginTop: 16,
                                    backgroundColor: "#AF7AB3",
                                    borderRadius: 5
                                }}
                                onPress={() => {
                                    setshowproducts(true)
                                    setproducts("Blush-On")

                                }}
                            >
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        height: 80,
                                        width: 80,
                                        marginTop: 30,
                                        marginLeft: 30
                                    }}
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/2370/2370938.png",
                                    }}
                                />
                                <Text style={{ fontSize: 19, color: 'white', fontWeight: 'bold', marginBottom: 10, marginLeft: 45 }}>
                                    Blush
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: 150,
                                    width: 150,
                                    margin: 9,
                                    marginTop: 16,
                                    backgroundColor: "#B7D3DF",
                                    borderRadius: 5
                                }}
                                onPress={() => {

                                }}
                            >
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        height: 80,
                                        width: 80,
                                        marginTop: 30,
                                        marginLeft: 30
                                    }}
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/3258/3258608.png",
                                    }}
                                />
                                <Text style={{ fontSize: 19, color: 'white', fontWeight: 'bold', marginBottom: 10, marginLeft: 25 }}>
                                    Eyeshadows
                                </Text>

                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                    <View>
                        {showproducts ? <View><TouchableOpacity
                            style={{
                                backgroundColor: '#F7A4A4',
                                width: 150,
                                height: 40,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 5,
                                marginRight: 10,
                                alignSelf: "flex-end",
                                activeOpacity: 0.8,
                                marginBottom: 10,


                            }}
                            onPress={() => {
                                setshowproducts(false)
                            }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{
                                    color: "white",
                                    padding: 3,
                                    fontSize: 15,
                                }}>Close</Text>
                            </View>

                        </TouchableOpacity>
                            <FlatList
                                data={list ? list.filter((item) => (item.category.categoryName.match(products) && item.Skincolor.match(tone) || item.subCategory.subcategoryName.match(products) && item.Skincolor.match(tone))) : null}
                                extraData={list}
                                horizontal={true}

                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                flexWrap: 'wrap',
                                                flexBasis: '50%',
                                                marginBottom: 20
                                            }}>

                                                <TouchableOpacity style={styles.carts}
                                                    onPress={() => {
                                                        // req(products)
                                                        //console.log(item.name)
                                                        //    setproductshd(item.name)
                                                        //    console.log(productshde)
                                                        //    setshades(true)
                                                    }}>
                                                    <Image
                                                        style={styles.productImg}
                                                        source={{ uri: item.images[0].imageUrl }}
                                                    />

                                                    <View>
                                                        <Text style={styles.prdtext1}>{item.name}</Text>
                                                    </View>


                                                </TouchableOpacity>
                                            </View>
                                            <Text>shades</Text>
                                            <View>
                                                {item.shade.map(i => (
                                                    <View
                                                        key={i._id}
                                                       ><TouchableOpacity  style={{

                                                        borderRadius: 10,
                                                        marginTop: 15,
                                                        backgroundColor: i.shade,
                                                    }}
                                                    onPress={()=>{req(products, i.shade)}}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 15,
                                                                color: '#333',
                                                                fontWeight: '700',
                                                                paddingLeft: 5,
                                                            }}>
                                                            {i.name}

                                                        </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>

                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            /></View> : <View></View>}
                        {shades ? <View><TouchableOpacity
                            style={{
                                backgroundColor: '#F7A4A4',
                                width: 150,
                                height: 40,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                alignSelf: "flex-end",
                                activeOpacity: 0.8,
                                marginBottom: 20,


                            }}
                            onPress={() => {
                                setshades(false)
                            }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{
                                    color: "white",
                                    padding: 3,
                                    fontSize: 15,
                                }}>Close</Text>
                            </View>

                        </TouchableOpacity>
                            <FlatList
                                data={list ? list.filter((item) => (item.shade.match(productshde))) : null}
                                extraData={list}
                                horizontal={true}

                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            flexWrap: 'wrap',
                                            flexBasis: '50%',
                                            marginBottom: 90
                                        }}>

                                            <TouchableOpacity style={styles.carts}
                                                onPress={() => {
                                                    setshades(true)
                                                }}>


                                                <View>
                                                    <Text style={styles.prdtext1}>{item.shades}</Text>
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            /></View> : <View></View>}
                    </View>


                </View>
            </ScrollView>
        );
    };
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="First" component={First} />
            <Stack.Screen name="Skin" component={Skin} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="Recommend" component={Recommend} />
            <Stack.Screen name="Virtual" component={Virtual} />



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
    carts: {
        backgroundColor: "#f5dfe6",
        borderRadius: 10,
        width: 100,
        height: 150,
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
        height: 80,
        width: 80,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 8,
        borderRadius: 10
    },
    prdtext1: {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 3,
        marginLeft: 9,
    },
    prdtext2: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 9,
        marginLeft: 9,
    },
});