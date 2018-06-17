import React from 'react'
import {
    StyleSheet,
    TextInput, View
} from 'react-native'

import { colors } from '../theme'

export default ({ placeholder, onChangeText, type, ...props }) => (
    <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        style={[styles.input]}
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        onChangeText={value => onChangeText(type, value)}
        multiline = {true}
        underlineColorAndroid='transparent'
        {...props}
    />
)

const styles = StyleSheet.create({
    input: {
        height: 45,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        fontSize: 16,
        borderBottomColor: colors.fourth,
        fontFamily: 'light'
    }
})
