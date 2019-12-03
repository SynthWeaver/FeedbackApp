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
var configMap = {};
var starConfigMap = {};

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
        this.onChangeText = this.onChangeText.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    componentDidMount() {
        configMap = {};
        starConfigMap = {};
    }

    setImage(url) {
        this.setState({
            logoURL: url
        });
    }

    encrypt(stringToEncrypt) {
        return Base64.encode(stringToEncrypt);
    }

    onRegister() {
        //get all data

        const { appName, logoURL, template, password, password2, configCount, starConfig } = this.state;


        if(appName === ''){
            alert("App Name cannot be empty");
            return;
        }
        //compare passwords
else if (password !== password2) {
    alert("Passwords are not the same");
    return;
}
else if (password.length === null || password2.length === null) {
    alert("Password can not be empty");
    return;
}
else if (password.length < 5) {
    alert("Password must at least 5 characters");
    return;


        //encrypt password
        var encryptedPassword = this.encrypt(password);

        var configOpts;

        if (template === "Template2") {
            configOpts = configCount;
            var keys = Object.keys(configOpts);
            configOpts[keys.length + 1] = "Other...";
        } else if (template === "Template3") {
            configOpts = starConfig;
        } else if (template === "Template1") {
            fetch(Constants.url + 'addAccount', {
                method: 'POST',
                body: JSON.stringify({
                    appName: appName,
                    logoURL: logoURL,
                    template: template,
                    password: encryptedPassword,
                    featureConfig: '',
                    starQuestion: ''
                })
            })

                .then(res => console.log(res))
                .catch(err => console.log(err));

            this.props.navigation.navigate('Launch')
        }

        if (template !== "Template1") {
            //do a post to the rest server
            //const { appName, logoURL, template, password,}
            Object.keys(configOpts).map(function (key) {
                fetch(Constants.url + 'addAccount', {
                    method: 'POST',
                    body: JSON.stringify({
                        appName: appName,
                        logoURL: logoURL,
                        template: template,
                        password: encryptedPassword,
                        featureConfig: (template === "Template2" ? configOpts[key] : ''),
                        starQuestion: (template === "Template3" ? configOpts[key] : '')
                    })
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            })
            this.props.navigation.navigate('Launch')
        }


        this.props.navigation.navigate('TemplateConfig', {
            appName: appName,
            logoURL: logoURL,
            password: password
        })



    }

    onChangeText(item, index) {
        if (this.state.template === "Template2") {
            configMap[index] = item;
            this.setState({ configCount: configMap });
        } else if (this.state.template === "Template3") {
            starConfigMap[index] = item;
            this.setState({ starConfig: starConfigMap });
        }



    }


    renderItem = ({ item }) => {
        return (
            <TextInput style={styles.textInput} onChangeText={(text) => this.onChangeText(text, item)} />
        )
    }


    render() {
        return (

            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.top}>
                            <View style={{ marginLeft: 20 }}>

                                <TextInput placeholder="type a name..."
                                    style={styles.input}
                                    onChangeText={(text) => this.setState({ appName: text })} />

                                <TextInput placeholder="type the url..."
                                    style={styles.input}
                                    onChangeText={(text) => this.setState({ logoURL: text })} />
                            </View>
                        </View>
                        <View>
                            <Image source={{ uri: this.state.logoURL }} style={styles.imageicon} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20 }}>
                        <View>

                            <TextInput placeholder="Enter a password"
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ password: text })} />
                        </View>
                        <View>

                            <TextInput placeholder="Reytpe password..."
                                secureTextEntry={true}
                                style={styles.input2}
                                onChangeText={(text) => this.setState({ password2: text })} />
                        </View>
                    </View>

                    <View>
                        <View style={{ marginLeft: 20, paddingBottom: 0 }}>
                            <Text style={styles.text}>Select Template</Text>
                            <Text style={styles.text}>Happy:</Text>
                            <View style={styles.templates}>

                                <TouchableOpacity onPress={() => this.setState({ template: "Template1" })}>
                                    <Image source={{ uri: happy }} style={(this.state.template !== 'Template1' && this.state.template !== null) ? styles.templatepickeractive : styles.templatepicker} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={styles.text}>Stars:</Text>
                                <TouchableOpacity onPress={() => this.setState({ template: "Template3" })}>
                                    <Image source={{ uri: stars }} style={(this.state.template !== 'Template3' && this.state.template !== null) ? styles.templatepickeractive : styles.templatepicker} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={styles.text}>Bubbly:</Text>
                                <TouchableOpacity onPress={() => this.setState({ template: "Template2" })}>
                                    <Image source={{ uri: bubbly }} style={(this.state.template !== 'Template2' && this.state.template !== null) ? styles.templatepickeractive : styles.templatepicker} />
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                    <View style={{ width: Dimensions.get('window').width, height: 30, alignContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.onRegister.bind(this)} style={styles.button}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
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
        height: Dimensions.get('window').width / 3.4,
        width: Dimensions.get('window').width / 2.7,
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
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    input2: {
        width: Dimensions.get('window').width / 1.4,
        height: 44,

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
