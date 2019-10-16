import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import Smile50 from './SmileyForm'

export default class SmilePopup extends Component {    
    constructor() {
        super()
        this.state = {
            smileyVisable: true
        }
        this.pressed = this.pressed.bind(this)
        this.newSmiley = this.newSmiley.bind(this);
    }

    pressed() {
        this.setState({
            smileyVisable : !this.state.smileyVisable
        });
    }

    newSmiley(value) {
        this.setState({ smile: value })
    }

    render() {
        if(this.state.smileyVisable){
            return(
                <TouchableOpacity style={{flex: 1}} onPress={this.pressed}>
                    <Smile50 onNewSmiley={this.newSmiley} />
                </TouchableOpacity>
            );
        }else{
            return (
                <TouchableOpacity style={{flex: 1, backgroundColor: 'powderblue'}} onPress={this.pressed}>
                    <Text>works</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({

});