import react, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Post from "../components/Post";
import { db, auth } from "../firebase/config";
import { TouchableOpacity } from "react-native";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            email: auth.currentUser,
            loading: true,
        };
    }



    componentDidMount() {

        this.setState({
            loading: true
        });

        db.collection('posts').onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                posts: posts,
                loading: false,
            })
        }
        )
    }
    
goToProfile = () => {
    const currentUser = auth.currentUser; 
    if (currentUser) {
      this.props.navigation.navigate("Perfil", { email: currentUser.email }); 
    } else {
      console.error("No hay un usuario autenticado.");
    }
  };
    


    render() {
        return (
            <View>
                <Text> Bienvenido a Home </Text>
                <TouchableOpacity onPress={this.goToProfile}>
      <Text>Ir a Mi Perfil</Text>
      </TouchableOpacity>

                {this.state.loading ? <ActivityIndicator /> : <FlatList data={this.state.posts} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post dataPost={item} />} />}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("CrearPost")}><Text>Crear Post</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Home;