import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Alert,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList
} from 'react-native';

const features = [
    {
        type: 'option',
        value: 'Template Feature 1'
    },
    {
        type: 'option',
        value: 'Template Feature 1'
    },
    {
        type: 'option',
        value: 'Template Feature 1'
    },
    {
        type: 'option',
        value: 'Template Feature 1'
    },
    {
        type: 'input',
        value: 'Other...'
    }
];
class Template2 extends Component {
    state = {
        loadTextInput: false
    };

    componentDidMount() {
        var even = [];
        var uneven = [];
        for (var i = 0; i < 11; i++) {
            if (i % 2 === 0) {
                even.push({key: i, val: i});
            } else {
                uneven.push({key: i, val: i});
            }
        }
        var data = even.concat(uneven);
        this.setState({
            data: data
        })
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.circleButton} onPress={() => {
                if (item.val < 6) {
                    this.setState({
                        loadTextInput: true
                    })
                }
            }}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>{item.val}</Text>
            </TouchableOpacity>
        )
    }

    renderButtonItem = ({item}) => {
        if (item.type === 'option') {
            return (
                <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]}>
                    <Text>{item.value}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.inputSection}>
                    <TextInput placeholder={item.value}/>
                </View>
            )
        }

    }

    render() {
        if (!this.state.data) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={6}
                    horizontal={false}
                    contentContainerStyle={styles.list}
                    data={this.state.data}
                    renderItem={this.renderItem}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{margin: 10}}>Really Bad</Text>
                    <Text style={{margin: 10}}>Really Good</Text>
                </View>
                {this.state.loadTextInput ? <View style={styles.btnContainer}>
                    <Text style={styles.featureText}>What feature did you not like?</Text>
                    <FlatList numColumns={2}
                              horizontal={false}
                              contentContainerStyle={styles.btnList}
                              data={features}
                              renderItem={this.renderButtonItem}/>
                </View> : <View style={styles.btnContainer}></View>}
                <TouchableOpacity style={[styles.button, {backgroundColor: '#0984e3'}]}>
                    <Text style={styles.btnText}>Submit!</Text>
                </TouchableOpacity>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#ecf0f1',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    btnContainer: {
        flex: 3,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnList: {
        flex: 1,
        alignItems: 'center'
    },
    circleButton: {
        borderRadius: 100,
        margin: 3,
        backgroundColor: 'orange',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 10,
        borderWidth: 3,
        padding: 20,
        margin: 10,
        borderColor: 'gray',
        justifyContent: 'center'
    },
    featureText: {
        fontSize: 30,
        alignSelf: 'center'
    },
    inputSection: {
        borderColor: 'gray',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        width: Dimensions.get('window').width - 55
    },
    list: {
        flex: 1,
        // paddingBottom: 50,
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
})

export default Template2
