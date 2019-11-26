import React, { Component } from 'react';
import { Alert, Button, TouchableHighlight, TextInput, View, StyleSheet, KeyboardAvoidingView,TouchableOpacity, Text } from 'react-native';
import Constants from '../Constants';

import { Base64 } from 'js-base64';

export default class Login extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#474747',
            },
        };
    };
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
        };

        this.loginSuccessful = this.loginSuccessful.bind(this);
    }

    onLogin() {
        //check name and password

        const account = {
            name: this.state.name,
            password: this.state.password
        };

        if(account.name == "" || account.password == ""){
            alert("Name and password cannot be empty!")
            return;
        }

        const url = Constants.url + 'login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(account)
        })
            .then((response) => response.json())
            .then((responseJson) => {

                //check if passwords are the same
                if(responseJson.result){
                    this.loginSuccessful();
                }else{
                    alert('login failed');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //todo: go to next screen.
    loginSuccessful(){
        alert('login successful');
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">
                <View style={styles.container}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'Name'}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
                        placeholderTextColor="#C3C3C3"
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <View style={styles.row}>
                        <TouchableHighlight style={styles.button}
                            onPress={this.onLogin.bind(this)}
                        >
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.button, {padding: 0}]}
                            onPress={() => this.props.navigation.navigate("Register")}
                        >
                            <Text style={styles.btnText}>Create Account</Text>
                        </TouchableHighlight>
                    </View>
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
        backgroundColor: '#313131',
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
        backgroundColor: 'white',
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
