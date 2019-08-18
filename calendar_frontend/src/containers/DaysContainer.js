import React from 'react';
import Day from '../components/Day';
import formatErrors from '../util/FormatErrorObject'

const DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
        // Note to self, handle errors. See also: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        fetch("http://localhost:3000/events")
        .then(res => res.json())
        .then(eventsJSONParsed => {
            if(eventsJSONParsed.errors) {
                console.error(eventsJSONParsed.errors);
                alert(formatErrors(eventsJSONParsed.errors));
                return;
            }
            this.setState({events: eventsJSONParsed});
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