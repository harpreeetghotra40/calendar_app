import React from 'react';
import Day from '../components/Day';
import formatErrors from '../util/FormatErrorObject'
import NavBar from '../components/NavBar';
import  EventModal from "../components/EventModal";


const DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const renderDays = (getDay, events, newEventCallback, handleAddEventButtonClick, removeEvent) => {
    const newDays = [];
    
    for (let dayOfWeek = 0; dayOfWeek < DAYS.length; dayOfWeek++) {
        const parsedEvents = events.filter(event => {
            let newDate = new Date(event.event_time);
            let reqDate = getDay(dayOfWeek);
            if (newDate.getDate() === reqDate.getDate() && newDate.getMonth() === reqDate.getMonth()) {
                return true;
            }
            return false;
        });
        newDays.push(
            <Day
                name={DAYS[dayOfWeek]}
                key={getDay(dayOfWeek)}
                date={getDay(dayOfWeek)}
                events={parsedEvents}
                newEvent={newEventCallback}
                handleAddEventButtonClick={handleAddEventButtonClick}
                removeEvent={removeEvent}
            />
        )
    }
    return newDays;
}


class DaysContainer extends React.Component {

    state = {
        events: [],
        modalFormShow: false,
        selectedDate: null,
        eventTags: []
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
            this.getAllFilters(eventsJSONParsed)
            this.setState({events: eventsJSONParsed});
        })

    }

    getAllFilters = (events) => {
        let eventFilters = []
        events.forEach(event => {
            if(!eventFilters.includes(event.event_tag)){
                eventFilters.push(event.event_tag)
            }
        })
        this.setState({eventTags: eventFilters})
    }

    newEvent = (theNewEvent) => {
        const filteredEvents = this.state.events.filter(event => event.id !== theNewEvent.id)
        const newEvents = [...filteredEvents, theNewEvent]
        this.setState({events: newEvents, modalFormShow: false})
    }

    removeEvent = (id) => {
        const ID = parseInt(id, 10);
        const filteredEvents = this.state.events.filter(event => event.id !== ID);
        this.setState({events: filteredEvents})
    }

    modalFormShowSet = (value) => {
        this.setState({modalFormShow: value})
    }
    
    renderEventModal = () => {
        if (this.state.modalFormShow === true) {
            // debugger;    
            return <EventModal newEvent={this.newEvent} date={this.state.selectedDate} modalFormShowSet={this.modalFormShowSet}/>;
        }
        return null;
    }

    handleAddEventButtonClick = (date) => {
        this.setState({modalFormShow: true, selectedDate: date});
    }

    
    render() {
        return (
            <div className = "days-container">
            {this.renderEventModal()}
            <React.Fragment>
            <NavBar eventTags = {this.state.eventTags}/>
                {renderDays( this.props.getDayFunction, this.state.events, this.newEvent, this.handleAddEventButtonClick, this.removeEvent)}
            </React.Fragment>
            </div>
        );
    }
}

export default DaysContainer;