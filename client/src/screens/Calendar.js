import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    render() {
        const vacation = {key: 'vacation', color: '#f44411', selectedColor: 'blue'};
        const work = {key: 'massage', color: '#002f4f', selectedColor: 'blue'};
        const workout = {key: 'workout', color: '#e0850a'};

        return (
            <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={'multi-dot'}
        markedDates={{
            '2018-03-15': {dots: [work, workout], textColor: '#666'},
            '2018-03-16': {dots: [work], textColor: '#666'},
            '2018-03-25': {dots: [vacation], color: 'blue'},
            '2018-03-26': {dots: [vacation], color: 'blue'},
            '2018-03-27': {dots: [vacation], color: 'blue'},
            '2018-03-28': {dots: [vacation], color: 'blue'},
            '2018-03-29': {dots: [vacation], color: 'gray'},
            '2018-03-30': {dots: [vacation], color: 'gray'},
            '2018-03-31': {dots: [vacation], color: 'gray'},
        }}
        theme={{
            agendaTodayColor: '#e0850a',
                agendaKnobColor: '#f44411',
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#fff',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                monthTextColor: '#002f4f',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
        }}
        />
    );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item to do (' + strTime + ')',
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }

                if (strTime === '2018-03-15') {
                    this.state.items[strTime] = [];

                    this.state.items[strTime].push({
                        name: 'EmberBee Meeting',
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        category: 'work'
                    });

                    this.state.items[strTime].push({
                        name: 'WCS at Avalon',
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        category: 'workout'
                    });
                }

                if (strTime === '2018-03-16') {
                    this.state.items[strTime] = [];

                    this.state.items[strTime].push({
                        name: 'Meeting with Aaron',
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        category: 'work'
                    });
                }

                if (['2018-03-25', '2018-03-26', '2018-03-27', '2018-03-28', '2018-03-29', '2018-03-30', '2018-03-31'].indexOf(strTime) > -1) {
                    this.state.items[strTime] = [];

                    this.state.items[strTime].push({
                        name: 'New York Trip',
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        category: 'vacation'
                    });
                }


            }

            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    renderItem(item) {
        const itemType = item.category || 'item';

        return (
            <View style={[styles[itemType], {height: item.height}]}><Text style={[styles.listText]}>{item.name}</Text></View>
    );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text></Text></View>
    );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#bababa',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    work: {
        backgroundColor: '#002f4f',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    workout: {
        backgroundColor: '#e0850a',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    vacation: {
        backgroundColor: '#f44411',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    listText: {
        color: 'white'
    }
});