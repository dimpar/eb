import React from "react";
import AuthHome from "../screens/AuthHome";
import {colors} from '../theme'
import SignUp from "../auth/SignUp";
import {createStackNavigator} from "react-navigation";
import SignIn from "../auth/SignIn";

const routes = {
    AuthHome: {
        screen: AuthHome,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
    SignIn: {
        screen: SignIn,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            title: 'Sign In'
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'Sign Up'
        }
    }
};

const routeConfig = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.fourth,
        },
        headerTintColor: '#fff',
        height: 10,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    initialRouteName: 'AuthHome',
}

export default createStackNavigator(routes, routeConfig);
