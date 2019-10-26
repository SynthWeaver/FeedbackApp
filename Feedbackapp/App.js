import * as React from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView , Image, Dimensions, FlatList, TouchableOpacity, TextInput, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import _ from 'lodash';
import { SearchBar } from 'react-native-elements';
import Applications from './components/Applications';
import FeedbackScreen from './components/FeedbackScreen';

const ANIMATION_DURATION = 1000;
const ROW_HEIGHT = Dimensions.get('window').width / 2.4;


class HomeScreen extends React.Component {
    _animated = new Animated.Value(0);
    constructor(props) {
        super(props);
    
        
      }

    static navigationOptions = {
        title: 'Home',
    };
    state = {
        text: '',


    };
    arrayholder = [];



    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            text: text,
        });
    }

    componentDidMount() {
        const data = [
            {
                id: 1,
                name: 'Videoland',
                url: 'https://lh3.googleusercontent.com/9rwyG6MORZddxe07mVddszcTt0vRnV0Rxijk1mQtNdN7pY2LUJhDIXJroDpROn76c7kN',
            },
            {
                id: 2,
                name: 'NPO Start',
                url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/da/9b/e6/da9be644-0138-9889-6502-e8379641fbe0/AppIcon-0-1x_U007emarketing-0-0-85-220-0-7.png/246x0w.jpg',
            },
            {
                id: 3,
                name: 'Pathe Thuis',
                url: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcT9CDoAI0Al.KRGh5tQle3A_QQ2kWJswmpQuhPwsf6BkwTt0e09NugN3mRxDo2zh3xr3K3qJTjbQagcNCPTMSSK7IOrggfQP7Nit_Qckd06Mir_vFNr8hgIi_2e_GeqWt1cSgIMQniKOPgnRgJCcupdJOHM84pFVSBxc_r65j2p4-&h=1080&w=1920&format=jpg',
            },
            {
                id: 4,
                name: 'Fox Sports',
                url: 'https://storage.pubble.nl/350eaab2/content/2019/9/f6a8a8bf-a65a-4a9b-972d-ae70f0de327f_thumb840.jpg',
            },
            {
                id: 5,
                name: 'NLZiet',
                url: 'https://www.nlziet.nl/nl/wp-content/uploads/2017/09/NLZIET_Op_Wit.png',
            },
            {
                id: 6,
                name: 'RTL XL',
                url: 'https://vpndiensten.nl/wp-content/uploads/2016/03/rtl-xl-in-buitenland.png',
            },
            {
                id: 7,
                name: 'Blim ',
                url: 'https://vignette.wikia.nocookie.net/logopedia/images/1/1a/Blim_logo.jpg/revision/latest?cb=20161106231057',
            },
            {
                id: 8,
                name: 'Globo Play',
                url: 'https://www.tvaddons.co/wp-content/uploads/2019/09/plugin.video_.brplay-fanart.jpg',
            },
            {
                id: 9,
                name: 'Kijk',
                url: 'https://www.shownieuws.nl/wp-content/uploads/sites/2/2015/04/kijk-1000x562.png',
            },
            {
                id: 10,
                name: 'Nubeox',
                url: 'https://www.antena3.com/clipping/2012/04/26/00069/30.jpg',
            }
        ]
        
        this.setState(
            {
                dataSource: data
            },
            function () {
                this.arrayholder = data
            }
        )


    }
    renderItem = ({ item }) => {
        return (

            <Animated.View style = {[
                
                styles.row,
                {
                    
                  height: this._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, ROW_HEIGHT],
                    extrapolate: 'clamp',
                  }),
                },
                { opacity: this._animated },
                {
                  transform: [
                    { scale: this._animated },
                    {
                      rotate: this._animated.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['35deg', '0deg'],
                        extrapolate: 'clamp',
                      })
                    }
                  ],
                },
              ]}>
                <TouchableOpacity style={styles.shadow} activeOpacity={.7}
                                  onPress={() => this.props.navigation.navigate('Details', {
                                      app: item.name
                                  })}>
                    <Image style={styles.logoicons} source={{uri: item.url}}/>
                </TouchableOpacity>
            </Animated.View>

        );
    }
    


    render() {
        
            Animated.timing(this._animated, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                delay: 150
                }).start();
            
        return (
            
            <View style={styles.container}>
                <View style={styles.search}>
                    <SearchBar
                        placeholder="Search for app..."
                        value={this.state.text}
                        onChangeText={text => this.SearchFilterFunction(text)}


                    />
                </View>
             
                <View style={{flex: 3}}>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        contentContainerStyle={styles.list}
                        data={this.state.dataSource}
                        renderItem={this.renderItem}

                        style={{ backgroundColor: '#ecf0f1' }} />
                </View>
                <Text></Text>


            </View>
        );
    }
}



const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            path: 'home'
        },
        Details: {
            screen: FeedbackScreen,
            path: 'app/:id'
        }, 
        Anyname:{
            screen: Applications,
            path: 'applications/:id'
        },
        
    },
    {
        initialRouteName: 'Home',
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    _animated = new Animated.Value(0);
    render() {
        
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ecf0f1'
    },
    button: {
        margin: 10,
        alignSelf: 'flex-start',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
    logoImg: {
        width: 170,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden'
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
    },
    list: {
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoicons: {
        margin: 10,
        height: Dimensions.get('window').width / 3.2,
        width: Dimensions.get('window').width / 2.4,
        borderRadius: 15,
      
    },
   

    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 10
        },
        elevation: 3,

        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    search: {
        marginTop: 0,
        paddingTop: 0,
        height: 60,
        width: Dimensions.get('window').width,
        overflow: 'hidden'
    },
})
