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
          <View style={styles.container}>
              <TextInput
                  style={styles.input}
                  placeholder="Busca algún usuario"
                  value={this.state.filterValue}
                  onChangeText={this.handleFilterChange}
              />
              {this.state.loading ? (
                  <ActivityIndicator />
              ) : this.state.usuariosFiltrados.length > 0 ? (
                  <FlatList
                      data={this.state.usuariosFiltrados}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => <View style={styles.userCard}> <Text style={styles.userItem}>{item.data.email}</Text> </View>}
                  />
              ) : (
                  <Text style= {styles.title}>El email que estas buscando no existe.</Text>
              )}
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "lightgrey",
        padding: 15,
        borderRadius: 15,
        paddingLeft: "20%",
    paddingRight: "20%",
    },
    title: {
        fontSize: 20,
        fontWeight: 100
    },
  input: {
    backgroundColor: "white",
    padding: 16,
      marginBottom: 10,
      paddingHorizontal: 8,
      fontSize: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      textAlign: 'center',
  },
  userItem: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: '500',
      textAlign:'center'
  },
  userCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignContent: 'center',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    


  }
})