import React, {Component} from 'react'
import {
    Text,
    TouchableHighlight,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList,
    Button,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import PropTypes from 'prop-types'

export default class BugReportCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
        this.onTextChange = this.onTextChange.bind(this);

    }

    onTextChange(text) {
        this.props.textChange(text);
    }

    render() {
        return (
            <View style={{justifyContent: 'center', margin: 5}}>
               <CheckBox containerStyle={{backgroundColor: '#313131'}}
                         checked={this.state.isChecked}
                         onPress={() => this.setState({isChecked: !this.state.isChecked})}
                         title="Report a Bug"
                         textStyle={{color: 'white'}}/>
                {this.state.isChecked ? <TextInput style={{margin: 5, backgroundColor: 'white', padding: 5, height: 100}}
                                                   multiline={true} onChangeText={(text) => this.onTextChange(text)}/> : <View/>}
            </View>
        )
    }
}

BugReportCheckBox.propTypes = {
    textChange: PropTypes.func
}
