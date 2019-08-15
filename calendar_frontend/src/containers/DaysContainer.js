import React from 'react';
import Day from '../components/Day';


const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']



const renderDays = (getDay) => {
    // const first = firstDateOfThisWeek();
    const newDays = [];
    for (let dayOfWeek = 0; dayOfWeek < DAYS.length; dayOfWeek++) {
        // console.log(first);
        // console.log(typeof(first));
        // const thisDate = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i)
        newDays.push(<Day name={DAYS[dayOfWeek]} key={getDay(dayOfWeek)} date={getDay(dayOfWeek)}/>)
    }


    
    // return DAYS.map(day => {
        // return <Day name={day} key={`day-${day}`}/>
    // })
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