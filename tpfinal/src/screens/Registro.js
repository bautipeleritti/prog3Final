import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { auth, db } from '../firebase/config'

export class Registro extends Component {
  constructor(props) {
    super(props)


    this.state = {
      email: " ",
      password: " ",
      userName: " ",
      registered: false,
      errMsg: ""
    };

  }
  onSubmit = () => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        if (response) {
          db.collection('users').add({
            email: this.state.email,
            userName: this.state.userName,
            createdAt: Date.now()
          })
            .then((response) => {
              this.setState({ registered: true, errMsg: "" })
              this.props.navigation.navigate('Login')
            })
            .catch((error) => {
              console.log(error.message);
              this.setState({ errMsg: error.message });
            });
        }
      })


  }

  render() {
    return (
      <View style={styles.box}>
        <Text> Crea una cuenta!</Text>

        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}

        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='userName'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <TouchableOpacity onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text> Registrarte </Text>
        </TouchableOpacity>
        {this.state.errMsg && <Text>{this.state.errMsg}</Text>}
        <TouchableOpacity style = {styles.Registerbutton} 
        onPress={() => this.props.navigation.navigate("Login")}><Text>Ir a login</Text></TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '25%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  box:{
    
  }
})

export default Registro