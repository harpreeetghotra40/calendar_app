import React from 'react';
import {withRouter} from 'react-router-dom'
import Day from '../components/Day';
import formatErrors from '../util/FormatErrorObject'
import NavBar from '../components/NavBar';
import  EventModal from "../components/EventModal";


const DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const renderDays = (getDay, events, newEventCallback, handleAddEventButtonClick, removeEvent, currentUser) => {
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
                currentUser={currentUser}
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

    componentDidMount = () => {
        console.assert( this.props.currentUser !== undefined);
        if (this.props.currentUser === null) {
            return;
        }
        // console.log(this.props.currentUser)
        // Note to self, handle errors. See also: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        fetch("http://localhost:3000/events", {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${this.props.currentUser}`
            }
        })
        .then(res => res.json())
        .then(eventsJSONParsed => {
            console.assert(eventsJSONParsed !== null);
            console.assert(eventsJSONParsed !== undefined);
            console.assert(eventsJSONParsed !== "undefined");
            if(eventsJSONParsed.errors) {
                console.error(eventsJSONParsed.errors);
                alert(formatErrors(eventsJSONParsed.errors));
                return;
            }
            this.getAllFilters(eventsJSONParsed)
            this.setState({events: eventsJSONParsed});
        })

        // fetch("http://localhost:3000/calendar", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${this.props.currentUser}`
        //     }
        // }).then(res => res.json())
        // .then(calendarParsed => {
        //     console.assert(calendarParsed !== null);
        //     console.assert(calendarParsed !== undefined);
        //     console.assert(calendarParsed !== "undefined");

        //     console.log("Got calendar: ", calendarParsed);
        // })

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
            return <EventModal
                newEvent={this.newEvent}
                date={this.state.selectedDate}
                modalFormShowSet={this.modalFormShowSet}
                currentUser={this.props.currentUser}
                />;
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
            <NavBar eventTags = {this.state.eventTags} toggleCurrentWeek = {this.props.toggleWeek}/>
                {renderDays(
                    this.props.getDayFunction,
                    this.state.events,
                    this.newEvent,
                    this.handleAddEventButtonClick,
                    this.removeEvent,
                    this.props.currentUser)}
            </React.Fragment>
            </div>
        );
    }
}

// export default DaysContainer;
export default withRouter(DaysContainer)