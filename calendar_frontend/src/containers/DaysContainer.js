import React from 'react';
import Day from '../components/Day';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const renderDays = (getDay) => {
    const newDays = [];
    for (let dayOfWeek = 0; dayOfWeek < DAYS.length; dayOfWeek++) {
        newDays.push(<Day name={DAYS[dayOfWeek]} key={getDay(dayOfWeek)} date={getDay(dayOfWeek)}/>)
    }
    return newDays;
}

const DaysContainer = (props) => {
    return (
        <React.Fragment>
            {renderDays( props.getDayFunction)}
        </React.Fragment>
    );
}

export default DaysContainer;