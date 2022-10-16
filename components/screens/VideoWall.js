import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, FlatList,Image, SafeAreaView,ScrollView ,ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';
import COLORS from '../const/colors';
import { SliderBox } from 'react-native-image-slider-box';
import { useScrollToTop } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';

export default function VideoWall({navigation}) {
  const [getcondition, setcondition] = useState(true);

      const [getImage, setImage] = useState([
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/makeup-design-template-42dee198feed2d0837c0f3b64178c24a_screen.jpg?ts=1597977980',
        'https://img.freepik.com/free-vector/realistic-makeup-artist-youtube-thumbnail-template_23-2149379508.jpg?w=2000',
        'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/6065b70db02c2_json_image_1617278733.webp',
      ]);
      const [getfeed, setfeed] = useState();
      useEffect(() => {
        axios.get(`${baseURL}video/getVideo`)
        .then((res)=>{
          setcondition(false)
          console.log(res.data);
          setfeed(res.data);
        })
        return()=>{
          setfeed([])
        };
      }, [getcondition]);
      const ref = React.useRef(null);
      useScrollToTop(ref);

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
          marginRight:100,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        
        }}
        ImageComponentStyle={{ borderRadius: 15, width: '83%', marginTop: 5 }}
        imageLoadingColor="#2196F3"
      />
      </View>
       <View style={{marginTop:10, paddingTop:5, marginLeft:10}}>
            <Text style={styles.text4}>Videos Tutorial Here</Text>
            </View>
      
           <FlatList
           ref = {ref}
            data={getfeed}
            renderItem={({ item }) => {
              return (
                <View style={styles.postView}>
                  <View style={styles.postTitle}>
                  <View style={styles.imageView}>
                  <Image style={styles.profilepic} source={{uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/makeup-design-template-42dee198feed2d0837c0f3b64178c24a_screen.jpg?ts=1597977980"}}/>
                  <View style={styles.titleView}>
                    <Text style={styles.titlename} >{item.BrandName}</Text>
                    <Text style={styles.post_title} >Click to Watch Video</Text>

                  </View>
                  </View>
                  <View>
                    <Icon name="options-vertical" color="green"/>
                  </View>
                    
                  </View>
                  <TouchableOpacity style={styles.coverButton} onPress={()=>{navigation.navigate('Video Description',{data:item})}}>
                  <Image style={styles.coverPhoto} source={{uri:item.coverPhoto}}/>
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
  titlename:{
    fontSize:16,
    fontWeight:"bold"
  },
  post_title:{
    fontSize:11,
    color:"grey",

  },
  postView:{
    width:"100%",
    alignItems:"center",
    marginTop:40

  },
  postTitle:{
    width:"90%",
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",



  },
  imageView:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
    
  },
  profilepic:{
    backgroundColor:'green',
    width:50,
    height:50,
    borderRadius:50

  },
  titleView:{
    marginLeft:15

  },
  coverPhoto:{
    width:"100%",
    height:"100%",
    borderRadius:20,
    


  },
  text4: {
    fontSize: 20,
    marginRight: 190,
    textAlign: "left",
    fontWeight:"bold",
    marginTop:10,
    width:"100%",
    padding:5
  },
  coverButton:{
    width:"90%",
    height:200,
    backgroundColor:'green',
    borderRadius:20,
    marginTop:10
    
  }

});