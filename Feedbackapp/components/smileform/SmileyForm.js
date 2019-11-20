import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
} from 'react-native';
import PropTypes from 'prop-types';
import Smiley from './Smiley';

import * as scale from 'd3-scale';
const d3 = {
    scale
};
var points = [
    [1,1],
    [25,10]
];

var multiLine = d3.scale.scaleLinear()
    .domain(
        points.map(function(p){return p[0];})
    )
    .range (
        points.map(function(p){return p[1];})
    );
export default class Smile50 extends Component {
    constructor() {
        super();
        this.getVal = this.getVal.bind(this)
    }

    //on slide change
    getVal(val){
        this.props.setSmiley(val)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    How do you feel about the App?
                </Text>
                <Smiley userInput={this.props.smile}></Smiley>
                <Slider
                    style={{ width: 200, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                    step={1}
                    minimumValue={1}
                    maximumValue={10}
                    value={this.props.smile}
                    onValueChange={ smile => this.getVal(smile)}
                />
            </View>
        );
    }
}

Smile50.propTypes = {
    onNewSmiley: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#313131',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 27,
        textAlign: 'center',
        color: 'white',
        margin: 20,
        marginTop: 0
    },
    rating: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: "bold"
    },
});
