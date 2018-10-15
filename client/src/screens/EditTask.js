import React from "react";
import {Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";
import {resetUpdateTask, updateTask} from "../actions/task";
import Button from "../components/Button";
import {colors, iconSize} from "../theme";
import DatePicker from "../components/DatePicker";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import Constants from "../util/constants";

class EditTask extends React.Component {
    constructor(props) {
        super(props);

        const { navigation: {
            state: {
                params: {
                    item,
                    id
                }
            }
        }} = this.props;

        console.log("displaying item:", item);

        this.state = {
            id: item.id,
            description: item.description,
            name: item.name,
            due: item.due,
            priority: item.priority,
            reminder: item.reminder,
            isDueDateTimePickerVisible: false,
            isReminderDateTimePickerVisible: false,
        };
    }

    componentDidUpdate() {
        const { task: {
            failureUpdatingTask,
            confirmUpdatingTask,
        }} = this.props;

        if (confirmUpdatingTask && !failureUpdatingTask) {
            this.props.dispatchResetUpdateTask();
            this.goBack();
        }
    }

    goBack() {
        const { navigation } = this.props;

        navigation.goBack();
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    showDueDateTimePicker = () => {
        console.log("teste");
        this.setState({ isDueDateTimePickerVisible: true })

    };

    hideDueDateTimePicker = () => this.setState({ isDueDateTimePickerVisible: false });

    showReminderDateTimePicker = () => this.setState({ isReminderDateTimePickerVisible: true });

    hideReminderDateTimePicker = () => this.setState({ isReminderDateTimePickerVisible: false });

    handleReminderDate = (date) => {
        this.setState({reminder: date.toISOString()});
        this.hideReminderDateTimePicker();
    };

    handleDueDate = (date) => {
        this.setState({due: date.toISOString()});
        this.hideDueDateTimePicker();
    };

    getDate = (date) => {
        return date != '' ? moment(date).format("LLL") : 'select';
    };

    async updateTask() {
        const { description, name, due, reminder, priority, id} = this.state;

        let updatedTask = {
            id: id,
            description: description,
            due: due,
            name: name,
            priority: priority,
            reminder: reminder
        };
        console.log("on update", updatedTask);

        this.props.dispatchUpdateTask(updatedTask)
    }

    // TODO: when clicking on a Due or Reminder, open up the calendar
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

                <View style={{flexDirection: 'row'}} >
                    <View style={styles.icons}>
                        <DatePicker
                            showDateTimePicker = {this.showDueDateTimePicker}
                            isDateTimePickerVisible = {this.state.isDueDateTimePickerVisible}
                            handleDatePicked = {this.handleDueDate}
                            hideDateTimePicker = {this.hideDueDateTimePicker}
                            iconName = 'calendar'
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.showDueDateTimePicker()}>
                        <View style={styles.iconTitles}  >
                            <Text>Due: {this.getDate(this.state.due)} </Text>
                            <Text style={styles.iconDescription}>Set a due date and time</Text>
                        </View>
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={() => this.showReminderDateTimePicker()}>
                        <View style={styles.iconTitles}>
                            <Text>Reminder: {this.getDate(this.state.reminder)} </Text>
                            <Text style={styles.iconDescription}>Add time or location reminder</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={styles.icons}>
                        <Entypo name='flag' size={iconSize.primary} color={colors.fourth}/>
                    </View>
                    <View style={styles.iconTitles}>
                        <Text>Add priority to your task:</Text>
                        <Picker
                            style={styles.twoPickers} itemStyle={styles.twoPickerItems}
                            selectedValue={this.state.priority}
                            onValueChange={(itemValue) => this.setState({priority: itemValue})}>
                            <Picker.Item color={colors.third} label="Do now, urgent and important" value={Constants.PRIORITY.URGENT_IMPORTANT} />
                            <Picker.Item color={colors.fourth} label="Do, important but not urgent" value={Constants.PRIORITY.NOT_URGENT_IMPORTANT} />
                            <Picker.Item color={colors.greenish} label="Delegate, urgent but not important" value={Constants.PRIORITY.URGENT_NOT_IMPORTANT} />
                            <Picker.Item color={colors.primary} label="Do later, not important or urgent" value={Constants.PRIORITY.NOT_URGENT_NOT_IMPORTANT} />
                        </Picker>

                    </View>
                </View>

                <Button title="Update" onPress={() => this.updateTask()}/>

            </View>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchUpdateTask: (updatedTask) => updateTask(updatedTask),
    dispatchResetUpdateTask: () => resetUpdateTask()
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask)

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: colors.fourth,
        borderBottomWidth: 2,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 30,
        marginTop: 20
    },
    inputContainerTextInput: {
        fontFamily: 'light',
        fontSize: 16
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
    iconTitles: {
        padding: 20
    },
    icons: {
        padding: 15
    },
    iconDescription: {
        color: colors.lightGray
    },
});
