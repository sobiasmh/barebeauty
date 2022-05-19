import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View ,ImageBackground, TouchableOpacity} from 'react-native';
import Home from './components/screens/Home';
import LoginScreen from './components/screens/LoginScreen';
import BottomNavigator from './components/navigation/BottomNavigator';


export default function App() {

  

  

const Stack = createNativeStackNavigator();
  const StackNav = () => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown: false}}
        >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Home" component={BottomNavigator} />

        
        
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
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
