import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform, Button
} from 'react-native';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import RNPickerSelect from 'react-native-picker-select';
import FeedbackPicker from '../FeedbackPicker'
import SmileSwitcher from '../smileform/SmileSwitcher';
import Constants from '../../Constants';
import ImagePickerButton from '../ImagePickerButton';


export default class Template1Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smile: 11,

        };

        this.submit = this.submit.bind(this);
        this.setSmiley = this.setSmiley.bind(this);
        this.setImage = this.setImage.bind(this);
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
        fetch(Constants.url + 'addAccount', {
            method: 'POST',
            body: JSON.stringify({
                appName: this.props.name,
                template: 'Template1',
                logoURL: this.props.logo,
                password: this.props.password,
                featureConfig: "",
                starQuestion: ""
            })
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        this.props.navigation.navigate('Launch');

    }

    setImage(source){
        this.setState({
            image: source
        });
    }

    //update smiley var from components
    setSmiley(userInput){
        this.setState({
            smile: userInput
        });
    }
    render() {
        const imageText = <Icon style={styles.imageIcon} name="paperclip" size={25}/>;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.modalHeader}>Give us your thoughts!</Text>
                    <FeedbackPicker feedbackTypeChange={(text) => this.setState({feedbackType: text})}/>
                    <View style={styles.searchSection}>
                        {(this.state.image ? imageText : null)}
                        <TextInput style={styles.txtInput}
                                   numberOfLines={4}
                                   multiline={true} onChangeText={(text) => this.setState({ text })}
                                   value={this.state.text} blurOnSubmit={true} scrollEnable={true}
                        />
                    </View>
                    <ImagePickerButton style={[styles.button, { backgroundColor: 'orange' }]}
                                       setImage={this.setImage}
                    ></ImagePickerButton>
                    <SmileSwitcher
                        smile={this.state.smile}
                        setSmiley={this.setSmiley}
                    >
                    </SmileSwitcher>
                    <Button title="Confirm" onPress={this.submit}/>
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

Template1Config.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    password: PropTypes.string
}


