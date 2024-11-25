import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        this.props.navigation.navigate('Login');
      }
    });
  }

  handleSubmitLogin = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Por favor completa todos los campos' });
      return;
    } else if (password.length < 6) {
      this.setState({ error: "La contraseña tiene menos de 6 caracteres" });
      return;
    } else if (!email.includes("@")) {
      this.setState({ error: "Completa con un email válido" })

    }
    this.setState({ loading: true, error: '' })

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('HomeMenu');
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  render() {
    const { email, password, error, loading } = this.state;

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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={this.handleSubmitLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

        )}


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
    backgroundColor: 'darkblue',
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
