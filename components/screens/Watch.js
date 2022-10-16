import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

import COLORS from '../const/colors'

import Wall from './Wall';
import Reviews from './Reviews';
import QuesWall from './QuesWall';


export default ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator
     
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: {
            fontSize: 12,
            color: 'grey',
            activeTintColor: COLORS.primary,
          },
          tabBarItemStyle: { height: 60 },
          tabBarStyle: { backgroundColor: '#fcdce9' , margin:10, borderRadius:6},
          tabBarIndicatorStyle: { backgroundColor: COLORS.primary, height: 3 },
          swipeEnabled: true,
        }}>
        <Tab.Screen
          name="Wall"
          component={Wall}
          
          options={{
            title: ({ color, focused }) => (
              <Icons
                size={25}
                name={focused ? 'camera' : 'camera-outline'}
                color={focused ? COLORS.primary : '#bfa8b2'}
                style={{ padding: 5 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="QuesWall"
          component={QuesWall}
          options={{
            title: ({ color, focused }) => (
              <Icons
                size={25}
                name={
                  focused
                    ? 'ios-chatbubbles-sharp'
                    : 'ios-chatbubbles-outline'
                }
                color={focused ? COLORS.primary : '#bfa8b2'}
                style={{ padding: 5 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reviews"
          component={Reviews}
          options={{
            title: ({ color, focused }) => (
              <Icons
                size={25}
                name={focused ? 'ios-heart' : 'ios-heart-outline'}
                color={focused ? COLORS.primary : '#bfa8b2'}
                style={{ padding: 5 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

  
