import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, KeyboardAvoidingView,TouchableOpacity, Text } from 'react-native';

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

        //open admin page
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
                        <Button
                            title={'Login'}
                            style={styles.input}
                            onPress={this.onLogin.bind(this)}
                        />

                        <Button
                            title={'Create Account'}
                            style={styles.input}
                            onPress={() => this.props.navigation.navigate("Register")}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
    },
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