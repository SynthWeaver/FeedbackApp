import React, {Component} from 'react';
import {Text, TouchableHighlight, View, Alert, TextInput, StyleSheet, Dimensions, Image, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';

import Smile50 from './smileform/SmileyForm'

export default class FeedbackScreen extends Component {
    static navigationOptions = {
        title: 'Feedback',

    };
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            text: '',
            smile: 1,
            image: '',
            deviceInfo: '',
            deviceOs: '',
            appName: ''
        };
        this.submit = this.submit.bind(this);
        this.newSmiley = this.newSmiley.bind(this);
        this.imagePickerHandler = this.imagePickerHandler.bind(this);

    }

    componentDidMount() {
        const {navigation} = this.props;
        const appName = navigation.getParam('app', 'default-value');
        this.setState({ appName: appName })
    }



    submit() {
        const createFormData = (photo) => {
            const data = new FormData();

            data.append("photo", {
                name: photo.fileName,
                type: photo.type,
                uri:
                    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            });

            return data;
        };
        if (this.state.text) {
            DeviceInfo.getDeviceName().then(deviceName => {
                this.setState({
                     deviceInfo: deviceName,
                     deviceOs: Platform.OS
                });
                fetch('https://feedbackapp-40461.firebaseio.com/feedback.json', {
                    method: 'POST',
                    body: JSON.stringify({
                        appName: this.state.appName,
                        feedback: this.state.text,
                        smiley: this.state.smile,
                        image: createFormData(this.state.image),
                        deviceInfo: this.state.deviceInfo,
                        deviceOs: this.state.deviceOs
                    })
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                this.setState({text: ''});
                this.props.navigation.navigate('Home')
            })
        } else {
            Alert.alert("Please fill in the textfield")
        }

    }

    imagePickerHandler() {
        const options = {
            title: "Select Screenshot",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = {uri: response.uri};

                this.setState({
                    image: source
                });
            }
        });
    }

    newSmiley(value) {
        this.setState({smile: value})
    }

    render() {
        var appText = this.state.appName;
        const imageText = <Icon style={styles.imageIcon} name="paperclip" size={25}/>
        const noImageText = <Text></Text>;
        return (
                    <View style={styles.container}>
                        <View >
                            <Text style={styles.modalHeader}>Give us your thoughts about {appText}!</Text>

                            <View style={styles.searchSection}>
                                <TextInput style={styles.txtInput}
                                           numberOfLines = {4}
                                           multiline={true} onChangeText={(text) => this.setState({text})}
                                           value={this.state.text} blurOnSubmit={true}
                                />
                                {this.state.image ? imageText : noImageText}
                            </View>

                            <TouchableHighlight style={[styles.button, {backgroundColor: 'orange'}]}
                                                onPress={this.imagePickerHandler}
                                                underlayColor="#74b9ff">
                                <Text style={styles.btnText}>Choose Photo</Text>
                            </TouchableHighlight>
                            <Smile50  onNewSmiley={this.newSmiley}/>
                            <TouchableHighlight style={[styles.button, {backgroundColor: '#0984e3'}]}
                                                onPress={this.submit}
                                                underlayColor="#74b9ff">
                                <Text style={styles.btnText}>Submit!</Text>
                            </TouchableHighlight>
                        </View >
                    </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    modalHeader: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    txtInput: {
        padding: 5,
        margin: 5,
        width: Dimensions.get('window').width - 50,
        height: 100
    },
    button: {
        marginBottom: 20,
        padding: 10,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70
    },
    imageIcon: {
        padding: 10,
        alignSelf: 'flex-start',
        color   : 'gray'
    },
    searchSection: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 5,
        margin: 20,
        height: 40

    },
})

