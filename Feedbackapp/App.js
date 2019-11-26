import * as React from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Image, Dimensions, FlatList, TouchableOpacity, TextInput, Animated,Platform } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import _ from 'lodash';

import Register from './screens/Register';
import TemplatesConfig from './components/appconfiguration/TemplatesConfig'
import Login from './screens/Login';
import Templates from './components/Templates'
import HomeScreen from './screens/HomeScreen'
import DefaultPage from './screens/DefaultPage'



//Just a simple StackNavigator with the name of the screens, followed by the path. To enable screens for deep linking from outside
//of the application, like web, or linking from other applications, AndroidManifest.xml should be edited.
const AppNavigator = createStackNavigator(
    {
        Launch: {
            screen: DefaultPage,
            path: 'launch'
        },
        Home: {
            screen: HomeScreen,
            path: 'home'
        },
        Login:{
            screen: Login,
            path: 'screens/Login'
        },
        TemplateConfig: {
            screen: TemplatesConfig,
            path: 'templateConfig'
        },
        Register: {
            screen: Register,
            path: 'screens/Register'
        },
        Details: {
            screen: Templates,
            path: 'app/:id'
        },
        Anyname: {
            screen: Templates,
            path: 'applications/:id'
        },
    },
    {
        initialRouteName: 'Launch',
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    _animated = new Animated.Value(0);
    render() {
        return <AppContainer />;
    }
}
