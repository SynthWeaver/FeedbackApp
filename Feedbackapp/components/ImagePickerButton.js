import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImagePickerButton extends Component {

    constructor() {
        super();
        this.state = {
            
        };
        
        this.imagePickerHandler = this.imagePickerHandler.bind(this);
    }

    imagePickerHandler() {
        const options = {
            title: "Select Screenshot",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };

                this.props.setImage(source);
            }
        });
    }

    render() {
        const style = this.props.style
        return (
            <TouchableHighlight style={[styles.button, style]}
                onPress={this.imagePickerHandler}
                underlayColor="#74b9ff">
                <Text style={styles.btnText}>Choose Photo</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "orange",
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
});