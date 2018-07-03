import React from "react";
import {colors} from '../theme'
import {createStackNavigator} from "react-navigation";
import Calendar from "../screens/Calendar";

const routes = {
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            title: 'Calendar'
        }
    }
};

const routeConfig = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.fourth,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    initialRouteName: 'Calendar',
}

export default createStackNavigator(routes, routeConfig);
