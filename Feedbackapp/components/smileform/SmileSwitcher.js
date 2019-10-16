import React, { Component, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import SmilePopup from './SmilePopup'
import Smile50 from './SmileyForm'

export default class SmileSwitcher extends Component {    
    constructor() {
        super()
        this.state = {
            smileyVisible: true,
            smile: 1,
        }
        this.setSmiley = this.setSmiley.bind(this);
        this.swapSmiley = this.swapSmiley.bind(this);
        this.newSmiley = this.newSmiley.bind(this);
    }

    setSmiley(userInput){
        this.setState({
            smile: userInput
        });
    }

    swapSmiley() {
        this.setState({
            smileyVisible : !this.state.smileyVisible
        });
    }

    newSmiley(value) {
        this.setState({ smile: value })
    }

    render() {
        if(this.state.smileyVisible){
            return(
                <TouchableOpacity style={{flex: 1}} onPress={this.swapSmiley}>
                    <Smile50 
                        onNewSmiley={this.newSmiley} 
                        smile={this.state.smile}
                    />
                </TouchableOpacity>
            );
        }else{
            return (
                <View style={{flex: 1}}>
                    <SmilePopup 
                        smileyVisible={this.state.smileyVisible} 
                        swapSmiley={this.swapSmiley}
                        setSmiley={this.setSmiley}
                    >
                    </SmilePopup>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

});