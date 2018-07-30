import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from '@expo/vector-icons/Entypo';
import {colors, iconSize} from "../theme";


export default ({showDateTimePicker, isDateTimePickerVisible, handleDatePicked, hideDateTimePicker, iconName}) => (
    <View >
        <TouchableOpacity onPress={showDateTimePicker}>
            <Icon name={iconName} style={styles.iconDue} size={iconSize.primary}/>
        </TouchableOpacity>
        <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
            mode='datetime'
        />
    </View>
)

const styles = StyleSheet.create({
    iconDue: {
        color: colors.fourth
    }
});
