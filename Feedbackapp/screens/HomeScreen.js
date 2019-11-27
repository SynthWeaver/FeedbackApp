import * as React from "react";
import {Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import Constants from "../Constants";
import Error from "../components/errorhandling/Error"
import {SearchBar} from "react-native-elements";

// what is 2.8?
const ROW_HEIGHT = Dimensions.get('window').width / 2.5;
// what is 1000?
const ANIMATION_DURATION = 1000;

export default class HomeScreen extends React.Component {
    //Property _animated is needed for the animation inside the flatlist (renderItem function)
    _animated = new Animated.Value(0);
    constructor(props) {
        super(props);

    }
    static navigationOptions = {
        title: 'Apps',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#474747',
        },
    };
    state = {
        text: '',


    };
    arrayholder = [];


    //The textinput in the homescreen makes use of the SearchFilterFunction matching the application name with the searchquery
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.appName ? item.appName.toUpperCase() : ''.toUpperCase();
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
        console.log(Constants.url);
        //change password to your local db password
        fetch(Constants.url + 'get/apps')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState(
                    {
                        dataSource: responseJson
                    },
                    function () {
                        this.arrayholder = responseJson
                    }
                )
            }).catch((error) => {
            return(
                <Error/>
            )
        })
    }

    //renderItem makes sure that every icon in the flatlist on the homescreen gets rendered. In this method we use
    //an Animated.View to make it appear with an animation.
    renderItem = ({ item }) => {
        return (

            <Animated.View style={[

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
                                      appId: item.id,
                                      name: item.appName,
                                      app: item,
                                      logo: item.logoURL
                                  })}>
                        <Image style={styles.logoicons} source={{ uri: item.logoURL }} />
                </TouchableOpacity>
                <Text style={{marginBottom: 5, alignSelf: 'center', color: 'white'}}>{item.appName}</Text>
            </Animated.View>
        );
    }


    render() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            delay: 150
        }).start();

        if (!this.state.dataSource) {
            return (
                <View style={{flex: 1, backgroundColor: '#313131', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#3498db"/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <SearchBar
                        lightTheme={false}
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
                        data={this.state.dataSource.length > 1 ? this.state.dataSource : []}
                        renderItem={this.renderItem}

                        style={{ backgroundColor: '#313131' }} />
                </View>
                <Text></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#313131'
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
        backgroundColor: '#313131',
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
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
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
