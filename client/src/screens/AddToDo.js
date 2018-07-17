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
    name: '',
    description: '',
    createDate: '',
    due: '',
    reminder: ''
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
        isDueDateTimePickerVisible: false,
        isReminderDateTimePickerVisible: false,
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    showDueDateTimePicker = () => this.setState({ isDueDateTimePickerVisible: true });

    hideDueDateTimePicker = () => this.setState({ isDueDateTimePickerVisible: false });

    showReminderDateTimePicker = () => this.setState({ isReminderDateTimePickerVisible: true });

    hideReminderDateTimePicker = () => this.setState({ isReminderDateTimePickerVisible: false });

    handleReminderDate = (date) => {
        console.log('A reminder date has been picked: ', date);
        this.state.due = date;
        this.hideReminderDateTimePicker();
    };

    handleDueDate = (date) => {
        console.log('A due date has been picked: ', date);
        this.state.reminder = date;
        this.hideDueDateTimePicker();
    };


    handlePriority = () => {

    };

    async saveTask() {
        var rightNow = new Date();
        var now = rightNow.toISOString().replace(/:/g, '-');
        const { description, name, due, reminder} = this.state;
        //TODO: create an object for task
        console.log("due save:", due);
        console.log("reminder save:", reminder);
        console.log("description save:", description);
        console.log("name save:", name);

        var newTask = {
            createDate: now,
            description: description,
            name: name,
            due: due,
            reminder: reminder,
            labels: ['test1', 'test2'],
            priority: 'low'
        };
        this.props.dispatchCreateTask(newTask)
    }

    goBack() {
        const { navigation } = this.props;
        if (this.state.newTask !== '') {
            navigation.state.params.onTaskAdd(this.state.newTask);
        }

        navigation.goBack();
    }

    //TODO: add priority and labels
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Input
                        value={this.state.name}
                        placeholder="Name of this task"
                        type='name'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.description}
                        placeholder="Description (optional)"
                        type='description'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <DatePicker
                            showDateTimePicker = {this.showDueDateTimePicker}
                            isDateTimePickerVisible = {this.state.isDueDateTimePickerVisible}
                            handleDatePicked = {this.handleDueDate}
                            hideDateTimePicker = {this.hideDueDateTimePicker}
                            iconName = 'calendar'
                        />
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Due</Text>
                        <Text style={styles.iconDescription}>Set a due date and time</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <DatePicker
                            showDateTimePicker = {this.showReminderDateTimePicker}
                            isDateTimePickerVisible = {this.state.isReminderDateTimePickerVisible}
                            handleDatePicked = {this.handleReminderDate}
                            hideDateTimePicker = {this.hideReminderDateTimePicker}
                            iconName = 'bell'
                        />
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Reminder</Text>
                        <Text style={styles.iconDescription}>Add time or location reminder</Text>
                    </View>
                </View>

                {/*TODO: add priority selection here*/}
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <Entypo name='flag' size={iconSize.primary} color={colors.fourth} onPress={() => this.handlePriority()}/>
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Priority</Text>
                        <Text style={styles.iconDescription}>Add priority to your task.</Text>
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
    dispatchCreateTask: (newTask) => createTask(newTask),
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
    },
    iconDescription: {
        color: colors.lightGray
    }
});

