import * as React from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class DefaultPage extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#474747',
        },
    };


    render() {
        return (
            <View style={defaultStyles.container}>
                <View style={defaultStyles.btnContainer}>
                    <Text style={defaultStyles.header}>Are you a guest or an admin?</Text>
                    <TouchableOpacity style={[defaultStyles.button, {backgroundColor: '#74b9ff'}]}
                                      onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={defaultStyles.btnText}>Guest</Text>
                    </TouchableOpacity><TouchableOpacity style={[defaultStyles.button, {backgroundColor: '#74b9ff'}]}
                                                         onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={defaultStyles.btnText}>Admin</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#313131',
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    btnContainer: {
        ...Platform.select({
            ios: {
                flex: 0.35,
            },
            android:{
                flex: 0.45,
            },
        }),

        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#636e72'
    },
    button: {
        padding: 10,
        margin: 5,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        height: 65,
        borderRadius: 10,
    },
    btnText: {
        padding: 5,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 25,
        color: 'white'
    },
    header: {
        fontSize: 25,
        color: 'white',
        margin: 10,
        alignSelf: 'center'
    }
})
