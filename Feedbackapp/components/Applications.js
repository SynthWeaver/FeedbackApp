import React from 'react';
import Smile50 from './smileform/SmileyForm'
import { Text, Image, View, StyleSheet, TextInput, Linking } from 'react-native';


//This is a list of applications that 24i has made. Later on we will load this applications and their properties from a server.
const apps = {
  0: {
    name: 'Pathe',
    image: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcT9CDoAI0Al.KRGh5tQle3A_QQ2kWJswmpQuhPwsf6BkwTt0e09NugN3mRxDo2zh3xr3K3qJTjbQagcNCPTMSSK7IOrggfQP7Nit_Qckd06Mir_vFNr8hgIi_2e_GeqWt1cSgIMQniKOPgnRgJCcupdJOHM84pFVSBxc_r65j2p4-&h=1080&w=1920&format=jpg',
  },
  1: {
    name: 'NPO',
    image: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/da/9b/e6/da9be644-0138-9889-6502-e8379641fbe0/AppIcon-0-1x_U007emarketing-0-0-85-220-0-7.png/246x0w.jpg',
  },
  2: {
    name: 'FOX Sport',
    image: 'https://storage.pubble.nl/350eaab2/content/2019/9/f6a8a8bf-a65a-4a9b-972d-ae70f0de327f_thumb840.jpg',
  },
  3: {
    name: 'Videoland',
    image: 'https://lh3.googleusercontent.com/9rwyG6MORZddxe07mVddszcTt0vRnV0Rxijk1mQtNdN7pY2LUJhDIXJroDpROn76c7kN',
  },
  4: {
    name: 'NLZiet',
    image: 'https://www.nlziet.nl/nl/wp-content/uploads/2017/09/NLZIET_Op_Wit.png',
  },
  5: {
    name: 'RTL XL',
    image: 'https://vpndiensten.nl/wp-content/uploads/2016/03/rtl-xl-in-buitenland.png',
  },
  6: {
    name: 'Blim',
    image: 'https://vignette.wikia.nocookie.net/logopedia/images/1/1a/Blim_logo.jpg/revision/latest?cb=20161106231057',
  },
  7: {
    name: 'Globo Play',
    image: 'https://www.tvaddons.co/wp-content/uploads/2019/09/plugin.video_.brplay-fanart.jpg',
  },
  8: {
    name: 'Kijk',
    image: 'https://www.shownieuws.nl/wp-content/uploads/sites/2/2015/04/kijk-1000x562.png',
  },
  9: {
    name: 'Leela',
    image: 'https://vignette.wikia.nocookie.net/en.futurama/images/d/d4/Turanga_Leela.png/revision/latest?cb=20150218013044',
  },


}
class Applications extends React.Component {
  //Title of the screen
  static navigationOptions = {
    title: 'Feedback',
  };
  render() {
    //Last value of the deeplink: the id of the application to give feedback to
    const { id } = this.props.navigation.state.params;
    appId = id;
    //If statements checks which application is going to be reviewed
    //It might be a good idea to have different type of feedbackcategories: For example that pathe and videoland use the feedbackcategory A-Type
    //where users can fill in a textbox, smiley face and spinner. While e.g. Nubeox, RTL XL and FOX Sports feedback B-Type where users can fill 
    //only the Smiley face and add a picture
    if (appId == 0) {
      return (
        <View>
          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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

          <Text style={styles.text}>Give feedback about {apps[appId].name}</Text>

          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: apps[appId].image }}
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