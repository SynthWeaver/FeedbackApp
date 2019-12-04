import React, {Component} from 'react';
import {
    Platform,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select';

export default class FeedbackPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedbackType: ""
        }
        this.handlePickerValueChange = this.handlePickerValueChange.bind(this);
    }

    handlePickerValueChange = (text) => {
        this.setState({ feedbackType: text });
        this.props.feedbackTypeChange(text);
    }

    render() {
        const placeholder = {
            label: 'Select the type of feedback...',
            value: null,
            color: '#9EA0A4',
        };
        return (
            <TouchableHighlight style={[styles.picker, {backgroundColor: 'white'}]} >
                <RNPickerSelect
                    style = {{height: 20, color: 'black'}}
                    itemStyle={{height: 44}}
                    placeholder={placeholder}
                    onValueChange={(value) => this.handlePickerValueChange(value)}
                    items={[
                        {label: 'Feedback', value: 'feedback'},
                        {label: 'Bug report', value: 'bugreport'},
                        {label: 'Suggestion', value: 'suggestion'},
                    ]}
                />
            </TouchableHighlight>
        )
    }
}

FeedbackPicker.propTypes = {
    feedbackTypeChange: PropTypes.func
}

const styles = StyleSheet.create({
    picker: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 10
    }
})


