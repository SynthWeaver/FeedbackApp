import React, { Component } from 'react';
import { Alert, Button, TouchableHighlight, TextInput, View, StyleSheet, KeyboardAvoidingView,TouchableOpacity, Text } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onLogin() {
        //check email and password
        const { email, password } = this.state;
        Alert.alert('Credentials', `${email} + ${password}`);

        //let user know if login was succesfull
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">
                <View style={styles.container}>
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder={'Email'}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
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