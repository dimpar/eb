import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Notes extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>We should add notes here</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Notes
