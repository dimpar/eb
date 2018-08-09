import React from "react";
import {FlatList, StyleSheet, View, ActivityIndicator} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AddToDo from "./AddToDo";
import EditTask from "./EditTask";
import {deleteTask, getTasks, resetDeleteTask, resetUpdateTask} from "../actions/task";
import {connect} from "react-redux";
import {colors} from "../theme";
import Constants from "../util/constants";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
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
        this.props.dispatchGetTasks().then(response => {
            this.setState({
                data: response.tasks,
                loading: false
            });
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

    getPriorityIcon = (item) => {
        if (item.priority == Constants.PRIORITY.URGENT_IMPORTANT) {
            return <FontAwesomeIcon name={'exclamation-circle'} size={Constants.PRIORITY.ICON_SIZE} style={[{color: colors.priorityIcon1}, styles.iconsPriority]} />
        }

        if (item.priority == Constants.PRIORITY.NOT_URGENT_IMPORTANT) {
            return <FontAwesomeIcon name={'arrow-right'} size={Constants.PRIORITY.ICON_SIZE} style={[{color: colors.priorityIcon2}, styles.iconsPriority]} />
        }

        if (item.priority == Constants.PRIORITY.URGENT_NOT_IMPORTANT) {
            return <FontAwesomeIcon name={'calendar'} size={Constants.PRIORITY.ICON_SIZE} style={[{color: colors.priorityIcon3}, styles.iconsPriority]} />
        }

        if (item.priority == Constants.PRIORITY.NOT_URGENT_NOT_IMPORTANT) {
            return <MaterialCommunityIcons name={'tag-remove'} size={Constants.PRIORITY.ICON_SIZE} style={[{color: colors.priorityIcon4}, styles.iconsPriority]} />
        }
    };

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.description}
            avatarStyle = {{backgroundColor: colors.background}}
            leftIcon={
                this.getPriorityIcon(item)
            }
            rightIcon={
                <MaterialIcons name={'delete-forever'} size={22} style={styles.iconDelete} onPress={() => this.deleteTask(item.createDate)}/>
            }
            onPress={() => this.props.navigation.navigate('EditTask', {item: item})}
        />
    );

    renderHeader = () => {
        return <SearchBar containerStyle={{backgroundColor: colors.background}} placeholder="Type Here..." lightTheme />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

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
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    // onRefresh={this.handleRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={5}
                />

                <MaterialIcons name="add-circle" size={50} style={[styles.add, styles.iconAdd]} onPress={() => this.props.navigation.navigate('AddToDo', { onTaskAdd: this.onTaskAdd })}/>
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
        marginTop: 0,
        paddingTop: 0,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
        borderBottomWidth: 0,
        borderTopWidth: 0
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
        position: 'absolute',
        bottom: 10,
        right: 30,
    },
    iconsPriority: {
        marginRight: 20,
        marginLeft: 0,
        paddingLeft: 0

    }
});
