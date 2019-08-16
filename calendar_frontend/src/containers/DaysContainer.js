import React from 'react';
import Day from '../components/Day';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const renderDays = (getDay, events) => {
    const newDays = [];
    
    for (let dayOfWeek = 0; dayOfWeek < DAYS.length; dayOfWeek++) {
        const parsedEvents = events.filter(event => {
            let newDate = new Date(event.event_time);
            // console.log(this.props);
            let reqDate = getDay(dayOfWeek);
            // console.log("reqDate: ", reqDate);
            // console.log("newDate: ", newDate);
            if (newDate.getDate() === reqDate.getDate()) {
                return true;
            }
            return false;
        });
        newDays.push(<Day name={DAYS[dayOfWeek]} key={getDay(dayOfWeek)} date={getDay(dayOfWeek)} events={parsedEvents}/>)
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
        // {title: "Feelings", description: "Don't Forget to Drink!!", event_time: "2019-08-16T20:58:27.279Z"}
        fetch("http://localhost:3000/events").then(res => res.json()).then(response => {
            // console.log(response);
            // debugger;
            return response;
        }).then(events => {
            this.setState({events: events});

        })

    }
    render() {
        return (
            <React.Fragment>
                {renderDays( this.props.getDayFunction, this.state.events)}
            </React.Fragment>
        );
    }
}

export default DaysContainer;