import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Shop from '../screens/Shop';
import Watch from '../screens/Watch';
import profile from '../screens/profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import { color } from 'react-native-reanimated';
import Loginscreens from '../screens/Loginscreens';
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
    tabBarStyle: { 
      height:55,
     },
    
  }}
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          headerShown:false,
          headerTitleStyle:{
            fontSize:28,
            fontWeight:"bold",
            color:COLORS.primary

          },
          headerStyle:{
            backgroundColor:COLORS.lightprimary,
            
          },
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          headerShown:false,
          tabBarIcon: ()=> (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.white} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Watch"
        component={Watch}
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon name="videocam" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreens"
        component={Loginscreens}
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon name="person-pin" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
