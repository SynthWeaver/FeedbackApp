import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableHighlight, Text } from 'react-native';
import ImagePickerButton from './ImagePickerButton';
import Constants from '../Constants';

import { Base64 } from 'js-base64';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appName: '',
            logoURL: '',
            template: '',
            password: '',
            password2: '',
        };

        this.setImage = this.setImage.bind(this);
        this.encrypt = this.encrypt.bind(this);
    }

    setImage(url){
        this.setState({
            logoURL: url
        });
    }

    encrypt(stringToEncrypt){
        return Base64.encode(stringToEncrypt);
    }

    onRegister() {
        //get all data
        const { appName, logoURL, template, password, password2} = this.state;

        //compare passwords
        if(password !== password2){
            alert("Passwords are not the same");
            return;
        }

        //encrypt password
        var encryptedPassword = this.encrypt(password);

        //do a post to the rest server
        //const { appName, logoURL, template, password,}
        fetch(Constants.url+ 'addAccount', {
            method: 'POST',
            body: JSON.stringify({
                'appName': appName,
                'logoURL': logoURL,
                'template': template,
                'password': encryptedPassword,
            })
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">
                <View style={styles.container}>
                    <TextInput
                        value={this.state.appName}
                        onChangeText={(appName) => this.setState({ appName })}
                        placeholder={'Compamy Name'}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password2}
                        onChangeText={(password2) => this.setState({ password2 })}
                        placeholder={'Password2'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.template}
                        onChangeText={(template) => this.setState({ template })}
                        placeholder={'template'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <ImagePickerButton style={styles.button}
                        setImage={this.setImage}
                    >
                    </ImagePickerButton>
                    <TouchableHighlight style={styles.button}
                        onPress={this.onRegister.bind(this)}
                    >
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableHighlight>
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
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    button:{
        width: 200,
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
        fontSize: 17,
        color: 'white'
    },
});
