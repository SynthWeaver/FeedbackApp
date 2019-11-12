import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
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
        value: 'Template Feature 1',
        active: false
    },
    {
        type: 'option',
        value: 'Template Feature 1',
        active: false
    },
    {
        type: 'option',
        value: 'Template Feature 1',
        active: false
    },
    {
        type: 'option',
        value: 'Template Feature 1',
        active: false
    },
    {
        type: 'input',
        value: 'Other...',
        active: false
    }
];
class Template2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadTextInput: false,
            featureHeader: ''
        };
    }

    componentDidMount() {
        var even = [];
        var uneven = [];
        for (var i = 0; i < 11; i++) {
            if (i % 2 === 0) {
                even.push({key: i, val: i, active: false});
            } else {
                uneven.push({key: i, val: i, active: false});
            }
        }
        var data = even.concat(uneven);
        this.setState({
            data: data,
            features: features
        })
    }

    renderItem = ({item}) => {
        return (
            <TouchableHighlight style={item.active ? styles.circleButtonActive : styles.circleButton} onPress={() => {
                this.state.data.forEach((element) => {
                    element.active = false;
                });
                item.active = !item.active;
                this.setState({
                    loadTextInput: true,
                    featureHeader: (item.val < 6 ? 'What feature did you not like?' : 'What feature did you like?')
                })

            }}>

                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>{item.val}</Text>
            </TouchableHighlight>
        )
    }

    renderButtonItem = ({item}) => {
        if (item.type === 'option') {
            return (
                <TouchableHighlight style={[styles.button, {backgroundColor: 'white', borderWidth: 3, borderColor: 'gray'}]}>
                    <Text>{item.value}</Text>
                </TouchableHighlight>
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
                    extractData={this.state}
                    renderItem={this.renderItem}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{margin: 10}}>Really Bad</Text>
                    <Text style={{margin: 10}}>Really Good</Text>
                </View>
                {this.state.loadTextInput ? <View style={styles.btnContainer}>
                    <Text style={styles.featureText}>{this.state.featureHeader}</Text>
                    <FlatList numColumns={2}
                              horizontal={false}
                              contentContainerStyle={styles.btnList}
                              data={this.state.features}
                              renderItem={this.renderButtonItem}/>
                </View> : <View style={styles.btnContainer}/>}
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
    circleButtonActive: {
        borderRadius: 100,
        margin: 3,
        backgroundColor: '#e67e22',
        width: 53,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 10,
        padding: 15 ,
        margin: 10,
        justifyContent: 'center'
    },
    featureText: {
        fontSize: 25,
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
        alignItems: 'center',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
})

export default Template2
