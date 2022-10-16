import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

import COLORS from '../const/colors';
import {
  logOutUser

} from '../../Redux/Actions/UserAction';


const CustomDrawer = props => {
  const {user, error} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
    if (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again"
      });
    }
    props.navigation.navigate("StartScreen")

    Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Logout Successful",
        text2: ".",
      });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        >
        <View style={{padding: 20, flexDirection:"row"}}>
          <Image
            source={{        
                uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/fa0c25119217391.60993ce2a3cc6.jpg"
            }}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style={{color: COLORS.primary,
                        fontSize: 22,
                        marginTop: 45,
                        marginLeft: 10,
                        fontWeight: "bold",
                        textAlign: "left",}}>BareBeauty.</Text>
        </View>
        
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        
        <TouchableOpacity onPress={() => {logOut()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;