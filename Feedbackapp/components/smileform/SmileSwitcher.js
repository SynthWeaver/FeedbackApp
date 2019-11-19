import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';

import SmilePopup from './SmilePopup'
import Smile50 from './SmileyForm'

export default class SmileSwitcher extends Component {
    constructor() {
        super()
        this.state = {
            smileyVisible: true
        }
        this.swapSmiley = this.swapSmiley.bind(this);
        //this.setSmiley = this.setSmiley.bind(this);
    }

    //swaps between the smiley screens
    swapSmiley() {
        this.setState({
            smileyVisible : !this.state.smileyVisible
        });
    }

    render() {
        if(this.state.smileyVisible){
            return(
                <TouchableOpacity style={{flex: 1}} onPress={this.swapSmiley}>
                    <Smile50
                        smile={this.props.smile}
                        setSmiley={this.props.setSmiley}
                    />
                </TouchableOpacity>
            );
        }else{
            return (
                <View style={{flex: 1}}>
                    <SmilePopup
                        smileyVisible={this.state.smileyVisible}
                        swapSmiley={this.swapSmiley}
                        setSmiley={this.props.setSmiley}
                    >
                    </SmilePopup>
                </View>
            );
        }
    }
}
