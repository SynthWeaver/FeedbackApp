import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    Platform, ScrollView, TextInput,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import PropTypes from "prop-types"
import BugReportCheckBox from '../BugReportCheckBox'
import DeviceInfo from "react-native-device-info";
import Constants from "../../Constants";

var starMap = {};
var questionMap = {};


export default class Template3Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionConfig: {},
            starCount: {},
            feedback: "",
            feedbackType: "",
            configData: [1,2,3,4]
            // appName: props.appName,
            // configData: props.config
        };
        this.basicQuestions = ['How did you like the app?', 'Click on text to change it', 'Swipe left or right to change the template', 'Your survey will look like this'];

        this.confirm = this.confirm.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.addBugReport = this.addBugReport.bind(this);
    }

    componentDidMount() {
        questionMap = {};
        starMap = {};
    }

    onStarPressed(rating, index) {
        starMap[index] = {
            star: rating
        };
        this.setState({starCount: starMap})

    }

    inputChangeHandler(text, index) {
        questionMap[index] = text;
        this.setState({
            questionConfig: questionMap
        })
    }

    confirm() {
        var appName = this.props.name;
        var logo = this.props.logo;
        var password = this.props.password;
        var questionConfig = this.state.questionConfig;

        Object.keys(questionConfig).map(function (key) {
            fetch(Constants.url + 'addAccount', {
                method: 'POST',
                body: JSON.stringify({
                    appName: appName,
                    template: 'Template3',
                    logoURL: logo,
                    password:   password,
                    featureConfig: "",
                    starQuestion: questionConfig[key]
                })
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })
        this.props.navigation.navigate('Launch')

    }


    addBugReport(text) {
        this.setState({ feedback: text })
    }



    renderItem = ({item, index}) => {
        return (
            <View style={{margin: 5}}>
                <TextInput style={styles.txtInput}
                           placeholder= {this.basicQuestions[index]}    //"Type your question..."
                           placeholderTextColor="#C3C3C3"
                           onChangeText={(text) => this.inputChangeHandler(text, index)}/>
                <StarRating starStyle={{color: 'orange'}}
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount[index] ? this.state.starCount[index].star : 0}
                            selectedStar={(rating) => this.onStarPressed(rating, index)}/>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{flex: 4}}>
                    <FlatList numOfColumns={1}
                              horizontal={false}
                              contentContainerStyle={styles.list}
                              data={this.state.configData}
                              extractData={this.state}
                              renderItem={this.renderItem}/>
                </View>
                <BugReportCheckBox textChange={(text) => this.addBugReport(text)}/>
                <Button title="Confirm" onPress={this.confirm}/>
            </ScrollView>
        )
    }
}

Template3Config.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    password: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        padding: 10,
        backgroundColor: '#313131'
    },
    header: {
        fontSize: 20,
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    questionSection: {
        padding: 10
    },
    list: {
        // paddingBottom: 50,
        backgroundColor: '#313131',
        justifyContent: 'space-around',
    },
    txtInput: {
        borderBottomColor: 'gray',
        borderBottomWidth: 3,
        padding: 10,
        margin: 10,
    }
})

