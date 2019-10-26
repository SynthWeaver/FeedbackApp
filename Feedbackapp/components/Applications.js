import React from 'react';
import Smile50 from './smileform/SmileyForm'
import { Text, Image, View, StyleSheet, TextInput } from 'react-native';
const apps = { // A
  0: {
    name: 'Pathe',
    image: 'http://vignette1.wikia.nocookie.net/en.futurama/images/d/d4/Turanga_Leela.png/revision/latest?cb=20150218013044',
  },
  1: {
    name: 'NPO',
    image: 'https://vignette2.wikia.nocookie.net/en.futurama/images/4/43/Bender.png/revision/latest?cb=20150206072725',
  },
  2: {
    name: 'FOX Sport',
    image: 'https://i.ytimg.com/vi/4sCtTq7K3yI/hqdefault.jpg',
  },
  3: {
    name: 'Fry',
    image: 'https://imgix.ranker.com/user_node_img/50060/1001188604/original/the-worms-really-did-change-fry-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces',
  }
}
class Applications extends React.Component {
  static appId = 2;
  static navigationOptions = {
    title: 'applications',
  };
  render() {
    const { id } = this.props.navigation.state.params; // B
    appId = id;
    if (!apps[id]) return <Text>Sorry, no data exists for this app</Text>

    //Ff aan joosten vragen
    switch(appId){
      case 0:
        return ( // C
        <View>
         
          <Text style={styles.text}>Give feedback about {apps[id].name}</Text>
          <TextInput style={styles.txtInput}
                                        textAlignVertical = 'top'
                                           numberOfLines = {4}
                                           multiline={true} onChangeText={(text) => this.setState({text})}
                                           value={this.state.text} blurOnSubmit={true} 
                                />
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[id].image }}
          />
        </View>
      )
          
      case 1:
          return ( // C
            <View>
             
              <Text style={styles.text}>Give feedback about {apps[id].name}</Text>
              <Smile50  onNewSmiley={this.newSmiley}/>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{ uri: apps[id].image }}
              />
            </View>
          )
      case 2:
          return ( // C
            <View>
             
              <Text style={styles.text}>Give feedback about {apps[id].name}</Text>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{ uri: apps[id].image }}
              />
            </View>
          )
        default:
          return null;
    }
      
  }
}
const styles = StyleSheet.create({
  text: {
    margin: 19,
    fontSize: 22,
  },
  image: {
    width: 400,
    height: 400,
  },
});
export default Applications;