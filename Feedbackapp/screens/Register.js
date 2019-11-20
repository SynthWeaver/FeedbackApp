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

import { Base64 } from 'js-base64';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';
const happy = 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2016/01/compassion.jpg';
const stars = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJLI1WKlFWlzI7kp0ia7fU-lYuRh96guVK27T7NiuOn_KF8bnSqQ&s';
const bubbly = 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i9ZqFExK5zA0/v0/1000x-1.jpg'
const textFields = ['1', '2', '3', '4'];
var configMap = {};
var starConfigMap = {};

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appName: '',
            logoURL: '',
            template: null,
            password: '',
            password2: '',
            configCount: {},
            starConfig: {}


        };
        this.onChangeText = this.onChangeText.bind(this);
        this.setImage = this.setImage.bind(this);
        this.encrypt = this.encrypt.bind(this);
    }

    componentDidMount() {
        configMap = {};
        starConfigMap = {};
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

        const { appName, logoURL, template, password, password2, configCount, starConfig} = this.state;


        //compare passwords
        if(password !== password2){
            alert("Passwords are not the same");
            return;
        }

        //encrypt password
        var encryptedPassword = this.encrypt(password);

        var configOpts;

        if (template === "Template2") {
            configOpts = configCount;
            var keys = Object.keys(configOpts);
            configOpts[keys.length + 1] = "Other...";
        } else if (template === "Template3") {
            configOpts = starConfig;
        } else if (template === "Template1"){
            fetch(Constants.url+ 'addAccount', {
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
        }
        
        if (template !== "Template1") {
            //do a post to the rest server
            //const { appName, logoURL, template, password,}
            Object.keys(configOpts).map(function (key) {
                fetch(Constants.url+ 'addAccount', {
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
        }




    }

    onChangeText(item, index){
        if (this.state.template === "Template2") {
            configMap[index] = item;
            this.setState({configCount: configMap});
        } else if (this.state.template === "Template3") {
            starConfigMap[index] = item;
            this.setState({starConfig: starConfigMap});
        }



    }


    renderItem= ({item}) =>{
        return(
            <TextInput style={styles.textInput} onChangeText={(text) => this.onChangeText(text, item)}/>
        )
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {{flexDirection: 'row'}}>
                    <View style = {styles.top}>
                        <Text style={styles.text}>App/Company name</Text>
                        <TextInput placeholder= "type a name..."
                                   onChangeText={(text) => this.setState({appName: text})}/>
                        <Text style={styles.text}>Logo URL:</Text>
                        <TextInput placeholder="type the url..."
                                   onChangeText={(text) => this.setState({logoURL: text})}/>
                    </View>
                    <View>
                        <Image source={{uri: this.state.logoURL}} style ={styles.imageicon}/>
                    </View>
                </View>

                <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View>
                        <Text style={styles.text}>Password:</Text>
                        <TextInput placeholder = "Enter a password"
                                   onChangeText={(text) => this.setState({password: text})}/>
                    </View>
                    <View>
                        <Text style={styles.text}>Retype password:</Text>
                        <TextInput placeholder = "Reytpe password..."
                                   onChangeText={(text) => this.setState({password2: text})}/>
                    </View>
                </View>

                <View>
                    <Text style={styles.text}>Select Template</Text>

                    <View style = {styles.templates}>
                        <Text>{this.state.random}</Text>
                        <TouchableOpacity onPress= {() => this.setState({template: "Template1"})}>
                            <Image source = {{uri: happy}} style = {styles.templatepicker}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.text}>Stars:</Text>
                        <TouchableOpacity onPress= {() => this.setState({template: "Template3"})}>
                            <Image source = {{uri: stars}} style = {styles.templatepicker}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.text}>Bubbly:</Text>
                        <TouchableOpacity onPress= {() => this.setState({template: "Template2"})}>
                            <Image source = {{uri: bubbly}} style = {styles.templatepicker}/>
                        </TouchableOpacity>
                    </View>


                </View>
                {this.state.template && this.state.template !== "Template1" ? <FlatList numColumns={1}
                          horizontal={false}
                          data= {textFields}
                          renderItem={this.renderItem}>

                </FlatList> : <View/>}
                <View>
                    <TouchableOpacity onPress= {this.onRegister.bind(this)}>
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#313131'
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
    imageicon:{
        height: Dimensions.get('window').width / 3.2,
        width: Dimensions.get('window').width / 2.4,
    },
    templatepicker:{
        width: Dimensions.get('window').width - 120,
        height: Dimensions.get('window').width / 3.2,
        borderRadius: 15,
    },
    templates: {

    },
    text: {
        color: 'white'
    }
});
