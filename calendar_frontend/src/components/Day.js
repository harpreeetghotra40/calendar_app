import React from 'react';
import moment from 'moment'
// import MaterialIcon , {colorPalette} from 'material-icons-react';
import {primaryError} from '../util/FormatErrorObject';



function updateEventFetchParams(eventToBeDropped, appendDay, currentUser) {
    return ({
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${currentUser}`
        },
        body: JSON.stringify({
            eventToBeDropped: eventToBeDropped,
            new_event_time: appendDay
        })
    });
}

function deleteEventFetchParams(eventIDToBeDeleted, currentUser) {
    return ({
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${currentUser}`

        },
        body: JSON.stringify({
            id: eventIDToBeDeleted
        })
    });
}

function appendDayFromClassListType(appendDayEventTarget) {
    if(appendDayEventTarget.classList.value === "weekdays"){
        return appendDayEventTarget.parentElement;
    }
    else if(appendDayEventTarget.classList.value.includes("new-event") || appendDayEventTarget.classList.value.includes("day-short-desc")){
            return appendDayEventTarget.parentElement;
        }
    else if(appendDayEventTarget.classList.value.includes("day-events")){
            return appendDayEventTarget.parentElement.parentElement;
        }
    else if(appendDayEventTarget.classList.value.includes("event")){
        return appendDayEventTarget.parentElement.parentElement.parentElement;
    }
    return appendDayEventTarget;
}

class Day extends React.Component {

    drag = (event) => {
        const reqEvent = this.props.events.find(ev => ev.id === parseInt(event.target.dataset.id, 10))
        let eventToTransfer = JSON.stringify(reqEvent);
        event.dataTransfer.setData("event", eventToTransfer);
        // console.log(event.dataTransfer.getData("event"));
    }

    allowDrop = (event) => {
        event.preventDefault();
    }

    drop = (event) => {
        event.preventDefault();
        const eventData = event.dataTransfer.getData("event");
        // console.log(eventData);
        const eventToBeDropped = JSON.parse(eventData);
        const appendDay = appendDayFromClassListType(event.target).dataset.day;
        console.assert(this.props.currentUser !== null);
        fetch("http://localhost:3000/events", updateEventFetchParams(eventToBeDropped, appendDay, this.props.currentUser))
            .then(res => res.json())
            .then(new_event => {
                if(new_event.errors) {
                    console.log(new_event.errors)
                    alert(primaryError(new_event.errors))
                    return;
                }
                this.props.newEvent(new_event)
            }) 
    }

    renderSingleEvent = (event) => {
        return (
            <div
                className="event"
                onDragStart={(event) => this.drag(event)}
                draggable="true"
                key={`event-${event.title}-${event.id}`}
                data-id={`${event.id}`}
                data-tag = {`${event.event_tag}`}
            >
                {event.title}
                <span onClick={this.deleteButtonClicked} className = "delete-event">
                    Delete
                </span>
                <div className = "event-time-container">{moment(event.event_time).format("hh:mm a")}</div>
                
            </div>
        );
    }
    
    renderEvents = () => {
        if (this.props.events.length === 0) {
            return null;
        }
        return this.props.events.map(event => {
            return this.renderSingleEvent(event)
        })
    }

    addEventClicked = (event) => {
        this.props.handleAddEventButtonClick(this.props.date);
    }

    deleteButtonClicked = (synEvent) => {
        const event = Object.assign({}, synEvent);
        console.assert(event.target.parentElement.className === "event")
        const ID = event.target.parentElement.dataset.id
        console.log(ID);
        fetch("http://localhost:3000/events", deleteEventFetchParams(ID, this.props.currentUser))
            .then(res => {res.json()})
            .then(deletedEventResult => {
                if ((deletedEventResult !== undefined) && (deletedEventResult.errors !== undefined)) {
                    console.log(deletedEventResult.errors)
                    alert(primaryError(deletedEventResult.errors))
                    return;
                }
                this.props.removeEvent(ID)
            })
        
    }
    

    render () {
        return (
            <div className="col-sm days" data-day = {this.props.date} onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}>
                <p className="weekdays">{this.props.name}</p>
                <p className="day-short-desc">
                    {this.props.date.getDate().toString()}
                </p>
                <button className = "new-event" onClick={this.addEventClicked}>
                    + Add new event
                </button>
                <div className="container-fluid events-container">
    
                    <div className="day-events">
                        {this.renderEvents()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Day;