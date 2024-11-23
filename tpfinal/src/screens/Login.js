import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        this.props.navigation.navigate('Home');
      }
    });
  }

  handleSubmitLogin = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Por favor completa todos los campos' });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '' });
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        this.setState({ error: "error"});
      });
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={email}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={password}
        />


        <TouchableOpacity style={styles.loginButton} onPress={this.handleSubmitLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => this.props.navigation.navigate('Registro')}
        >
          <Text style={styles.registerText}>Si no tenés cuenta, registrate acá</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: 'darkblue',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
