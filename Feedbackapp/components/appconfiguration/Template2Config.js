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
    Button,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import DeviceInfo from "react-native-device-info";
import PropTypes from "prop-types"
import BugReportCheckBox from "../BugReportCheckBox"
import Constants from "../../Constants";


var featureMap = {};

export default class Template2Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureButtons: [1,2,3,4,5],
            featureConfig: {},
            loadTextInput: false,
            loadBugInput: false,
            feedbackType: "",
            feedback: "",
            featureHeader: '',
            loadInputSection: false
        };
        this.addFeatureButton = this.addFeatureButton.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.confirm = this.confirm.bind(this);
        this.addBugReportText = this.addBugReportText.bind(this);
    }

    componentDidMount() {
        featureMap = {};
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

    addBugReportText(text) {
        this.setState({ feedback: text})
    }

    inputChangeHandler(text, index) {
        featureMap[index] = text;
        this.setState({
            featureConfig: featureMap
        })
    }

    confirm() {
        
        var appName = this.props.name;
        var logo = this.props.logo;
        var password = this.props.password;
        var featureConfig = this.state.featureConfig;
        featureConfig[Object.keys(featureConfig).length + 1] = 'Other...';
        var i;
        const MINIMUMFEATUREAMOUNT = 4;

        for(i = 0; i<MINIMUMFEATUREAMOUNT; i++){
            if(!featureConfig[i] || featureConfig[i] === ''){
                alert('The first 4 features must be filled in');
                return;
            }
        }
        for(i = MINIMUMFEATUREAMOUNT; i< Object.keys(featureConfig).length ; i++){
            if(featureConfig[i] === ''){
                delete questionConfig[i]
               
            }
        }
           

        Object.keys(featureConfig).map(function (key) {
            fetch(Constants.url + 'addAccount', {
                method: 'POST',
                body: JSON.stringify({
                    appName: appName,
                    template: 'Template2',
                    logoURL: logo,
                    password: password,
                    featureConfig: featureConfig[key],
                    starQuestion: ""
                })
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })

        this.props.navigation.navigate('Launch')



    }

    addFeatureButton() {
        var buttonList = this.state.featureButtons;
        buttonList = buttonList.concat(buttonList.length + 1);
        this.setState({
            featureButtons: buttonList
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
                    rating: item.val
                })

            }}>

                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>{item.val}</Text>
            </TouchableHighlight>
        )
    }



    renderButtonItem = ({item, index}) => {
        
        return (
           
            <TouchableHighlight style={[styles.button, {backgroundColor: 'orange'}]}>
            {index !== 4 ? <TextInput placeholder="Type your feature..." value={this.state.featureConfig[index]}
                           onChangeText={(text) => this.inputChangeHandler(text, index)}/>  : <TextInput placeholder="Other..." 
                           placeholderTextColor= 'black'
                           editable = {false}
                           value={this.state.featureConfig[index]}
                           onChangeText={(text) => this.inputChangeHandler(text, index)}/>}                  
            </TouchableHighlight>   
        )
        
        }

    


    renderListHeader = () => {
        return (
            <Text style={styles.listHeader}>Rate Our App</Text>
        )
    }

    renderListFooter = () => {
        return (
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width}}>
                <Text style={{margin: 10, color: 'white'}}>Really Bad</Text>
                <Text style={{margin: 10, color: 'white'}}>Really Good</Text>
            </View>
        )
    }

    renderFeatureListFooter = () => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight style={styles.addButton} onPress={this.addFeatureButton}>
                    <Text style={{fontSize: 40, color: 'white', alignSelf: 'center'}}>+</Text>
                </TouchableHighlight>
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
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView>
                    <FlatList
                        numColumns={6}
                        horizontal={false}
                        contentContainerStyle={styles.list}
                        data={this.state.data}
                        extractData={this.state}
                        ListHeaderComponent={this.renderListHeader}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={this.renderItem}/>
                    <View style={styles.btnContainer}>
                        <Text style={styles.listHeader}>What did you like?</Text>
                        <FlatList numColumns={2}
                                  horizontal={false}
                                  contentContainerStyle={styles.btnList}
                                  data={this.state.featureButtons}
                                  ListFooterComponent={this.renderFeatureListFooter}
                                  extractData={this.state}
                                  renderItem={this.renderButtonItem}/>
                        {this.state.loadInputSection ? <View style={styles.inputSection}>
                            <TextInput style={{color: 'white'}}
                                       placeholder="Type your feature..."
                                       placeholderTextColor="#C3C3C3"
                                       onChangeText={(text) => this.setState({featurePick: text})} />
                        </View> : <View/>}
                    </View>
                    <BugReportCheckBox textChange={(text) => this.addBugReportText(text)}/>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Button title="Confirm" onPress={this.confirm}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )

    }
}

Template2Config.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    password: PropTypes.string
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
    addButton: {
        alignItems: 'center',
        backgroundColor: '#27ae60',
        width: 50,
        height: 50,
        borderRadius: 100
    },
    circleButton: {
        borderRadius: 100,
        margin: 3,
        backgroundColor: 'orange',
        width: 40,
        height: 40,
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
        marginBottom: 5,
        // paddingBottom: 50,
        backgroundColor: '#5f5f5f',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    picker: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 10
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    }
})


