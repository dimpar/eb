import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {connect} from "react-redux";
import {createTask} from "../actions/task";

const initialState = {
    Name: '',
    Description: '',
    createDate: ''
};

//TODO: after adding a task, navigate to a task list, display a message that the task was added
//TODO: and retrieve all tasks again.

class AddToDo extends React.Component {

    state = {
        ...initialState,
        apiResponse: null,
        userId: ''
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    async saveTask() {
        var rightNow = new Date();
        var now = rightNow.toISOString();

        console.log("this", this);
        const { Description, Name} = this.state;
        console.log("Description", Description);
        console.log("Name", Name);
        console.log("Now", now);
        this.props.dispatchCreateTask(Description, Name, now)
    }

    render() {

        const { task: {
            confirmCreatedTask,
            failureCreatingTask
        }} = this.props;

        console.log("this.props: ", this.props);

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Input
                        value={this.state.Name}
                        placeholder="Name"
                        type='Name'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.Description}
                        placeholder="Description"
                        type='Description'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <Button title='Add' onPress={this.saveTask.bind(this)}/>

                <Text>Was task created successfully ? {confirmCreatedTask? 'true': 'false'} </Text>
                <Text>Was there an error? {failureCreatingTask? 'true': 'false'} </Text>

            </View>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchCreateTask: (Description, Name, createDate) => createTask(Description, Name, createDate)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo)

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

