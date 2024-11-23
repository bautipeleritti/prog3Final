import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
      posteos: [],
    };
  }

  componentDidMount() {
    db.collection('posts')
      .where('userEmail', '==', this.state.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ posteos: posts });
      });
  }

  handleDeletePost(postId) {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        alert('Post eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error eliminando el post:', error);
      });
  }

  handleLogout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login'); 
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Mi Perfil</Text>
        <Text>Usuario: {this.state.email}</Text>
        <Text>Cantidad de posteos: {this.state.posteos.length}</Text>

        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text>{item.data.content}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDeletePost(item.id)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Button title="Logout" onPress={() => this.handleLogout()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  post: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
 
});
