import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { auth, db } from '../firebase/config'

export class Registro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      userName: "",
      registered: false,
      errMsg: ""
    };

  }

  componentDidMount() {
    auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        this.props.navigation.navigate("HomeMenu")
      }

    }
    )
  }



  onSubmit = () => {
    const { email, password, userName } = this.state

    if (!email || !userName || !password) {
      this.setState({ errMsg: 'Falta que completes los campos' });
      return;
    } else if (password.length < 6) {
      this.setState({ errMsg: "La contraseña tiene menos de 6 caracteres" });

      return;
    } else if (!email.includes("@")) {
      this.setState({ errMsg: "Completa con un email válido" })

    }

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

              this.setState({ errMsg: error.message });
            });
        }
      })


  }

  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.title}> Crea una cuenta!</Text>

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
          <Text style={styles.RegistButton}> Registrarte </Text>
        </TouchableOpacity>
        {this.state.errMsg && <Text style={styles.errorText}>{this.state.errMsg}</Text>}
        <TouchableOpacity style={styles.botonX} onPress={() => this.props.navigation.navigate("Login")}><Text style={styles.registerText}>Ya tenes cuenta? Inicia sesión</Text></TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    paddingBottom: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: "black",

  },
  RegistButton: {
    borderRadius: 8,
    marginTop: 10,
    padding: 15,
    backgroundColor: "darkblue",
    width: "100%",
    height: 50,
    color: "white",
    fontWeight: 'bold',
    fontSize: 20
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: 'white'
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 20,
  },
  botonX: {
    paddingTop: 20
  },
  registerText: {
    color: "darkblue",
    fontSize: 15
  }
})

export default Registro