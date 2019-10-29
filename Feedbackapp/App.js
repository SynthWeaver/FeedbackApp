import * as React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import _ from 'lodash';

import Login from './components/Login'
import FeedbackScreen from './components/FeedbackScreen'



class DefaultPage extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };


    render() {
        return (
            <View style={defaultStyles.container}>
                <Image style={{flex: 0.3, resizeMode: 'contain'}}
                       source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAACdCAMAAAD2bIHgAAABVlBMVEX///8mhP/w0LRyWUuHYU6y1P9rU0bswZz/xAD/iwAAe/+s0f//wQAghv/vza//wgAAfv90V0H5/P//ggD/hgD41K/0+f+AXk0dgf/10rHx9/9wWEsAef8Aff/I4P9oTDzz28bS4/96XEx2Vjfy1r3p8v/r6Oa62P+AVkDd7P///PDb1tPtxKFFkv/N4P8qgvb/5c3/1WT//fZ7rv/359n/pVD68Ohup/9WbKBgRDVPl///wYvX6P//7cH/+ef/5aL/z0iQfXOixP/Ox8OTvP/0xJaoyf+qnZZ8UDndyLxyqf+Itf/DvcmZemu6p55eZomss9RFdceEo+RNcbaerdr/3Yf/yzP/8s+/tbCEb2T/2HL/4pyMeW9DifDTtKT/sWx1meCwq8Gfj4f/mDAxb83/rF9sXVz/lCBjY3pflfBYapi5rLWQp994n+dqXmSzuclhZIBUNB9xNUXvAAAR60lEQVR4nO2d61/TyBrHW2prSRsIvWB6p5S2FCy3IhUsiOUmsLrqChYv6znuHtfuunrO///mzCRprpPMJVMCn/X3Rg22Hb59nnkuM8mEQj/0Q+NSvRyNNltBj+I2q5yIAiWis0EP5NZKJQiVCnoot1R1nWC0HPRYbqmaOsFoIjAzXLrcDeqjOShqQlgPahBvksm9oD7bvxI3AeFeMh4P6rP9y2yF+aAGARBOr6t/u1gPahDMKpsYBjYIaIXJx6Glx5fJ6eRSYMNg1KzuyYngsuslgDA+vZ9USWoaVCpXg8CGRKOWxjARYE6zARGq2tcvbkcikUqkEdyoyFWPJqB6wY1g7+30iOC07saNSgRqezm4cVEo32oFFoxDe3ACHBE03DgUUhFGKreDYXDaUyZAXZemH0U0VX4Unp7atRCMx00Z9pWGMPYpuOGxqAUKvuZ1evXeO2CH0ygzvNLN8FaElJGaCdbgnMozJ+Ybu+tGODEy6yexEcLnrO8cgEaNL+rw3FOiOrv5qvimLQFFRxi5Yn3b65fR+KJr2uSjfnPLfQjv4m0cuHTyjXbtvY6wwviuAajK1nHIG62KRJPtk/c1F37z7lI3Q30uvE2ToVEvUxV7piqbfgpQBa1wQ/2rnltHDITBpoYpINL/W2VC2EpYGDJlcevxpKPpakJ4wPKevlVv9js7bVEuAcliu3t+vIINmaa5kGItqhm1IGRqVqwn3zquVYJE2Ot3ZaEkyXJ4JFmWJUEQzzBz3IgGVViwGCHjCszjyw37pUZwCFfOw0XJgGeRXCq2+x5mMquGVqqgkLIhZAwoDi0HhLB+GBZc8GmSPvx6f9P19akySPCiVCHBjpBXz+zAhPD6wkmvK0ie/IAdvj66CzTn/iaztEvyVoLRqp/fwKST2PUj7A2L3gYIALZ/VQh6Q6RU2UKQ2wLME1NEvp68MN/FAgzLX0cAodzdmU6zFk/mNRWGYiaEfNpdax+zXr9zv4QHuDowE7x79/4Wl5GFeokxGKEpIEdifN7yQSaTzjx4tOAI/lCttoADGJb+ddehBT5jM7bl8FuKNkWTSITLO26mJ6Ey6UnED48xURiaYPivIydCXobYUpKhRKLJb3eYKZpw6tQ8ykyqDB84f9bFm6A8vI8iyG9GrFfL5R7PpfwrkxG+5/KOkyM5HDnfxiUyoDb5twtArqGZp1IVEoSNwcnJ88GAKPPOqX48mXYYTSuMdWJpeJqdgrp/H8Vwws+vOi5ZpkL0XLh8clWpzCwqIoD4QPXjdNb+gyo2EsvS6+yELsDRwXDK9y/MX59MU6GzwGscQHyxQuSOpqfYtYEt1QjTj+w/WCliTXDn1ERQxWineJ/bb85NEYsqkZOD5QbU8sHgE6BXUQjfu6PrKS77VoOJM5T0sIHEYoKuEK+JYb4aPex0d9pAO8PO4fGKawq0XLEyjMQqukb2aQIIhFspVSfCP+yX69iKuH2AIgghXrcvt47PxJLSgRtJkgQhPOyvoEoPc0qDlhUgkPfHryl+nLFPhLMiZh6UvuZyaIJAVkPklGS7aKUjujTgZEmQus4GL4bfvAPgnUXvEWjB5MGaNaPZ8SYor7qZIMoQeVXMTrXOMQ04uSR0raW1w49NKkTmHfywVqgFExBO0mZfPi95m+CrKXcTRBgip4LZrpWdIjZvBRQFsW9y6E/ufozmh5sLt9LpzAiicbXpGYxl8SdPE0QwHAfAZhtfe46+8tLhCGLKaYQFSA/hv3pExrUU1440gmv6pVnP71b6ewJngg6G/FPsKjlAZdDysfq6gQOhOztNz/Cj+U0hmDMudD0GJ4e/E5iggyHn6XD2DN/BtKnUXoGvdNggDuCdRXxTVmnUpI+MC15uLA0XiEzQwZArwahMCxB++cVOylbckRAEDLE76D5mbLWJxyjCL0hNUNF4MptUF1s3uXz/YuvKRtAtglgZ3vFubW9Agh9NF/quM6E0PCU3QShzboPs57KoJRKEYRf9XqOdCFV5T4dHmcnMf0z/nnXLZ2SZzgRtDHlFlCj1LGhI/Eyax9jkHZTt9fGhy3cMZkFqgpbpkE9yeMjoxArBl3YjdJsL7ca56NWtyaYzv5n/7ZLQsJjgOMywg++ieyB0AER58j1UjugVUX7L/GGZpdAzIeysshC0mCGH2fDMF8E/Z3AM782jfXvxxH1Ma2lbu19EfLYsI9tatGY4FzBBRywZzYealBoZHV+8Wte5tHWKWkEMkt0EbWbol+C5H4LhcAFNEKgAhOzR6AgpRuksTFhnQYQZ+ixR+j4iCTDCLyg31pwZk9tgq2ST8o6Mxp8JQhkIc/gBeKjsjyByIlQd2ZsfsEGarUsJG0K/Jgile/LRX35W07FtdG+CD10mwgi+xqMiaPNjWXpF1pTxlObJR78Oi372FbXZM+qwKP7sThBfoDyjYWgepiz97deHVSkA73+VZbnDThDTBPYG+PKz+zxYwBKkmgurRsiT5Vd8AEJPPrr7WumtiMwEe8wTIQToboJkCCkispZXy7I0fDHBCSBE+FpbzCoyb85idWMcQCJHBgiJn0LQVRYQ5eGL06z/OVBTLvdCXw0ssU6GfTY3JgAYIWoZYpeSdYVXh69eHOT48bMABBnSIRtB75UIL4Duc6Aha1KDzhER3a6tuQWL5hRN5LIc8SkAVy0RqsuGsMOAUBR/KZAAVCDeUzTvUiEjrXBhiiMoL4C2373NRLBOX9hBgHgXNqSUePOuSbazRr4OggiAwJOZEJ7TGiGNBWp26FEgQ9mHtDV+gnYX1iSwbFZ1Vp1YgBE6gLig7MwL564BIHpPjsByI6L7Yg4SYJgWIDYkP3Mugy6MGeDEa7dNTcIKA0JUC9MD4AwlQHxiiFi/GyvA7MRr9/3FAsNddKgWphtAahcmMULUYvwYHTm78NVrgzZLbt0hLUzYAJKk1s6scGzhBAMQIGR4CB/hTCiKD6ldmBQhos2wORaG2dNXuI0aDFZI5sfsAEmKZFSJvDXHHSIBQDAX0iN0W9fmBRBphjaq6NWnDb4TYvb0b7fb5S0I6SMyvkcjrvoCaLdDxDoyas//Jtf6JJc9GJIAZEGYx/mxf4BQ+joo0q8RTYaAALLMhZipkA9ATQW3VWSnEXLkBwD+RAwQIEzQIvQsTbgCdI0rT50zIcd4nMt9/0AOMByW+rQIz9zf3WcQccilT/MUEY651XegFMbfKmoR/QKUazQBFljjCdAtP0TYIDeEyG4WDuEOLUIXgpxd2BXhU0SLIcSpvsu69xI8RUkQHZDHARA1FT51W0HmUN+BSo5lxzjIaijX8FoIhOLqn/wBxmKVyqIlDC8ufnJfPvYNkKQQQYs2q6k6EPK3wEqlEnn/6WSw3Hi2ONKdZ889l999mWEOFCKsAOnjSdmGkDfAmVrhy2DZaAg2lpcP4O3J2IGxpzU0eTRSlBsampamP2eAM7Vvv3wIM64qbjFGZao8GimB7lGYURNCzmlMLfLwgyiG5SETwU1GgKdUeTRS8jkjQs4WWPv2UlRWFJjWtrem2Pw4+8I3QDhkqrE2hfEA/KwBZEPIGkwAQf8AactktcvAew6c+UXU17RYduyxAZzIfudCMBxepUXIGeB87U/RtCgo0c0sUIxGmDvl4MSKBJr1k2ZJARjDPpKCWLUvHyyrqvSdD9aEJtfmRJAur4nKIArHYtwQzhRe2palGVbE2KJx9hUvI6TbIve9ogDkhNAyCWoS6J9uymaFB5wmQkVF8m0hJ5UYP4S1n1edOyMYdt5usCDMDvkZIXxKEPFon8S4Iax9+4C8O46aIJMZ5nhFY00ScSJR4IVwJmKfBDWC1B1MKPo15Cy/WKJKOCYbamObD8KZ2sMwencT495l2gqZtxECEd7FszxC6H4LIolqXxCToPZlMj5unDIqZz/wJkg6dC7RZOYz2ofVcTDd1EabXOd+4m6EYUI7jPj3Y1QiY4htKqQuT3yHY/TLi/hZqOHbj+eRiYwhhtqEJanxW9pJQ/QTTYUu7snmz/36sUsiYxoDy85l6nice+0PoTQMVUXkjnNZxGyxKfgzQmc15xgB010c1P1qnxmNOsq+hJxPi2detYEej9kAuiYyhiTC5MonQn+1nSyqIS/VRzysURbCXr/DlR+Ctf96ToKq2OIxrSNnv/rxY1k07jRZOZMF/cQjeNqR3PF0ZLQRkjn1zLffCW4UkM9YCKJbrlNwLQDeiLewMGVbFsitciIIVe1327JUKknh9tkxrkWCNMICiVF6JzKGiowHN29MTNnoLcxtmh61smVNvP34sdRGOcpsPk9yyMjBNiKWkPi1rS3t8QWzLd5BbY4MDfxpoaf/3GSEPuKxwLhEqyiFSGiI5kZ7W9pdRT8HIW3OKdaHwAdlTh195NUEubOHnowQQkOEMv7pxRCfyOhivbWXRJbsm/WhCLLEcrOYrsF2zEPuk+BDMh9WvuIxntVsRjhXZXviojD0dcTLsidBN4ZEicxIxtLdG6+RsMlURU9thlId+ocuSjL1pmqLGhiCSIY1okRGl74Ktpu8fLfkNRoGmRHC2bK3Q/UAZJAxd/yd69Wo4Ag6Gc5EyBKZkYr6PHMZjyeT646jV33JFJG1Mw4oHsMNAHaZjj81RELQxpA4kRnJ5MZJ5RzvZPxiz9+wzTIh1B8EHG2TubNU9AsQOw8iIHq0pV2+Z1N/4c1+UjlPfjq573Pkhky59ZxxtdoVcMfwgJr30HeYc4nFqKv0iYz+TVuG+WZdgZh853fsuoz97FOWRw7OHu8UXSnia14iNd4jCVa2B0YL2wqRKpHRVLQPdO8tPEqeX1AxIbTn3rPRjlgUJOtOYXhCS2nnkMehp4Nt1DxY2X7SAHSR1olpS6MJIvpDSxeIo6iZ5YEQqr7S7+yIUklQJIXbw/NEj8/Rmif/Q9ggAKhuHUekOpSJjCoBXTYtccxsTAg9ngKcr7eA6vwOSYRKDSLbZkOsVLYLA33zuD3QzMSoJ0FIkH47HLVMCMf/YQ41Bp8K25piTwaWzfcWhpUa/SR4TQTNt0ddw6ch1VgGQty6YEoZqRMZVf6aH6Qy5YXX8XFUahRUiJ7r614EGR6wwaCtG4wwFIJZT4WwLW2XLPM6Kx0nHeF4z19j1PNtlkQGStjhG/w8tHCTrRAEld+Z2sCyYNm6sMu7O2OR4cnj/BQfYui/hYW2pXjfTcb5nGJzZDrzafORXs4t3HCEoR7B8esWSbZV913Yn+HRmnmUTuvnxaylM+nR9zLqW9/Es3k1RUUKiJJwbiuf1BYXB4YfM/qZO/BwUOPYCc2VkQXeTVFilbCJKUnnzkdPKmY47b/nv6Wf66sQNJ1Dpq42exV4N0DNoYA/iV1Y7SPjsMIw6b9ZPWJoJxiCXcOpKQ5JzSwopWlSiXq1XCZv2tYP24L7zZXeDbjHXBkiCMKf+XfjfDMB1SRuxDYT0Wg0EaWA3jrekeztNxWf0D73bGBe8GSIJMhBPQgEKkFYFTS1/x+lap6lesedHRm23kpQglCUVrv9JvbZu2+TcS7N/i3lVNXMOAi2RgQBQ6IdQMYLGDbiz7aqyjfQXOmRGv06p+WSbAZ10jkHpQyCgCGJbzaN/z+G8SBSmAsub7ymHJBsPU+Qj3pmhER2RUmcSrv7HNdGLIKRJDMehs2oRQSvcEGYBx7aLPtbGwTxl+MKnVlqLF4aC0MrwQRBhCgjgZdVa040/VjmBgy/Pl7vqlE2szUOhglqhHU9gpuiT1N/Hyrv3rCVBesggXlM8XpCGfngOBharZAoQFRHBmdcKico30PRZdIebHfHY4agRh7lg5Bhmu955GULQbI0pReFqbgpi8xbwjpx3XIZj1/aLvHJo+06ShsZ9dZkepLvu1t/e9JoUG/VzS5ftXwPxE9Nu3Sa3MW0EysHra0Zf9/I8W4qmHwwwXjTqi2sE29bjDsR7iXHYoZjlh4JEsynCNoQkhZ+sJNlvwYtc591HIGpmlDaBqQlMkLsVpi0X3ucnE6u3+z2HUqpVrlcbvnYcWOdC4lDMkRop7UR574h+FaobolJxLcrQYT/SF4oNVmMcANE3yTHjb+3WymGxAiUc9PTyTHcDHFLldLieiJK3mjYuAD6YYWGWk0Q1JuctoH+Y/UDH07/B27Ad/rWFqrQAAAAAElFTkSuQmCC'}}/>
                <View style={defaultStyles.btnContainer}>
                    <Text style={defaultStyles.header}>Are you a guest or an admin?</Text>
                    <TouchableOpacity style={[defaultStyles.button, {backgroundColor: '#74b9ff'}]}
                                      onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={defaultStyles.btnText}>Guest</Text>
                    </TouchableOpacity><TouchableOpacity style={[defaultStyles.button, {backgroundColor: '#74b9ff'}]}
                                                         onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={defaultStyles.btnText}>Admin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    btnContainer: {
        flex: 0.35,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#636e72'
    },
    button: {
        padding: 10,
        margin: 5,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        height: 65,
        borderRadius: 10,
    },
    btnText: {
        padding: 5,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 25,
        color: 'white'
    },
    header: {
        fontSize: 25,
        color: 'white',
        margin: 10,
        alignSelf: 'center'
    }
})

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Apps',
    };
    state = {
        text: ''


    };
    arrayholder = [];



    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.appName ? item.appName.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            text: text,
        });
    }

    componentDidMount() {
        //change password to your local db password
        fetch('http://a39de6a7.ngrok.io/get/apps')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState(
                    {
                        dataSource: responseJson
                    },
                    function () {
                        this.arrayholder = responseJson
                    }
                )
            }).catch((error) => {
                console.error(error)
        })
    }
    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={styles.shadow} activeOpacity={.7}
                                  onPress={() => this.props.navigation.navigate('Details', {
                                      app: item.appName
                                  })}>
                    <Image style={styles.logoicons} source={{uri: item.logoURL}}/>
                </TouchableOpacity>
            </View>
        );
    }


    render() {

        return (
                <View style={styles.container}>
                <View style={styles.search}>
                    <SearchBar
                        lightTheme={true}
                        placeholder="Search for app..."
                        value={this.state.text}
                        onChangeText={text => this.SearchFilterFunction(text)}


                    />
                </View>
             
                <View style={{flex: 3}}>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        contentContainerStyle={styles.list}
                        data={this.state.dataSource}
                        renderItem={this.renderItem}

                        style={{ backgroundColor: '#ecf0f1' }} />
                </View>
                <Text></Text>


            </View>
        );
    }
}



const AppNavigator = createStackNavigator(
    {
        Launch: DefaultPage,
        Home: HomeScreen,
        Login: Login,
        Details: FeedbackScreen,
    },
    {
        initialRouteName: 'Launch',
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ecf0f1'
    },
    button: {
        margin: 10,
        alignSelf: 'flex-start',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
    logoImg: {
        width: 170,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden'
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
    },
    list: {
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoicons: {
        margin: 10,
        height: Dimensions.get('window').width / 3.2,
        width: Dimensions.get('window').width / 2.4,
        borderRadius: 15,
      
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    search: {
        marginTop: 0,
        paddingTop: 0,
        height: 60,
        width: Dimensions.get('window').width,
        overflow: 'hidden'
    },
})
