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
    FlatList,
    Button
} from 'react-native';
import DeviceInfo from "react-native-device-info";
import Constants from "../Constants";

const features = [
    {
        type: 'option',
        value: 'Gestures',
        active: false
    },
    {
        type: 'option',
        value: 'Layout',
        active: false
    },
    {
        type: 'option',
        value: 'Overall Flow',
        active: false
    },
    {
        type: 'option',
        value: 'Performance',
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
            appName: props.appName,
            configData: props.config,
            featureHeader: ''
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
            data: data,
            features: features
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
            // if (Platform.OS === "android") {
            //     this.showToast()
            // }
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
        if (item.featureConfig !== 'Other...') {
            return (
                <TouchableHighlight style={[styles.button, {backgroundColor: 'white', borderWidth: 3, borderColor: 'gray'}]} onPress={() => {
                    this.setState({
                        featurePick: item.featureConfig
                    })
                }}>
                    <Text>{item.featureConfig}</Text>
                </TouchableHighlight>
            )
        } else {
            return (
                <View style={styles.inputSection}>
                    <TextInput placeholder={item.featureConfig}/>
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
                              data={this.state.configData}
                              renderItem={this.renderButtonItem}/>
                </View> : <View style={styles.btnContainer}/>}
                <Button title="Submit" onPress={this.sendFeedback}/>
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
        width: 150,
        padding: 15,
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
