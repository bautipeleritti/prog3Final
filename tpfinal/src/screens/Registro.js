import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { auth } from '../firebase/config'

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
  handleSubmit(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => this.setState({ registered: true, errMsg: "" }))
      .catch((error) => {
        console.log(error.errMsg);
        this.setState({ errMsg: error.errMsg });
      });

  }

  render() {
    return (
      <View>
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
          keyboardType=''
          placeholder='userName'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <TextInput 
          style={styles.input}
          keyboardType='default'
          placeholder=''
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

      </View>
    )
  }
}

const styles= StyleSheet.create({

})

export default Registro