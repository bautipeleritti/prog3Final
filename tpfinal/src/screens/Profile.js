import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      email: auth.currentUser.email,
      posteos: [],
    };
  }

  componentDidMount() {
    const user = auth.currentUser;

    if (user) {
      db.collection('users')
        .where("email", "==", user.email)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            this.setState({
              name: doc.data().userName || "Usuario sin nombre", 
            });
          });
        });

      db.collection("posts")
        .where("email", "==", user.email)
        .onSnapshot((docs) => {
          let posts = [];
          docs.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data(), 
            });
          });
          posts.sort((a, b) => b.data.createdAt - a.data.createdAt);
          this.setState({ posteos: posts });
        });
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  handleDeletePost(postId) {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post eliminado correctamente");
      })
      .catch((error => console.log(error)));
  }

  handleLogout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate("Login"))
      .catch((e) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Mi Perfil</Text>
        <Text style={styles.info}>Nombre de usuario: {this.state.name}</Text>
        <Text style={styles.info}>Email: {this.state.email}</Text>
        <Text style={styles.info}>Cantidad de posteos: {this.state.posteos.length}</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postContent}>{item.data.texto || "Sin contenido"}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  post: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
