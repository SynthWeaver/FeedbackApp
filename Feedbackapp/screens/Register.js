import React, { Component } from 'react';
//import ImagePickerButton from './ImagePickerButton';
import {
    Alert,
    Button,
    TextInput,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
    TouchableHighlight,
    Text,
    TouchableOpacity, FlatList, Image
} from 'react-native';
import Constants from '../Constants';
import Carousel from 'react-native-looped-carousel'

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';
const happy = 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2016/01/compassion.jpg';
const stars = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJLI1WKlFWlzI7kp0ia7fU-lYuRh96guVK27T7NiuOn_KF8bnSqQ&s';
const bubbly = 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i9ZqFExK5zA0/v0/1000x-1.jpg'
const textFields = ['1', '2', '3', '4'];


export default class Register extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registration',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#474747',
            },
        };
    };
    constructor(props) {
        super(props);

        this.state = {
            appName: '',
            logoURL: 'https://static.thenounproject.com/png/212328-200.png',
            template: null,
            password: '',
            password2: '',
            configCount: {},
            starConfig: {},



        };
        this.setImage = this.setImage.bind(this);
    }

    setImage(url) {
        this.setState({
            logoURL: url
        });
    }

    onRegister() {
        //get all data

        const { appName, logoURL, template, password, password2, configCount, starConfig } = this.state;

        //compare passwords
        if (password !== password2) {
            alert("Passwords are not the same");
            return;
        }
        if (password.length === null || password2.length === null) {
            alert("Password can not be empty");
            return;
        }
        if (password.length < 5) {
            alert("Password must be larger than characters");
            return;
        }


        this.props.navigation.navigate('TemplateConfig', {
            appName: appName,
            logoURL: logoURL,
            password: password
        })



    }


    render() {
        return (

            <View style={styles.container}>
                <Text style={{ fontSize: 36, color: 'white', textAlign: 'center' }}>Register an App</Text>
                <View style={{ flexDirection: 'row'}}>

                    <View style={styles.top}>
                        <View style={{ marginLeft: 20, flexDirection: 'column' }}>
                            <Text style= {styles.text}>App Name:</Text>
                            <TextInput placeholder="Type a name..."
                                       style={styles.input}
                                       onChangeText={(text) => this.setState({ appName: text })} />
                        </View>
                        <View style={{ marginLeft: 20, flexDirection: 'column' }}>
                            <Text style= {styles.text}>Image URL: </Text>
                            <TextInput placeholder="Type the url..."
                                       style={styles.input}
                                       onChangeText={(text) => this.setState({ logoURL: text })} />
                        </View>
                    </View>
                    <View>
                        <Image source={{ uri: this.state.logoURL }} style={styles.imageicon} />
                    </View>

                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                    <View style = {{flexDirection: 'column'}}>
                        <Text style= {styles.text}>Create a password:</Text>
                        <TextInput placeholder="Enter a Password"
                                   secureTextEntry={true}
                                   style={styles.input2}
                                   onChangeText={(text) => this.setState({ password: text })} />
                    </View>
                    <Text style= {styles.text}>Repeat Password:</Text>
                    <TextInput placeholder="Reytpe password..."
                               secureTextEntry={true}
                               style={styles.input2}
                               onChangeText={(text) => this.setState({ password2: text })} />
                </View>


                <View>

                    <View style={{ width: Dimensions.get('window').width, height: 1000000,  alignContent: 'center', alignItems: 'center' }}>
                        <Button onPress={this.onRegister.bind(this)} style = {styles.button}
                                title= "Submit and Configure"/>


                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',

        backgroundColor: '#313131',

    },

    top: {
        flex: 1,
    },
    textInput: {
        borderColor: 'gray',
        backgroundColor: 'white',
        margin: 5,
        padding: 5
    },
    imageicon: {
        height: Dimensions.get('window').width / 3.2,
        width: Dimensions.get('window').width / 2.4,
        borderRadius: 15,
        marginTop: 10,
        marginRight: 20
    },
    templatepickeractive: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').width / 3.6,
        borderRadius: 15,
        opacity: .4,
    },
    templatepicker: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').width / 3.6,
        borderRadius: 15,

    },
    templates: {

    },
    text: {
        color: 'white',

    },
    input: {
        width: 160,
        height: 44,
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    input2: {
        width: Dimensions.get('window').width / 1.4,
        height: 44,
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: 150,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#409eff',
    },
});
