import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

export default class Error extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20, color: 'white'}}>Oops... Something went wrong!</Text>
                <Text style={{fontSize: 15, color: '#c3c3c3'}}>Make sure you are connected to the internet.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#313131',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
