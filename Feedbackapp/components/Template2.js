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

class Template2 extends Component {
    state = {};

    componentDidMount() {
        var data = [];
        var even = [];
        var uneven = [];
        for (var i = 0; i < 11; i++) {
            if (i % 2 === 0) {
                even.push({key: i, val: i});
            } else {
                uneven.push({key: i, val: i});
            }
        }
        data = even.concat(uneven);
        this.setState({
            data: data
        })
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.button}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>{item.val}</Text>
            </TouchableOpacity>
        )
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
                <View style={{flex: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Text style={{margin: 10}}>Really Bad</Text>
                    <Text style={{margin: 10}}>Really Good</Text>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 100,
        margin: 3,
        backgroundColor: 'orange',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        flex: 1,
        paddingBottom: 50,
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default Template2
