import React, { Component } from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableHighlight  } from 'react-native';

export default class CreateCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appName: '',
            logoURL: '',
            template: '',
            password: '',
            retypePassword: '',
            image: '',
        };
    }

    

    render() {
        return (
            <KeyboardAvoidingView>
                style={styles.container}
                behavior="padding">
                <View style={styles.container}>
                    <Text>Werkt eindelijk</Text>
                </View>
                   
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    row:{
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    button:{
        width: 97,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#409eff',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    },
});