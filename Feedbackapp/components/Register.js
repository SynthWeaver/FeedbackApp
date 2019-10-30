import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password2: '',
        };
    }

    onLogin() {
        const { username, password, password2 } = this.state;

        Alert.alert('Credentials', `${username} + ${password} + ${passwor2}`);
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">
                <View style={styles.container}>
                    <TextInput
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder={'Username'}
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

                    <Button
                        title={'Register'}
                        style={styles.input}
                        onPress={this.onLogin.bind(this)}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
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
});