import React, { Component } from 'react'
import {View, TextInput, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { auth } from '../firebase/config';
export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        this.props.navigation.navigate("Home")
      }
    
    }
  )}
  handleSubmitLogin = () => {
    const {email, password} = this.state
    this.setState({error: ''})
    auth.signInWithEmailAndPassword(email,password).then(() => {
      this.props.navigation.navigate("Home")
    }).catch((error) => {
      this.setState({error: "Incorrecto"})
    })
  }
  render() {
    return (
      <View style ={styles.box}>
        <Text>Login</Text>
        <TextInput style = {styles.input}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => this.setState({email:text})}
        value = {this.state.email}/>
        <TextInput style={styles.input}
        keyboardType='default'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => this.setState({password:text})}
        value={this.state.password} />
       <Text>{this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}</Text>

        <TouchableOpacity style = {styles.RegistButton} onPress={()=> this.handleSubmitLogin()}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.RegistButton} 
        onPress={() => this.props.navigation.navigate("Register")}>
          <Text style= {styles.title}>
            Si no tenes cuenta, Registrate acá
          </Text>
          </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent:'center',
  },
  RegistButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    width: '25%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
    backgroundColor:'white'
  },
  box:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'lightblue'

    
  }
});

export default Login