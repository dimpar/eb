import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {fonts} from "../theme";

export default class AddToDo extends React.Component {


    //TODO: follow aws tutorial to create a crud app
    render() {

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Task"
                        type='username'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        placeholder="Category"
                        type='password'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <Button title='Add'/>
            </View>
        )
    }
}

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

