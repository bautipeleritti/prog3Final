import react, {Component} from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList,TextInput } from "react-native";
import { db, auth } from '../firebase/config';


class CrearPost extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            texto:'',

              
        };
    }

    posteos(email,texto){
        db.collection('posts').add({
            email: email,
            texto: texto,
            likes: [],
            createdAt: Date.now(),
            })
    }
      
     

    render(){
        return(
        <View style={styles.form}>
            <Text>Nuevo Posteo</Text>
            <TextInput style={styles.field}
            keyboardType='default'
            placeholder='Postea algo'
            onChangeText={ text => this.setState({texto:text})}
            value={this.state.texto}/>
            <TouchableOpacity onPress={() => this.posteos(auth.currentUser.email, this.state.texto)} style={styles.boton}>    
            <Text style={styles.botonT}>POSTEAR</Text>
            </TouchableOpacity>
        </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    field:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderCurve: 6,
        marginVertical: 10
    },
    boton:{
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderCurve: 4,
        borderWidth: 1,
        borderStyle:'solid',
        borderColor: '#28a745'
    },
    botonT:{
        color: '#fff'
    }
  });

export default CrearPost;