import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import{createNativeStackNavigator} from '@react-navigation/native-stack';
import { auth } from './src/firebase/config';
import Registro from './src/screens/Registro';
import Login from './src/screens/Login';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Login" component= {Login} />
       
      </Stack.Navigator>

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
});
