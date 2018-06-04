import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {connect} from "react-redux";
import {createTask, resetCreateTask} from "../actions/task";

const initialState = {
    Name: '',
    Description: '',
    createDate: ''
};


class AddToDo extends React.Component {
    state = {
        ...initialState,
        apiResponse: null,
        newTask: ''
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    async saveTask() {
        var rightNow = new Date();
        var now = rightNow.toISOString();
        const { Description, Name} = this.state;
        this.state.newTask = {
            createDate: now,
            Description: Description,
            Name: Name
        };
        this.props.dispatchCreateTask(Description, Name, now)
    }

    goBack() {
        const { navigation } = this.props;
        if (this.state.newTask !== '') {
            navigation.state.params.onTaskAdd(this.state.newTask);
        }

        return navigation.goBack();
    }

    render() {
        const { task: {
            confirmCreatedTask,
            failureCreatingTask
        }} = this.props;

        if (confirmCreatedTask && !failureCreatingTask) {
            this.props.dispatchResetCreateTask();
            return this.goBack();
        } else {
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
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchCreateTask: (Description, Name, createDate) => createTask(Description, Name, createDate),
    dispatchResetCreateTask: () => resetCreateTask()
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

