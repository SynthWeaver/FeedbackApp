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

import Smiley from './Smiley'

export default class SmilePopup extends Component {
    constructor() {
        super()
        this.pressSmiley = this.pressSmiley.bind(this);
    }

    pressSmiley(userInput) {
        //send userInput to SmileyForm
        this.props.setSmiley(userInput);

        //hide me
        this.props.swapSmiley();
    }
    
    render() {
        var userInput = [1, 10, 15, 20];
        var component = []

        for (let i = 0; i < userInput.length; i++) {
            component[i] = 
                <TouchableOpacity style={styles.child} onPress={() => this.pressSmiley(userInput[i])}>
                    <Smiley userInput={userInput[i]}></Smiley>
                </TouchableOpacity>;
        }

        return (
            <View style={styles.container}>
                {component}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    child: {
        flex: 1,
    },
});