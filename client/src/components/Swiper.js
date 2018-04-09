import React, { Component } from 'react'
import { colors, fonts } from '../theme'
import {
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
    Button
} from 'react-native'
import Swiper from 'react-native-swiper'
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Tabs from '../auth/Tabs';
import AuthHome from "../screens/AuthHome";


const { width } = Dimensions.get('window')

const styles = {
    img_container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    headline: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width,
        flex: 1
    },
    imageText: {
        color: colors.white,
        backgroundColor:'transparent',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fonts.base,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
}

export default class extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} horizontal={true} autoplay={true}
                        dot={<View style={{backgroundColor: colors.primary, width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
                    <View style={styles.img_container}>
                        <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.image} source={require('../assets/laptop.jpg')} >
                            <View style={styles.slide}>
                                <Text style={styles.imageText}>
                                    Until we can manage time, {"\n"}
                                    we can manage nothing else.
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                     <View style={styles.img_container}>
                         <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.image} source={require('../assets/coffee.jpg')} >
                                 <View style={styles.slide}>
                                    <Text style={styles.imageText}>
                                        Focus on being productive instead of busy.
                                    </Text>
                                 </View>
                            </ImageBackground>
                     </View>
                    <View style={styles.img_container}>
                        <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.image} source={require('../assets/wood.jpg')} >
                            <View style={styles.slide}>
                                <Text style={styles.imageText}>
                                    Think of many things; do one.
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                 </Swiper>
            </View>
        )
    }
}
