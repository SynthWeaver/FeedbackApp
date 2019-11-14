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
import Constants from '../Constants'


class Template1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            text: '',
            smile: 11,
            image: '',
            deviceInfo: '',
            deviceOs: '',
            appName: props.appName,
            feedbackType: 'Feedback'
        };
        this.submit = this.submit.bind(this);
        this.imagePickerHandler = this.imagePickerHandler.bind(this);
        this.setSmiley = this.setSmiley.bind(this);
    }

    //Toast messages show up when the user has succesfully sent feedback for an app.
    //This method works with OS Android only
    showToast = () => {
        if(Platform.OS === 'android'){
        ToastAndroid.showWithGravityAndOffset(
            "Your feedback has been sent!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        }
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
                fetch(Constants.url+ 'post', {
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
                // if (Platform.OS === "android") {
                //     this.showToast()
                // }
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
        const noImageText =<View style = {{height: 0, width: 0}}></View>;
        const imageDropdown = <Icon name="arrow-down" size={17} color="gray"/>;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.modalHeader}>Give us your thoughts!</Text>
                    <TouchableHighlight style={[styles.picker, {backgroundColor: 'white'}]} >
                        <RNPickerSelect
                            style = {{height: 20}}
                            itemStyle={{height: 44}}
                            placeholder={placeholder}
                            onValueChange={(value) => this.setState({feedbackType: value})}
                            items={[
                                {label: 'Feedback', value: 'feedback'},
                                {label: 'Bug report', value: 'bugreport'},
                                {label: 'Suggestion', value: 'suggestion'},
                            ]}
                            Icon={() => (Platform.OS === 'ios' ? imageDropdown : noImageText)}
                        />
                    </TouchableHighlight>
                    <View style={styles.searchSection}>
                    {(this.state.image ? imageText : noImageText)}
                        <TextInput style={styles.txtInput}
                                   numberOfLines={4}
                                   multiline={true} onChangeText={(text) => this.setState({ text })}
                                   value={this.state.text} blurOnSubmit={true} scrollEnable={true}
                        />




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
                    <TouchableHighlight style={[styles.button,  { backgroundColor: '#0984e3', marginTop : 20 }]}
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
        backgroundColor: '#313131',
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
        color: 'white',
        textAlign: 'center'
    },
    txtInput: {
        zIndex : 0,
        padding: 5,
        margin: 5,
        width: Dimensions.get('window').width - 50,

        minHeight: 110,
        height: 110,
        textAlignVertical: 'top',
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
        alignSelf: 'flex-end',
        color: 'gray',
        zIndex : 99,
        position: 'absolute',
        padding: 5

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
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        padding: 10
    }
})

Template1.propTypes = {
    name: PropTypes.string
}

export default Template1
