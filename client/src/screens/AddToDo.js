import {StyleSheet, View} from "react-native";
import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { API } from 'aws-amplify';

export default class AddToDo extends React.Component {


    state = {
        apiResponse: null,
        userId: ''
    };

    handleChangeTaskId = (event) => {
        this.setState({userId: event});
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    async saveTask() {
        let newTask = {
            body: {
                "Description": "Call Bucktop!",
                "Name": "My main task!"
            }
        };

        const path = "/MyTasks";

        // Use the API module to save the task to the database
        try {
            const apiResponse = await API.post("MyTasksCRUD", path, newTask)
            console.log("response from saving note: ");
            console.log(apiResponse);
            // this.setState({apiResponse});
        } catch (e) {
            console.log(e);
        }
    }


    render() {

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Task"
                        type='task'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        placeholder="Category"
                        type='category'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <Button
                    title='Add'
                    onChangeText={this.onChangeText}
                    onPress={this.saveTask}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40
    }
});

