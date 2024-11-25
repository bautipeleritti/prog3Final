import React, { Component } from 'react'
import { db } from '../firebase/config'
import { ActivityIndicator, FlatList, View, Text, TextInput, StyleSheet } from "react-native";




export class Users extends Component {
  constructor() {
      super();
      this.state = {
          users: [],
          usuariosFiltrados: [],
          filterValue: "",
          loading: true,
      };
  }

  componentDidMount() {
      db.collection('users').onSnapshot(docs => {
          let users = [];
          docs.forEach(doc => {
              users.push({
                  id: doc.id,
                  data: doc.data(),
              });
          });
          this.setState({
              users: users,
              usuariosFiltrados: users,
              loading: false,
          });
      });
  }

  handleFilterChange = (value) => {
      this.setState({
          filterValue: value,
          usuariosFiltrados: this.state.users.filter(user => user.data.email.toLowerCase().includes(value.toLowerCase())
          ),
      });
  };

  

  render() { 
  
      return (
          <View>
              <TextInput
                  style={styles.input}
                  placeholder="Busca algun usuario"
                  value={this.state.filterValue}
                  onChangeText={this.handleFilterChange}
              />
              {this.state.loading ? (
                  <ActivityIndicator />
              ) : this.state.usuariosFiltrados.length > 0 ? (
                  <FlatList
                      data={this.state.usuariosFiltrados}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => <Text style={styles.userItem}>{item.data.email}</Text>}
                  />
              ) : (
                  <Text>El email que estas buscando no existe.</Text>
              )}
          </View>
      );
  }
}

const styles = StyleSheet.create({
  input: {
      marginBottom: 10,
      paddingHorizontal: 8,
      fontSize: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
  },
  userItem: {
      fontSize: 18,
      marginBottom: 5,
  },
})