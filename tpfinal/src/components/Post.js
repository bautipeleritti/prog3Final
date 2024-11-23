import react, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            texto: '',
            like: false,
            cantidad: this.props.dataPost.data.likes.length
        };
    }

    componentDidMount() {
        if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
    }


    handleLike() {
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.props.dataPost.data.email)
        })
            .then(() => this.setState({
                like: true,
                cantidad: this.props.dataPost.data.likes.length
            }))
    }

    handleUnLike() {
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(this.props.dataPost.data.email)
        })
            .then(() => this.setState({
                like: false,
                cantidad: this.props.dataPost.data.likes.length
            }))
    }



    render() {
        const userEmail = auth.currentUser.email;
        const infoPost = this.props.dataPost.data;
        return (
            <View style={styles.box}>

                <Text style={styles.email}>Posteo de: {infoPost.email}</Text>
                <Text style={styles.texto}>Post: {infoPost.texto}</Text>
                {this.state.like ? <TouchableOpacity onPress={() => this.handleUnLike()}>
                    <Text style={styles.LikeButton}>Dislike</Text>
                </TouchableOpacity> : <TouchableOpacity onPress={() => this.handleLike()}>
                    <Text style={styles.LikeButton}>Like</Text>
                </TouchableOpacity>}
                <Text style={styles.CantDeLikes}>Cantidad de likes :{this.state.cantidad}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    box: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    email: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 14,
        color: 'lightblue',
    },
    texto: {
        fontSize: 16,
        color: 'black'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    LikeButton: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
    },
    CantDeLikes: {
        fontSize: 14,
        color: 'gray',
    },
});



export default Post;
