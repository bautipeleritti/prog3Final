import react, {Component} from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Post from "../components/Post";
import { db } from "../firebase/config";

class Home extends Component{
    constructor() {
        super();
        this.state = {
            

              
        };
    }
    


    componentDidMount(){
        
    }


    render(){
        return(
        <View>
            <Text> Home</Text>
           
        </View>
    )}
}

export default Home;