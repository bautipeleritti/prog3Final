import react, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Post from "../components/Post";
import { db } from "../firebase/config";
import { TouchableOpacity } from "react-native";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
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
    


    render() {
        return (
            <View>
                <Text> Bienvenido a Home </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.button}>
        <Text>Ir a Mi Perfil</Text>
      </TouchableOpacity>

                {this.state.loading ? <ActivityIndicator /> : <FlatList data={this.state.posts} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post dataPost={item} />} />}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("CrearPost")}><Text>Crear Post</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Home;