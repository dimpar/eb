import React from "react";
import {StyleSheet, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";
import {resetUpdateTask, updateTask} from "../actions/task";
import Button from "../components/Button";

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
            description: item.description,
            name: item.name,
            createDate: item.createDate
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

    //TODO: update client & backend for new features
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
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Input
                        value={this.state.name}
                        placeholder="Name"
                        type='Name'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.description}
                        placeholder="Description"
                        type='Description'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <Button title="Update" onPress={() => this.updateTask(this.state.createDate)}/>

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
        paddingHorizontal: 40
    }
});
