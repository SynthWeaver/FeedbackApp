import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';


import Template1Config from './Template1Config'
import Template2Config from './Template2Config'
import Template3Config from './Template3Config'

const { width, height } = Dimensions.get('window');

export default class TemplatesConfig extends Component {
    static navigationOptions = {
        title: "Choose a Template"
    }
    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
        };
    }

    _onLayoutDidChange = e => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    };

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay={false}
                    pageInfo
                    currentPage={2}
                    onAnimateNextPage={p => console.log(p)}>
                    <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}>
                        <Template1Config/>
                    </View>
                    <View style={[{ backgroundColor: 'red' }, this.state.size]}>
                        <Template2Config/>
                    </View>
                    <View style={[{ backgroundColor: 'blue' }, this.state.size]}>
                        <Template3Config/>
                    </View>
                </Carousel>
            </View>
        );
    }
}
