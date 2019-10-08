import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight, Image, Dimensions, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import _ from 'lodash';


import FeedbackScreen from './components/FeedbackScreen'

class HomeScreen extends React.Component {
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
                name: '',
                url: '',
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

            <View>
                <TouchableOpacity activeOpacity={.7} onPress={() => this.props.navigation.navigate('Details', {
                    app: item.name
                })}>
                <Image style={styles.logoicons} source={{ uri: item.url }} />
                    </TouchableOpacity>
                </View >
           
        );
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <TextInput
                        ref="searchBar"
                        placeholder="Search for apps..."
                        value={this.state.text}
                        onChangeText={text => this.SearchFilterFunction(text)}


                    />
                    {/* <TextInput onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        placeholder='Search here...' /> */}
                </View>

                <View style={{ flex: 3 }}>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        contentContainerStyle={styles.list}
                        data={this.state.dataSource}
                        renderItem={this.renderItem}

                        style={{ backgroundColor: '#ecf0f1' }} />
                </View>

                
            </View>
        );
    }
}



const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: FeedbackScreen,
    },
    {
        initialRouteName: 'Home',
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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
    search: {
        marginTop: 0,
        paddingTop: 0,
        height: 60,
        width: Dimensions.get('window').width,
        overflow: 'hidden'
    },
})
