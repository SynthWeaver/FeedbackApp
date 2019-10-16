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
    render() {

        var output = [];
        var index = 0;
        for (let i = 0; i < 10; i += 2) {
            //output[i] = ++i;
            output[i] = 
                <View style={styles.child}>
                    <Smiley userInput={++index * 4}></Smiley>
                    <Text>{index}</Text>
                </View>
        }

        return (
            <View style={styles.container}>
                {output}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
    },
    child: {
        flex: 1,
    },
});