import React from 'react';
import Day from '../components/Day';


const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']



const renderDays = (first) => {
    // const first = firstDateOfThisWeek();
    const newDays = [];
    for (let i = 0; i < DAYS.length; i++) {
        console.log(first);
        const thisDate = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i)
        newDays.push(<Day name={DAYS[i]} key={`day-${DAYS[i]}-${thisDate}}`} date={thisDate}/>)
    }
    // return DAYS.map(day => {
        // return <Day name={day} key={`day-${day}`}/>
    // })
    return newDays;
}

const DaysContainer = (props) => {
    return (
        <React.Fragment>
            {renderDays(props.firstDate)}
        </React.Fragment>
        
    );
}

export default DaysContainer;