import React from "react";
import {Picker, StyleSheet, Text, TextInput, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";
import Icon from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import {addTask, resetCreateTask} from "../actions/task";
import {colors, iconSize} from '../theme'
import DatePicker from "../components/DatePicker";
import moment from "moment";
import Constants from "../util/constants";


const initialState = {
    name: '',
    description: '',
    createDate: '',
    due: '',
    reminder: '',
    priority: '1'
};

//TODO: allow description to be OPTIONAL

//TODO: error handling. Add required fields
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
        this.setState({reminder: date});
        this.hideReminderDateTimePicker();
    };

    handleDueDate = (date) => {
        this.setState({due: date.toISOString()});
        this.hideDueDateTimePicker();
    };

    getDate = (date) => {
        return date != '' ? moment(date).format("LLL") : 'select';
    };

    //TODO: change lambda to handle creation of a tasks array. Now it will fail if the array is empty
    addTask() {
        let rightNow = new Date();
        let now = rightNow.toISOString().replace(/:/g, '-');
        const { description, name, due, reminder, priority} = this.state;

        let newTask = {
            createDate: now,
            description: description,
            due: due,
            name: name,
            priority: priority,
            reminder: reminder
        };

        this.state.newTask = newTask;
        this.props.dispatchAddTask(newTask)
    }

    goBack() {
        const { navigation } = this.props;
        if (this.state.newTask !== '') {
            navigation.state.params.onTaskAdd(this.state.newTask);
        }

        navigation.goBack();
    }

    // TODO: add priority and labels
    // TODO: add 'repeat' functionality in due date
    // TODO: add 'time needed' field.
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
                    <TextInput
                        value={this.state.description}
                        placeholder="Description (optional)"
                        style={styles.inputContainerTextInput}
                        placeholderTextColor={colors.lightGray}
                        onChangeText={value => this.onChangeText('description', value)}
                        multiline = {true}
                        underlineColorAndroid='transparent'
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
                        <Text>Due: {this.getDate(this.state.due)} </Text>
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
                        <Text>Reminder: {this.getDate(this.state.reminder)} </Text>
                        <Text style={styles.iconDescription}>Add time or location reminder</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <Entypo name='flag' size={iconSize.primary} color={colors.fourth} onPress={() => this.handlePriority()}/>
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Add priority to your task:</Text>
                        <Picker
                            style={styles.twoPickers} itemStyle={styles.twoPickerItems}
                            selectedValue={this.state.priority}
                            onValueChange={(itemValue) => this.setState({priority: itemValue})}>
                            <Picker.Item color={colors.fourth} label="Do, important but not urgent" value={Constants.PRIORITY.URGENT_IMPORTANT} />
                            <Picker.Item color={colors.third} label="Do now, urgent and important" value={Constants.PRIORITY.NOT_URGENT_IMPORTANT} />
                            <Picker.Item color={colors.primary} label="Do later, not important or urgent" value={Constants.PRIORITY.URGENT_NOT_IMPORTANT} />
                            <Picker.Item color={colors.greenish} label="Delegate, urgent but not important" value={Constants.PRIORITY.NOT_URGENT_NOT_IMPORTANT} />
                        </Picker>

                    </View>
                </View>

                <Icon name='md-checkmark-circle' style={styles.iconSend} size={iconSize.primary} color={colors.fourth} onPress={() => this.addTask()}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchAddTask: (newTask) => addTask(newTask),
    dispatchResetCreateTask: () => resetCreateTask()
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo)

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        borderBottomColor: colors.fourth,
        borderBottomWidth: 2,
        paddingBottom: 20,
    },
    inputContainerTextInput: {
        fontFamily: 'light',
        fontSize: 16
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
    },
    twoPickers: {
        width: 240,
        height: 40,
    },
    twoPickerItems: {
        height: 40,
        fontSize: 16,
        textAlign: 'left'
    },
});

