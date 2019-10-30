import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import ImagePickerButton from './ImagePickerButton';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            companyName: '',
            password: '',
            password2: '',
            image: '',
        };

        this.setImage = this.setImage.bind(this);
    }

    setImage(source){
        this.setState({
            image: source
        });
    }

    onRegister() {
        const { email, password, password2, companyName } = this.state;

        Alert.alert('Credentials', `${email} + ${password} + ${password2} + ${companyName}`);
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
                        value={this.state.companyName}
                        onChangeText={(companyName) => this.setState({ companyName })}
                        placeholder={'Company Name'}
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
                    <ImagePickerButton setImage={this.setImage}></ImagePickerButton>
                    <Button
                        title={'Register'}
                        style={styles.input}
                        onPress={this.onRegister.bind(this)}
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