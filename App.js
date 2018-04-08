import React from 'react';
import {TextInput, Button, StyleSheet, Text, View} from 'react-native';

import Amplify, {Auth} from 'aws-amplify';
// import AWSConfig from './awsmobilejs/#current-backend-info/aws-exports';

// Amplify.configure(AWSConfig);

export default class App extends React.Component {
    state = {
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
        confirmationCode: ''
    };

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    };

    signUp() {
        Auth.signUp({
            username: this.state.username,
            password: this.state.password,
            attributes: {
                email: this.state.email,
                phone_number: this.state.phoneNumber
            }
        })
            .then(() => console.log('Success SignUp!'))
            .catch(err => console.error('Error SignUp', err));
    }

    confirmSignUp() {
        Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
            .then(() => console.log('Success Confirmation SignUp!'))
            .catch(err => console.error('Error Confirmation SignUp', err));
    }

    render() {
        return (
            <View>
                <Text>
                    This is just a test
                </Text>
            </View>
        );

        // return (
        //     {/*<View style={styles.container}>*/}
        //         {/*<TextInput*/}
        //             {/*onChangeText={value => this.onChangeText('username', value)}*/}
        //             {/*style={styles.input}*/}
        //             {/*placeholder='username'*/}
        //         {/*/>*/}
        //         {/*<TextInput*/}
        //             {/*onChangeText={value => this.onChangeText('password', value)}*/}
        //             {/*style={styles.input}*/}
        //             {/*secureTextEntry={true}*/}
        //             {/*placeholder='password'*/}
        //         {/*/>*/}
        //         {/*<TextInput*/}
        //             {/*onChangeText={value => this.onChangeText('phoneNumber', value)}*/}
        //             {/*style={styles.input}*/}
        //             {/*placeholder='phone'*/}
        //         {/*/>*/}
        //         {/*<TextInput*/}
        //             {/*onChangeText={value => this.onChangeText('email', value)}*/}
        //             {/*style={styles.input}*/}
        //             {/*placeholder='email'*/}
        //         {/*/>*/}
        //         {/*<Button title="Sign Up" onPress={this.signUp.bind(this)} />*/}
        //         {/*<TextInput*/}
        //             {/*onChangeText={value => this.onChangeText('confirmationCode', value)}*/}
        //             {/*style={styles.input}*/}
        //             {/*placeholder='confirmation code'*/}
        //         {/*/>*/}
        //         {/*<Button title="Confirm Sign Up" onPress={this.confirmSignUp.bind(this)} />*/}
        //     {/*</View>*/}
        // );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#2196F3',
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
