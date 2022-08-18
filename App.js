import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';
import Home from './components/screens/Home';
import Start from './components/screens/Start';
import BottomNavigator from './components/navigation/BottomNavigator';

import Toast from 'react-native-toast-message';
// context api
import Auth from './context/store/Auth';

export default function App() {

  

  

const Stack = createNativeStackNavigator();
  const StackNav = () => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown: false}}
        >
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Home" component={BottomNavigator} />

        
        
      </Stack.Navigator>
    );
  };

  return (
    <Auth>
      <NavigationContainer>
        <StackNav />
        <Toast refs={(refs)=> Toast.setRef(refs)}/>
      </NavigationContainer>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backimg: {
    height: 700,
    width: 400

  },
  text: {
    color: "white",
    fontSize: 60,
    marginTop: 415,
    marginLeft: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  text2: {
    color: "white",
    fontSize: 20,
    marginLeft: 30,
    textAlign: "left",
  }
});
