import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    Alert,
    TextInput,
    StyleSheet,
    FlatList,
    Dimensions,
    Platform
} from 'react-native';
import StarRating from 'react-native-star-rating';

var starMap = {};
class Template3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: {},
            configData: props.config
        };
    }

    componentDidMount() {
        starMap = {};
    }

    onStarPressed(rating, index) {
        starMap[index] = rating;
        this.setState({starCount: starMap})

    }


    renderItem = ({item, index}) => {
        return (
            <View style={{margin: 5 }}>
                <Text style={styles.header}>{item.starQuestion}</Text>
                <StarRating starStyle={{color: 'orange'}}
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount[index]}
                            selectedStar={(rating) => this.onStarPressed(rating, index)}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 4}}>
                    <FlatList numOfColumns={1}
                              horizontal={false}
                              contentContainerStyle={styles.list}
                              data={this.state.configData}
                              extractData={this.state}
                              renderItem={this.renderItem}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        padding: 10,
        backgroundColor: '#ecf0f1'
    },
    header: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold'
    },
    questionSection: {
        padding: 10
    },
    list: {
        // paddingBottom: 50,
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-around',
    },
})

export default Template3
