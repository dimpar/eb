import React from "react";
import {FlatList, StyleSheet} from "react-native";
import {List, ListItem} from "react-native-elements";
import Icon from '@expo/vector-icons/MaterialIcons';
import AddToDo from "./AddToDo";
import EditTask from "./EditTask";
import {deleteTask, getTasks, resetDeleteTask, resetUpdateTask} from "../actions/task";
import {connect} from "react-redux";
import {colors} from "../theme";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            refresh: false,
        };

        this.getTasks()
    }

    onTaskAdd = newTask => {
        var updatedTaskList = this.state.data;
        updatedTaskList.push(newTask);
        this.setState({data: updatedTaskList});
        this.state.refresh = true;
    };

    getTasks = () => {
        this.props.dispatchGetTasks().then(tasks => {
            this.setState({data: tasks});
        });
    };

    deleteTask = (createDate) => {
        this.props.dispatchDeleteTask(createDate)
    };

    //keep in mind that this will be executed on every component update
    componentDidUpdate() {
        const { task: {
            confirmDeletedTask,
            failureDeletingTask,
            confirmUpdatingTask,
            failureUpdatingTask
        }} = this.props;

        if (confirmDeletedTask && !failureDeletingTask) {
            this.state.refresh = false;
            alert("Your task has been deleted!");
            this.props.dispatchResetDeleteTask();
            this.getTasks();
        }

        if (confirmUpdatingTask && !failureUpdatingTask) {
            this.state.refresh = false;
            alert("Your task has been updated!");
            this.getTasks();
        }
    }

    renderItem = ({ item }) => (
        <ListItem
            roundAvatar
            title={item.Name}
            subtitle={item.Description}
            containerStyle={{ borderBottomWidth: 0 }}
            rightIcon={
                <Icon name={'delete-forever'} size={22} style={styles.iconDelete} onPress={() => this.deleteTask(item.createDate)}/>
            }
            onPress={() => this.props.navigation.navigate('EditTask', {item: item})}
        />
    );

    render() {
        const { task: {
            confirmCreatedTask,
            failureCreatingTask,

        }} = this.props;

        if (confirmCreatedTask && !failureCreatingTask) {
            this.state.refresh = false;
            alert("Your task has been added!");
        }

        return (
            <List containerStyle={styles.container}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state.refresh}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.createDate}
                    // ItemSeparatorComponent={this.renderSeparator}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}
                    // onRefresh={this.handleRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={50}
                />

                <Icon name="add-circle" size={40} style={[styles.add, styles.iconAdd]} onPress={() => this.props.navigation.navigate('AddToDo', { onTaskAdd: this.onTaskAdd })}/>
            </List>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchGetTasks: () => getTasks(),
    dispatchDeleteTask: (createDate) => deleteTask(createDate),
    dispatchResetDeleteTask: () => resetDeleteTask(),
    dispatchResetUpdateTask: () => resetUpdateTask(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        backgroundColor: '#E9E9EF'
    },
    add: {
        marginTop: 20,
        marginLeft: 15,
    },
    iconDelete: {
        color: colors.fourth,
    },
    iconAdd: {
        color: colors.fourth,
        textAlign: 'right'
    }
});
