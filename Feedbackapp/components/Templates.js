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

import Template1 from './Template1'
import Template2 from './Template3'
import Template3 from './Template3'


class Templates extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', 'Give Feedback'),
        };
    };
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
        const {id} = this.props.navigation.state.params;
        const appId = id;

        if (!this.state.data) {
            return (
                <Text>Loading...</Text>
            )
        }
        var usedId = (appId ? appId : this.props.navigation.getParam('app', 'default-value'));
        var templateName = this.state.data[usedId - 1].template;

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

export default Templates
