import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import{createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './src/firebase/config';
import Registro from './src/screens/Registro';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import CrearPost from './src/screens/CrearPost';
import Profile from './src/screens/profile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      EnSesion: false
    }
  }
  
 // componentDidMount(){
  //  auth.onAuthStateChanged((usuario))
 // }
  
  
  render(){
  return (

<View style={styles.container}>
  <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Perfil" component= {Profile} />
        <Stack.Screen name="Home" component= {Home} />
        <Stack.Screen name="Login" component= {Login} />
        <Stack.Screen name="CrearPost" component= {CrearPost} />
       
      </Stack.Navigator>

  </NavigationContainer>
  </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"lightblue",
    fontFamily:'Arial, sans-serif'
  },
});

