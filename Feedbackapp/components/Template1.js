import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import RNPickerSelect from 'react-native-picker-select';
import SmileSwitcher from './smileform/SmileSwitcher';


class Template1 extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            text: '',
            smile: 11,
            image: '',
            deviceInfo: '',
            deviceOs: '',
            appName: '',
            feedbackType: 'Feedback'
        };
        this.submit = this.submit.bind(this);
        this.imagePickerHandler = this.imagePickerHandler.bind(this);
        this.setSmiley = this.setSmiley.bind(this);
    }


    showToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Your feedback has been sent!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };


    submit() {
        // create form data for screenshot
        const createFormData = (photo) => {
            if (!photo) return '';
            const data = new FormData();

            data.append("photo", {
                name: photo.fileName,
                type: photo.type,
                uri:
                    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            });

            return data;
        };
        // textfield cannot be empty
        if (this.state.text) {
            DeviceInfo.getModel().then(deviceModel => {
                // set the device info and os in state
                this.setState({
                    deviceInfo: deviceModel,
                    deviceOs: Platform.OS
                });
                // post the user feedback to the api
                fetch('http://9e9aada3.ngrok.io/post', {
                    method: 'POST',
                    body: JSON.stringify({
                        feedback: this.state.text,
                        app: this.state.appName,
                        image: createFormData(this.state.image),
                        smiley: Math.round((this.state.smile / 2)),
                        device: this.state.deviceInfo,
                        os: this.state.deviceOs,
                        category: this.state.feedbackType

                    })
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                this.setState({ text: '' });
                this.props.navigation.navigate('Home');
                this.showToast()
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
                const source = { uri: response.uri };

                this.setState({
                    image: source
                });
            }
        });
    }

    //update smiley var from components
    setSmiley(userInput){
        this.setState({
            smile: userInput
        });
    }
    render() {
        const placeholder = {
            label: 'Select the type of feedback...',
            value: null,
            color: '#9EA0A4',
        };
        const imageText = <Icon style={styles.imageIcon} name="paperclip" size={25}/>;
        const noImageText = <Text></Text>;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.modalHeader}>Give us your thoughts!</Text>
                    <TouchableHighlight style={[styles.picker, {backgroundColor: 'white'}]} >
                        <RNPickerSelect
                            placeholder={placeholder}
                            onValueChange={(value) => this.setState({feedbackType: value})}
                            items={[
                                {label: 'Feedback', value: 'feedback'},
                                {label: 'Bug report', value: 'bugreport'},
                                {label: 'Suggestion', value: 'suggestion'},
                            ]}
                            Icon={() => {
                                return <Icon name="arrow-down" size={17} color="gray"/>
                            }}
                        />
                    </TouchableHighlight>
                    <View style={styles.searchSection}>

                        <TextInput style={styles.txtInput}
                                   numberOfLines={4}
                                   multiline={true} onChangeText={(text) => this.setState({ text })}
                                   value={this.state.text} blurOnSubmit={true}
                        />

                        <View style = {{paddingTop: 110}}>
                            {(this.state.image ? imageText : noImageText)}
                        </View>


                    </View>

                    <TouchableHighlight style={[styles.button, { backgroundColor: 'orange' }]}
                                        onPress={this.imagePickerHandler}
                                        underlayColor="#74b9ff">
                        <Text style={styles.btnText}>Choose Photo</Text>
                    </TouchableHighlight>
                    <SmileSwitcher
                        smile={this.state.smile}
                        setSmiley={this.setSmiley}
                    >
                    </SmileSwitcher>
                    <TouchableHighlight style={[styles.button, { backgroundColor: '#0984e3' }]}
                                        onPress={this.submit}
                                        underlayColor="#74b9ff">
                        <Text style={styles.btnText}>Submit!</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    modalHeader: {
        fontSize: 27,
        marginBottom: 10,
        textAlign: 'center'
    },
    txtInput: {
        padding: 5,
        margin: 5,
        width: Dimensions.get('window').width - 50,
        height: 110
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
        color: 'gray'
    },
    searchSection: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 5,
        margin: 10,
    },
    picker: {
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray'
    }
})

Template1.propTypes = {
    name: PropTypes.string
}

export default Template1
