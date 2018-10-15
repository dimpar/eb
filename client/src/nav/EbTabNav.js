import React from 'react';
import {createBottomTabNavigator} from 'react-navigation'
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import OcticonsIcon from '@expo/vector-icons/Octicons';
import SimpleLineIcon from '@expo/vector-icons/SimpleLineIcons';
import EbNav from './EbNav';
import Calendar from "../screens/Calendar";
import Notes from "../screens/Notes";

const TabNav = createBottomTabNavigator({
    ToDoItem: {
        screen: EbNav,
        navigationOptions: {
            tabBarLabel:"ToDo List",
            tabBarIcon: ({ tintColor }) => <OcticonsIcon name={"tasklist"} size={27} color={tintColor} />
        }
    },
    CalendarItem: {
        screen: Calendar,
        navigationOptions: {
            tabBarLabel:"Calendar",
            tabBarIcon: ({ tintColor }) => <FontAwesomeIcon name={"calendar"} size={27} color={tintColor} />
        }
    },
    NotesItem: {
        screen: Notes,
        navigationOptions: {
            tabBarLabel:"Notes",
            tabBarIcon: ({ tintColor }) => <SimpleLineIcon name={"notebook"} size={27} color={tintColor} />
        }
    }

}, {
    tabBarOptions: {
        activeTintColor: '#222',
    }
});

export default TabNav;
