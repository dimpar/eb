import React from "react";
import {colors} from '../theme'
import {createStackNavigator} from "react-navigation";
import ToDoList from "../screens/ToDoList";
import AddToDo from "../screens/AddToDo";
import EditTask from "../screens/EditTask";

const routes = {
    ToDoList: {
        screen: ToDoList,
        navigationOptions: {
            title: 'Tasks list'
        }
    },
    AddToDo: {
        screen: AddToDo,
        navigationOptions: {
            title: 'Add to my list'
        }
    },
    EditTask: {
        screen: EditTask,
        navigationOptions: {
            title: 'Edit task'
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
