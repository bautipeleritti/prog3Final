import react, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            texto:'',      
        };
    }

    render(){
        const userEmail = auth.currentUser.email;
        const infoPost = this.props.dataPost.data;
        return (
            <View style={styles.postContainer}>
                <Text>Posteo</Text>
                <Text style={styles.email}>Usuario: {infoPost.email}</Text>
                <Text style={styles.texto}>Post: {infoPost.texto}</Text>
                
            </View>
        );
    };
    }

    const styles = StyleSheet.create({
        postContainer: {
            padding: 15,
            marginVertical: 8,
            backgroundColor: '#f1f1f1',
            borderRadius: 5,
        },
        email: {
            fontWeight: 'bold',
            marginBottom: 5,
        },
        texto: {
            fontSize: 16,
        },
    });

    export default Post;
