import React from "react";
import {FlatList, StyleSheet, Text} from "react-native";
import {List, ListItem} from "react-native-elements";
import Icon from '@expo/vector-icons/MaterialIcons';
import AddToDo from "./AddToDo";
import {getTasks} from "../actions/task";
import {connect} from "react-redux";

//TODO: after adding a task, navigate to a task list, display a message that the task was added
class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            page: 1,
            seed: 1,
            error: null,
            refresh: false,
        };

        this.props.dispatchGetTasks().then(tasks => {
            this.setState({data: tasks});
        });
    }

    onTaskAdd = newTask => {
        this.state.data.push(newTask);
        this.state.refresh = true;
    };

    render() {
        const styles = StyleSheet.create({
            add: {
                marginTop: 20,
                marginLeft: 15,
            },
        });

        const { task: {
            confirmGetTasks,
            failureGetTasks
        }} = this.props;

        console.log("ToDoList state", this.state);
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state.refresh}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={item.Name}
                            subtitle={item.Description}
                            containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    keyExtractor={item => item.createDate}
                    // ItemSeparatorComponent={this.renderSeparator}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}
                    // onRefresh={this.handleRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={50}
                />

                <Icon name="add" size={20} style={styles.add} onPress={() => this.props.navigation.navigate('AddToDo', { onTaskAdd: this.onTaskAdd })}/>
                <Text>Was getting tasks successful ? {confirmGetTasks? 'true': 'false'} </Text>
                <Text>Was there an error? {failureGetTasks? 'true': 'false'} </Text>
                {/*{alert("my alert")}*/}
            </List>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task
});

const mapDispatchToProps = {
    dispatchGetTasks: () => getTasks()
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)
