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
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import RNPickerSelect from 'react-native-picker-select';
import SmileSwitcher from './smileform/SmileSwitcher';


class Templates extends Component {
    constructor() {
        super();
    }

    state = {

    }

    componentDidMount() {
        return fetch('http://localhost:8085/get/apps')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson
                })
            }).catch((error) => {
                console.error(error)
            })
    }

    render() {
        const { id } = this.props.navigation.state.params;
        const appId = id;

        if (!this.state.data) {
            return (
                <Text>Loading...</Text>
            )
        }
        var templateName = (appId ? this.state.data[appId - 1].template : this.state.data[this.props.navigation.getParam('app', 'default-value') - 1].template);

        switch (templateName) {
            case 'Template1' :
                return <Template1/>;
            case 'Template2' :
                return <Template2/>;
            case 'Template3' :
                return <Template3/>;
        }
    }
}

class Template1 extends Component {

    render() {
        return (
            <View>
                <Text>Template1</Text>
            </View>
        )
    }
}
class Template2 extends Component {
    render() {
        return (
            <View>
                <Text>Template2</Text>
            </View>
        )
    }
}
class Template3 extends Component {
    render() {
        return (
            <View>
                <Text>Template3</Text>
            </View>
        )
    }
}

export default Templates
