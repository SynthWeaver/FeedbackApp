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
import Template2 from './Template2'
import Template3 from './Template3'
import Constants from '../Constants'


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
        url: Constants.url
    }

    componentDidMount() {
        if (!this.props.navigation.getParam('name')) {
            return fetch(this.state.url + 'get/apps')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson
                    })
                }).catch((error) => {
                    console.error(error)
                })
        } else {
            this.setState({
                data: this.props.navigation.getParam('app')
            })
        }

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
        var template;
        if (this.state.data[0]) {
            template = this.state.data[usedId - 1].template;
        } else {
            template = this.state.data.template
        }


        switch (template) {
            case "Template1" :
                return <Template1/>;
            case "Template2" :
                return <Template2/>;
            case "Template3" :
                return <Template3/>;
        }
    }
}

export default Templates
