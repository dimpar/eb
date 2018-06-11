import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";
import Icon from '@expo/vector-icons/Entypo';

class EditTask extends React.Component {

    componentDidMount() {
        console.log("this.props11", this.props)
    }

    //TODO: add edit functionality (update in db) and navigate back to the task list
    render() {

        const { navigation: {
            state: {
                params
            }
        }} = this.props;

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Text>Edit your task</Text>
                    <Input
                        value={params.name}
                        placeholder="Name"
                        type='Name'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={params.description}
                        placeholder="Description"
                        type='Description'
                        onChangeText={this.onChangeText}
                    />
                </View>

                <Icon name="edit" size={20} style={styles.add} onPress={() => alert('update')}/>

            </View>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
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
