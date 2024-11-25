import react, {Component} from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList,TextInput } from "react-native";
import { db, auth } from '../firebase/config';


class CrearPost extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            texto:'',
            Publicacion: ''

              
        };
    }

    posteos(email,texto){
        db.collection('posts').add({
            email: email,
            texto: texto,
            likes: [],
            createdAt: Date.now(),
            }).then(()=> {
                this.setState({
                    Publicacion: 'Tu posteo se ha publicado con éxito',
                    texto: ''
                }).catch((error) => {
                    console.error("error al publicar ", error)
                })
            })
    }
      
     

    render(){
        return(
        <View style={styles.form}>
            <Text style = {styles.title}>Nuevo Posteo</Text>
            <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Postea algo'
            onChangeText={ text => this.setState({texto:text})}
            value={this.state.texto}/>
            <TouchableOpacity 
            onPress={() => this.posteos(auth.currentUser.email, this.state.texto)} 
            style={styles.boton}>    
            <Text style={styles.botonT}>POSTEAR</Text>
            {this.state.Publicacion ? (
                <Text style={styles.post}>{this.state.Publicacion}</Text>
            ): null }
            </TouchableOpacity>
        </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    post: {
        fontSize: 25,
        fontWeight: 20,
        color: 'lightgrey'
    },
    form: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
    },
    input:{
        width: '100%',
        height: 50,
        paddingVertical: 15,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#dd',
        backgroundColor: 'white',
        marginVertical: 10
    },
    boton:{
        backgroundColor: 'darkblue',
        marginTop: 20,
        paddingVertical: 12,
        textAlign: 'center',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    botonT:{
        color: '#fff', 
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title: {
       fontSize: 30,
       fontWeight: 'bold',
       color: '#333',
       textAlign: 'center',
       marginBottom: 20, 
    }
  });

export default CrearPost;