import React, { Component } from 'react'
import { Text, View } from 'react-native-web'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';

import Profile from '../screens/Profile';
import { auth } from '../firebase/config';
import CrearPost from '../screens/CrearPost';
import { Users } from '../screens/Users';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';

const Tab = createBottomTabNavigator();
export class HomeMenu extends Component {

  constructor(){
    super()
    this.state={

    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((usuario) => {
      if (!usuario) {
        this.props.navigation.navigate("Login")
      }

    }
    )
  } 






  render() {
    return (

      <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel:false}}>
        <Tab.Screen name= "Menu" component={Home} options={{tabBarIcon:()=> <Ionicons name="home" size={24} color="darkblue" />}}/>
        <Tab.Screen name= "Nuevo Posteo" component={CrearPost} options={{tabBarIcon: () => <Entypo name="new-message" size={24} color="darkblue" />}}/>
        <Tab.Screen name= "Usuario" component={Users} options={{tabBarIcon: () => <Fontisto name="search" size={24} color="darkblue" />}}/>
        <Tab.Screen name= "Perfil" component={Profile} options={{tabBarIcon: () => <Ionicons name="person" size={24} color="darkblue" />}}/> 

      </Tab.Navigator>
    )
  }
}

export default HomeMenu