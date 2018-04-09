import React from "react";
import Other from "./Other";
import CalendarScreen from "./Calendar";
import ToDoList from "./ToDoList";
import {Button, Text, View} from "react-native";
import {API} from 'aws-amplify';

export default class Home extends React.Component {
    state = { apiResponse: null };

    async getSample() {
        const path = "/ebtest"; // you can specify the path
        const apiResponse = await API.get("eb" , path); //replace the API name
        console.log('response:' + apiResponse);
        this.setState({ apiResponse });
    }

    render() {
        return (
            <ToDoList />

            // <View>
            //     <Button title="Send Request" onPress={this.getSample.bind(this)} />
            //     <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
            // </View>


            // <CalendarScreen />
        );
    }

    // logout = () => {
    //     Auth.signOut().then(data => console.log(data));
    // };

    navigateClick = () => {
        this.props.navigation.navigate('Other');
        // Analytics.record('EB button click');
    };
}
