import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";
import Icon from '@expo/vector-icons/Entypo';
import {resetUpdateTask, updateTask} from "../actions/task";

class EditTask extends React.Component {
    constructor(props) {
        super(props);

        const { navigation: {
            state: {
                params: {
                    item
                }
            }
        }} = this.props;

        this.state = {
            Description: item.Description,
            Name: item.Name,
            createDate: item.createDate
        };
    }

    componentDidUpdate() {
        console.log("this.props11", this.props)

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

    async updateTask(createDate) {
        const { Description, Name} = this.state;
        console.log("on update", this.state);
        this.state.updatedTask = {
            Description: Description,
            Name: Name
        };
        this.props.dispatchUpdateTask(Description, Name, createDate)
    }

    render() {

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Text>Edit your task</Text>
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

                //TODO: change icon or just write 'Update' instead.
                <Icon name="edit" size={20} style={styles.add} onPress={() => this.updateTask(this.state.createDate)}/>

            </View>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchUpdateTask: (Description, Name, createDate) => updateTask(Description, Name, createDate),
    dispatchResetUpdateTask: () => resetUpdateTask()
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask)

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
