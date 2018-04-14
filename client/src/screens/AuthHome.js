import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import {FontAwesome} from '@expo/vector-icons';

import {colors, fonts} from '../theme'
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Swiper from "../components/Swiper";

class AuthHome extends React.Component {

    render() {
        const styles = StyleSheet.create({
            main: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.gray
            },
            federatedIcon: {
                fontSize: 15,
                color: "#fff",
                fontFamily: 'Arial',
            },
            federatedIconView: {
                width: 220,
                padding: 5
            },
            customAuth: {
                fontFamily: 'light',
                color: colors.fourth,
                padding: 10
            }
        });


        return (
            <View style={styles.main}>
                <View style={{flex: 1}}>
                    <Swiper/>
                </View>

                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 35, color: colors.primary, padding: 15}}>
                        <Text style={{color: colors.primary, fontFamily: 'bold'}}>
                            d<FontAwesome name="forumbee" size={20} style={{color: colors.primary}}/>itBee
                        </Text>
                    </Text>
                    <View style={{flexDirection: 'row', paddingBottom: 15}}>
                        <FontAwesome name="sign-in" size={20} style={styles.customAuth}>
                            <Text>{" "}</Text>
                            {/*TODO: make it a button*/}
                            <Text onPress={() => this.props.navigation.navigate('SignIn')}>
                                Login
                            </Text>
                        </FontAwesome>
                        <FontAwesome name="user-plus" size={20} style={styles.customAuth}>
                            <Text>{" "}</Text>
                            <Text onPress={() => this.props.navigation.navigate('SignUp')}>Sign up</Text>
                        </FontAwesome>
                    </View>
                    <View style={styles.federatedIconView}>
                        <FontAwesome.Button name="facebook" backgroundColor="#3b5998" >
                            <Text style={styles.federatedIcon}>Continue with Facebook</Text>
                        </FontAwesome.Button>
                    </View>
                    <View style={styles.federatedIconView}>
                        <FontAwesome.Button name="google" backgroundColor="#DD4B39" >
                            <Text style={styles.federatedIcon}>Continue with Google</Text>
                        </FontAwesome.Button>
                    </View>
                </View>
            </View>
        );
    }

}

export default AuthHome
