import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    Alert,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

class Template3 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.questionSection}>
                        <Text style={styles.header}>How did you like our app?</Text>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1'
    },
    header: {
        fontSize: 20,
    },
    questionSection: {
        padding: 10
    }
})

export default Template3
