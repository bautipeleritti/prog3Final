import { StyleSheet,Text,View,FlatList } from "react-native"

class Home extends Component{
    constructor(props){
        super(props)

        this.state ={
            posts: []
        }
        }
    }

  //  componentDidMount(){
   //     db.collection('posts').onSnapshot(
    //        docs => {
    //            let posts = []
     //           docs.forEach(doc => {
      //              posts.push({
       //                 id: doc.id,
        //                data: doc.data()
        //            })
         //       })
          //  }
       // )
   // }



    //render(){
    //return(
     //   <p>Hla</p>
      //  )
   // }
   
//}


export default Home