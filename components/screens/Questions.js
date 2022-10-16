import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../const/colors';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';

export default function Questions({ navigation, route }) {
    const [quesData, setquesData] = useState(route.params.data);
    const [getans, setans] = useState()
    const [getcondition, setcondition] = useState(false);
    const { user } = useSelector(state => state.user);

    //Ans
    const sendAns = () => {
        console.log(quesData._id);
        if (user?._id != undefined) {

        setcondition(true)

        axios
            .post(`${baseURL}question/newAns`, {
                userAnswer: getans,
                quesId: quesData._id
            })
            .then((res) => {
                if (res.status == 200) {
                    setcondition(false)
                    console.log(res);
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: `Answer posted successfully`,
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
            <ScrollView>
                <View style={{ padding: 3 }}>
                    <View style={styles.header}>
                        <Icon name="ios-chatbubbles-sharp" color={COLORS.primary} size={40} />
                        <Text style={styles.text4}>User's Question</Text>
                    </View>
                </View>

                <View style={styles.cartCard}>
                    <View>
                        <Image
                            source={{ uri: quesData.userImg }}
                            style={{ height: 80, width: 80, borderRadius: 100 }}
                        />
                    </View>
                    <View
                        style={{
                            height: 100,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black" }}>
                            {quesData.userName}
                        </Text>
                        <Text style={{ fontSize: 15, color: 'black' }}>
                            {quesData.userQues}
                        </Text>

                    </View>

                </View>
                <View style={{ marginTop: 15, padding: 5 }}>
                    <TextInput
                        placeholder="Write your answer here..."
                        style={{
                            margin: 5,
                            padding: 8,
                            backgroundColor: 'white',
                            color: 'grey',
                            shadowColor: '#000',
                            height: 53,
                            borderRadius: 10,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        onChangeText={setans}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={styles.buttonstyle}
                        onPress={() => {
                            sendAns()
                        }}>
                        <Text style={styles.buttontext}>Answer</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, paddingTop: 5, marginLeft: 10 }}>
                    <Text style={styles.text4}>User's Answers</Text>
                </View>
                <View>
                    {quesData.Answer.map(i => (
                        <View
                            key={i._id}
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
                                {i.name}
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#555',
                                        fontWeight: '600',
                                        paddingLeft: 5,
                                    }}>
                                    {'  '}
                                    {i.userAnswer}
                                </Text>
                            </Text>

                        </View>
                    ))}
                </View>
            </ScrollView>





        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    text4: {
        fontSize: 20,
        marginRight: 190,
        textAlign: "left",
        fontWeight: "bold",
        marginTop: 10,
        width: "100%",
        padding: 5
    },
    cartCard: {
        height: 120,
        borderRadius: 10,
        elevation: 15,
        backgroundColor: "#ffff",
        marginVertical: 2,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
});