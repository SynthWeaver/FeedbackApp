import React from 'react';
import Smile50 from './smileform/SmileyForm'
import { Text, Image, View, StyleSheet, TextInput, Linking } from 'react-native';



var apps = {};
fetch('http://localhost:8085/get/apps')
    .then((response) => response.json())
    .then((responseJson) => {
        apps = responseJson
    }).catch((error) => {
    console.error(error)
})
class Applications extends React.Component {
  //Title of the screen
  static navigationOptions = {
    title: 'Feedback',
  };

  state = {
      dataSource: {}
  };
  arrayholder = [];
  
  render() {
    //Last value of the deeplink: the id of the application to give feedback to
    const { id } = this.props.navigation.state.params;
    const appId = id;
    //If statements checks which application is going to be reviewed
    //It might be a good idea to have different type of feedbackcategories: For example that pathe and videoland use the feedbackcategory A-Type
    //where users can fill in a textbox, smiley face and spinner. While e.g. Nubeox, RTL XL and FOX Sports feedback B-Type where users can fill 
    //only the Smiley face and add a picture
    if (appId == 0) {
      return (
        <View>
          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
            a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
            different components will be shown.
          </Text>
        </View>
      )
    } else if (appId == 1) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )

    } else if (appId == 2) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )

    } else if (appId == 3) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )

    } else if (appId == 4) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )

    } else if (appId == 5) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )

    } else if (appId == 6) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )

    } else if (appId == 7) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )
    } else if (appId == 8) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>
        </View>
      )
    } else if (appId == 9) {
      return (
        <View>

          <Text style={styles.text}>Give feedback about {apps[appId].appName}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].logoURL }}
          />
          <Text>Components can be added depend on what is prefered. Every company can get it's own components. For example, Pathe wants
        a dropdown with options, while RTL XL can have a textbox. A deeplink navigates the user  always to the same page, but based on the appId,
        different components will be shown.
          </Text>

        </View>
      )

    }
    //When the their is something wrong with the deeplink, navigate the user back to the home page where he or she can choose an app to review
    else {
      Linking.openURL('://feedbackapp');
      return null;
    }
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 19,
    fontSize: 22,
  },
  image: {
    width: 400,
    height: 400,
  },
});
export default Applications;