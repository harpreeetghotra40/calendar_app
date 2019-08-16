import React from 'react';
import Day from '../components/Day';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const renderDays = (getDay, events, newEventCallback) => {
    const newDays = [];
    
    for (let dayOfWeek = 0; dayOfWeek < DAYS.length; dayOfWeek++) {
        const parsedEvents = events.filter(event => {
            let newDate = new Date(event.event_time);
            let reqDate = getDay(dayOfWeek);
            if (newDate.getDate() === reqDate.getDate()) {
                return true;
            }
            return false;
        });
        newDays.push(<Day name={DAYS[dayOfWeek]} key={getDay(dayOfWeek)} date={getDay(dayOfWeek)} events={parsedEvents} newEvent={newEventCallback}/>)
    }
    return newDays;
}

class DaysContainer extends React.Component {

    state = {
        events: []
    }

    validate = (dateOne, dateTwo) => {
        return (dateOne === dateTwo);
    }
    componentDidMount() {
        fetch("http://localhost:3000/events")
        .then(res => res.json())
        .then(events => {
            this.setState({events: events});
        })

    }

    newEvent = (theNewEvent) => {
        const newEvents = [...this.state.events, theNewEvent]
        this.setState({events: newEvents})
    }
    
    render() {
        return (
            <React.Fragment>
                {renderDays( this.props.getDayFunction, this.state.events, this.newEvent)}
            </React.Fragment>
        );
    }
}

export default DaysContainer;