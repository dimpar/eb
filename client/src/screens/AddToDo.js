import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";
import Icon from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import {createTask, resetCreateTask} from "../actions/task";
import {colors, iconSize} from '../theme'
import DatePicker from "../components/DatePicker";

const initialState = {
    Name: '',
    Description: '',
    createDate: ''
};


class AddToDo extends React.Component {

    //is there a better way to go back to ToDoList?
    //we execute this function every time we type (create) a new task
    componentDidUpdate() {
        const { task: {
            confirmCreatedTask,
            failureCreatingTask
        }} = this.props;

        if (confirmCreatedTask && !failureCreatingTask) {
            this.props.dispatchResetCreateTask();
            this.goBack();
        }
    }

    state = {
        ...initialState,
        apiResponse: null,
        newTask: '',
        isDateTimePickerVisible: false,
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.hideDateTimePicker();
    };

    handlePriority = () => {

    };

    async saveTask() {
        var rightNow = new Date();
        var now = rightNow.toISOString().replace(/:/g, '-');
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

        navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Input
                        value={this.state.Name}
                        placeholder="Name of this task"
                        type='Name'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.Description}
                        placeholder="Description (optional)"
                        type='Description'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <DatePicker
                            showDateTimePicker = {this.showDateTimePicker}
                            isDateTimePickerVisible = {this.state.isDateTimePickerVisible}
                            handleDatePicked = {this.handleDatePicked}
                            hideDateTimePicker = {this.hideDateTimePicker}
                            iconName = 'calendar'
                        />
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Due</Text>
                        <Text>Set a due date and time</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <DatePicker
                            showDateTimePicker = {this.showDateTimePicker}
                            isDateTimePickerVisible = {this.state.isDateTimePickerVisible}
                            handleDatePicked = {this.handleDatePicked}
                            hideDateTimePicker = {this.hideDateTimePicker}
                            iconName = 'bell'
                        />
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Reminder</Text>
                        <Text>Add time or location reminder</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <Entypo name='flag' size={iconSize.primary} color={colors.fourth} onPress={() => this.handlePriority()}/>
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Priority</Text>
                        <Text>Add priority to your task.</Text>
                    </View>
                </View>

                <Icon name='md-checkmark' style={styles.iconSend} size={iconSize.primary} color={colors.fourth} onPress={() => this.saveTask()}/>
            </View>
        )
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
        paddingHorizontal: 30
    },
    iconSend: {
        textAlign: 'right'
    },
    icons: {
        padding: 15
    },
    iconTitles: {
        padding: 20
    }
});

