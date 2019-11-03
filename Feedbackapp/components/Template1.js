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


class Template1 extends Component {
    render() {
        return (
            <View>
                <Text>Template1</Text>
            </View>
        )
    }
}

Template1.propTypes = {
    name: PropTypes.string
}

export default Template1
