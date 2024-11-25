import React, { Component } from 'react'
import { Text, View } from 'react-native-web'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Post from './Post';
import Profile from '../screens/Profile';
import { auth } from '../firebase/config';
import CrearPost from '../screens/CrearPost';



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

      <Tab.Navigator>
        <Tab.Screen name= "Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name= "Nuevo Posteo" component={CrearPost} options={{}}/>
       {/* <Tab.Screen name= "Usuarios" component={Users} options={{}}/>*/}
        <Tab.Screen name= "Profile" component={Profile} options={{}}/> 

      </Tab.Navigator>
    )
  }
}

export default HomeMenu