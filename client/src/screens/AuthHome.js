import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import { AppLoading, Asset, Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
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
                fontFamily: fonts.light,
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
                        <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                            d<Icon name="forumbee" size={20} style={{color: colors.primary}}/>itBee
                        </Text>
                    </Text>
                    <View style={{flexDirection: 'row', paddingBottom: 15}}>
                        <Icon name="sign-in" size={20} style={styles.customAuth}>
                            <Text>{" "}</Text>
                            {/*TODO: make it a button*/}
                            <Text onPress={() => this.props.navigation.navigate('SignIn')}>
                                Login
                            </Text>
                        </Icon>
                        <Icon name="user-plus" size={20} style={styles.customAuth}>
                            <Text>{" "}</Text>
                            <Text onPress={() => this.props.navigation.navigate('SignUp')}>Sign up</Text>
                        </Icon>
                    </View>
                    <View style={styles.federatedIconView}>
                        <Icon.Button name="facebook" backgroundColor="#3b5998" >
                            <Text style={styles.federatedIcon}>Continue with Facebook</Text>
                        </Icon.Button>
                    </View>
                    <View style={styles.federatedIconView}>
                        <Icon.Button name="google" backgroundColor="#DD4B39" >
                            <Text style={styles.federatedIcon}>Continue with Google</Text>
                        </Icon.Button>
                    </View>
                </View>
            </View>
        );
    }

}

export default AuthHome
