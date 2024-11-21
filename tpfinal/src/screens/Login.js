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
      <View style ={StyleSheet.container}>
        <Text>Login</Text>
        <TextInput style = {styles.Userinput}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => this.setState({email:text})}
        value = {this.state.email}/>
        <TextInput style={styles.Userinput}
        keyboardType='default'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => this.setState({password:text})}
        value={this.state.password} />
       <Text>{this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}</Text>

        <TouchableOpacity style = {styles.Loginbutton} onPress={()=> this.handleSubmitLogin()}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Registerbutton} 
        onPress={() => this.props.navigation.navigate("Register")}>
          <Text style= {styles.Registertext}>
            Si no tenes cuenta, Registrate acá
          </Text>
          </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  Userinput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  Loginbutton: {
    backgroundColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  Registerbutton: {
    marginTop: 10,
  },
  Registertext: {
    color: '#cc',
    textAlign: 'center',
  },
});

export default Login