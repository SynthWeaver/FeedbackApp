import React, {Component} from 'react';
import {
    Text,
    Image,
    View
} from 'react-native';

import Template1 from './Template1'
import Template2 from './Template2'
import Template3 from './Template3'
import Constants from '../Constants'


// Switcher to retrieve the template associated with the app and render the correct template
class Templates extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name')
        };
    };

    constructor(props) {
        super(props);
        var id = (props.navigation.getParam('appId') ? props.navigation.getParam('appId') : props.navigation.state.params);
        console.log(id);
        this.state = {
            appId: (id.id ? id.id : id)
        }
    }


    componentDidMount() {
        return fetch(Constants.url + 'get/templates/' + this.state.appId)
            .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson
                    })
                    this.props.navigation.setParams({ app: this.state.data[0].app })
                }).catch((error) => {
                console.error(error)
            })

    }


    render() {
        if (!this.state.data) {
            return (
                <Text>Loading...</Text>
            )
        }

        var appConfig = this.state.data;
        // load the right template based on the template property from the app
        switch (appConfig[0].template) {
            case "Template1" :
                return <Template1 config={appConfig} appName={appConfig[0].appName} navigation={this.props.navigation}/>;
            case "Template2" :
                return <Template2 config={appConfig} appName={appConfig[0].appName} navigation={this.props.navigation}/>;
            case "Template3" :
                return <Template3 config={appConfig} appName={appConfig[0].appName} navigation={this.props.navigation}/>;
        }
    }
}


export default Templates
