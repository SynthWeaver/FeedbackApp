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


class Templates extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            // title: (navigation.getParam('appName') ? navigation.getParam('appName', 'Loading...') : navigation.getParam('name', 'Give Feedback'))
            headerTitle: () => <AppHeader appName={(navigation.getParam('appName') ? navigation.getParam('appName', 'Loading...') : navigation.getParam('name'))}
                                          appLogo={(navigation.getParam('appLogo') ? navigation.getParam('appLogo') : navigation.getParam('logo'))}/>
        };
    };

    constructor(props) {
        super(props);
        var id = props.navigation.state.params;
        this.state = {
            url: Constants.url,
            appId: id.id
        }
    }


    componentDidMount() {
        if (!this.props.navigation.getParam('name')) {
            return fetch(this.state.url + 'get/apps/' + this.state.appId)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson
                    })
                    this.props.navigation.setParams({ appName: this.state.data[0].appName, appLogo: this.state.data[0].logoURL })
                }).catch((error) => {
                console.error(error)
            })
        } else {
            this.setState({
                data: this.props.navigation.getParam('app')
            });
        }

    }


    render() {
        if (!this.state.data) {
            return (
                <Text>Loading...</Text>
            )
        }

        var app = (this.state.data[0] ? this.state.data[0] : this.state.data);
        switch (app.template) {
            case "Template1" :
                return <Template1 appName={app.appName}/>;
            case "Template2" :
                return <Template2 appName={app.appName}/>;
            case "Template3" :
                return <Template3 appName={app.appName}/>;
        }
    }
}

class AppHeader extends Component {

    render() {
        return (
            <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 2, alignItems: 'flex-end'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>{this.props.appName}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image source={{uri: this.props.appLogo}} style={{width: 30, height: 30, borderRadius: 100}}/>
                </View>
            </View>
        )
    }
}


export default Templates
