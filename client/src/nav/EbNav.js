import React from "react";
import {colors} from '../theme'
import {createStackNavigator} from "react-navigation";
import ToDoList from "../screens/ToDoList";
import AddToDo from "../screens/AddToDo";

const routes = {
    ToDoList: {
        screen: ToDoList,
        navigationOptions: {
            title: 'ToDo list'
        }
    },
    AddToDo: {
        screen: AddToDo,
        navigationOptions: {
            title: 'Add to my list'
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
    initialRouteName: 'ToDoList',
}

export default createStackNavigator(routes, routeConfig);
