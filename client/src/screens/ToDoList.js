import React from "react";
import {FlatList, StyleSheet, Text} from "react-native";
import {List, ListItem} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, fonts} from "../theme";
import AddToDo from "./AddToDo";

export default class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [
                {id: 1, task: 'clean up the living room', category: 'home'},
                {id: 2, task: 'call Bucktop', category: 'work'},
                {id: 3, task: 'call Thea', category: 'work'},
                {id: 4, task: 'buy some food', category: 'home'}
                ],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    render() {
        const styles = StyleSheet.create({
            add: {
                marginTop: 20,
                marginLeft: 15,
            },
        });

        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.task}`}
                            subtitle={item.category}
                            containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    keyExtractor={item => item.id}
                    // ItemSeparatorComponent={this.renderSeparator}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}
                    // onRefresh={this.handleRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={50}
                />
                    <Icon name="add" size={20} style={styles.add} onPress={() => this.props.navigation.navigate('AddToDo')}>
                        {/*<Text>Test</Text>*/}
                        {/*<Text onPress={() => this.props.navigation.navigate('SignUp')}>Sign up</Text>*/}
                    </Icon>
            </List>
        )
    }
}
