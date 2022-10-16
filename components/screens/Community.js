import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity, FlatList,Image, ActivityIndicator, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';

export default function Community({navigation}) {
  const[getQues, setQues] = useState()
  const[getQuesList, setQuesList] = useState()
  const [getcondition, setcondition] = useState(true);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    axios.get(`${baseURL}question/getQues`).then((res) => {
      setcondition(false);

      console.log(res.data);
      setQuesList(res.data);

    });
    return () => {
      setQuesList([]);
    };
  }, [getcondition]);
 //Question
 const sendQuestion = () =>{
  if (user?._id != undefined) {
  setcondition(true)
  axios
  .post(`${baseURL}question/newQues`, {
    userQues: getQues
  })
  .then((res) => {
    setcondition(false);

    if(res.status==200){
    console.log(res);
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `Question posted successfully`,
    });

    }
  })
  .catch((err) => {
    console.log(err);
  });
}
else{
  navigation.navigate("LoginScreens")

}
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
       <View style={{ marginTop: 15, padding: 5 }}>
            <TextInput
              placeholder="What's on your mind?..."
              style={{
                margin: 5,
                padding: 8,
                backgroundColor: 'white',
                color: 'grey',
                shadowColor: '#000',
                height: 53,
                borderRadius:10,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              onChangeText={setQues}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                sendQuestion()
              }}>
              <Text style={styles.buttontext}>Ask</Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 6 }}>
          <View style={styles.header}>
          <Icon name="ios-chatbubbles-sharp" color={COLORS.primary} size={40} />
            <Text style={styles.text4}>User's Questions</Text>
          </View>
        </View>

        <View style={{ marginTop: 8, flex:1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={getQuesList}
              extraData={getQuesList}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cartCard}>
                    <View>
                      <Image
                        source={{ uri: item.userImg }}
                        style={{ height: 80, width: 80 , borderRadius:100}}
                      />
                    </View>
                    <View
                      style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                      }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18, color:"white" }}>
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 15, color: 'white' }}>
                        {item.userQues}
                      </Text>
                      <View style={{flexDirection:"row",justifyContent:"flex-start", padding:4}}>
                    <Icon name="ios-eye-sharp" color={COLORS.primary} size={25} onPress={()=>{navigation.navigate('Questions',{data:item})}} />
                    <Text style={{ fontSize: 15, color: COLORS.primary, padding :5}}>
                        View
                      </Text>
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
    backgroundColor: '#fff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  text4: {
    fontSize: 20,
    marginRight: 190,
    textAlign: "left",
    fontWeight:"bold",
    marginTop:10,
    width:"100%",
    padding:5
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cartCard: {
    height: 150,
    borderRadius:10,
    elevation: 15,
    backgroundColor: "#fcb8d4",
    marginVertical: 7,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

});