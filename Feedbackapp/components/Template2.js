import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList,
    Button
} from 'react-native';
import DeviceInfo from "react-native-device-info";
import Constants from "../Constants";


class Template2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadTextInput: false,
            appName: props.appName,
            configData: props.config,
            featureHeader: '',
            loadInputSection: false
        };
        this.sendFeedback = this.sendFeedback.bind(this);
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
            data: data
        })
    }

    sendFeedback() {
        DeviceInfo.getModel().then(deviceModel => {
            // set the device info and os in state
            this.setState({
                deviceInfo: deviceModel,
                deviceOs: Platform.OS
            });
            // post the user feedback to the api
            fetch(Constants.url + 'post', {
                method: 'POST',
                body: JSON.stringify({
                    feedback: "",
                    app: this.state.appName,
                    image: "",
                    smiley: "",
                    device: this.state.deviceInfo,
                    os: this.state.deviceOs,
                    category: "feedback",
                    stars: "",
                    rating: this.state.rating,
                    feature: this.state.featurePick,
                    starQuestion: ""


                })
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            this.props.navigation.navigate('Home');
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
                    featureHeader: (item.val < 6 ? 'What did you dislike?' : 'What did you like?'),
                    rating: item.val
                })

            }}>

                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>{item.val}</Text>
            </TouchableHighlight>
        )
    }


    renderButtonItem = ({item}) => {
        return (
            <TouchableHighlight style={item.active ? [styles.button, {
                backgroundColor: '#e67e22'
            }] : [styles.button, {backgroundColor: 'orange'}]} onPress={() => {
                this.state.configData.forEach((element) => {
                    element.active = false;
                })
                item.active = !item.active;
                if (item.featureConfig !== 'Other...') {
                    this.setState({
                        featurePick: item.featureConfig,
                        loadInputSection: false
                    })
                } else {
                    this.setState({
                        loadInputSection: true
                    })
                }

            }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.featureConfig}</Text>
            </TouchableHighlight>
        )

    }


    renderListHeader() {
        return (
            <Text style={styles.listHeader}>Rate Our App</Text>
        )
    }

    renderListFooter() {
        return (
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width}}>
                <Text style={{margin: 10, color: 'white'}}>Really Bad</Text>
                <Text style={{margin: 10, color: 'white'}}>Really Good</Text>
            </View>
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
                    extractData={this.state}
                    ListHeaderComponent={this.renderListHeader}
                    ListFooterComponent={this.renderListFooter}
                    renderItem={this.renderItem}/>
                {this.state.loadTextInput ? <View style={styles.btnContainer}>
                    <Text style={styles.listHeader}>{this.state.featureHeader}</Text>
                    <FlatList numColumns={2}
                              horizontal={false}
                              contentContainerStyle={styles.btnList}
                              data={this.state.configData}
                              extractData={this.state}
                              renderItem={this.renderButtonItem}/>
                    {this.state.loadInputSection ? <View style={styles.inputSection}>
                        <TextInput style={{color: 'white'}}
                                   placeholder="Type your feature..."
                                   placeholderTextColor="#C3C3C3"
                                   onChangeText={(text) => this.setState({featurePick: text})} />
                    </View> : <View/>}
                </View> : <View style={styles.btnContainer}/>}
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Button title="Submit" onPress={this.sendFeedback}/>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    listHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        margin: 10
    },
    container: {
        flex: 6,
        backgroundColor: '#313131',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    btnContainer: {
        flex: 1.7,
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
        width: 150,
        padding: 15,
        margin: 10,
        justifyContent: 'center'
    },
    inputSection: {
        borderBottomColor: 'gray',
        borderBottomWidth: 3,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
    },
    list: {
        flex: 1,
        // paddingBottom: 50,
        backgroundColor: '#5f5f5f',
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
