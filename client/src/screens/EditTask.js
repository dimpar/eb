import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Input from "../components/Input";
import {connect} from "react-redux";

class EditTask extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.inputContainer}>
                    <Text>This is EditTask</Text>
                    {/*<Input*/}
                        {/*value={this.state.Name}*/}
                        {/*placeholder="Name"*/}
                        {/*type='Name'*/}
                        {/*onChangeText={this.onChangeText}*/}
                    {/*/>*/}
                    {/*<Input*/}
                        {/*value={this.state.Description}*/}
                        {/*placeholder="Description"*/}
                        {/*type='Description'*/}
                        {/*onChangeText={this.onChangeText}*/}
                    {/*/>*/}
                </View>

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
