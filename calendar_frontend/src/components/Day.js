import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import formatErrors from '../util/FormatErrorObject'


function updateEventFetchParams(eventToBeDropped, appendDay) {
    return ({
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify({
            eventToBeDropped,
            new_event_time: appendDay.dataset.day
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

function postEventsFetchParams(title, description, date) {
    return ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            event_time: date
        })
    });
}
class Day extends React.Component {

    state = {
        showAddEventDialog: false,
        title: '',
        description: '',
    }

    drag = (event) => {
        const reqEvent = this.props.events.find(ev => ev.title === event.target.innerText)
        let eventToTransfer = JSON.stringify(reqEvent);
        event.dataTransfer.setData("event", eventToTransfer);
    }

    allowDrop = (event) => {
        event.preventDefault();
    }

    drop = (event) => {
        event.preventDefault();
        const eventToBeDropped = JSON.parse(event.dataTransfer.getData("event"));
        const appendDay = appendDayFromClassListType(event.target);

        fetch("http://localhost:3000/events", updateEventFetchParams(eventToBeDropped, appendDay))
            .then(res => res.json())
            .then(new_event => {
                this.props.newEvent(new_event)
            }) 
    }

    renderSingleEvent = (event) => {
        return (
            <div
                className="event"
                onDragStart={(event) => this.drag(event)}
                draggable="true"
                key={`event-${event.title}`}
            >
                {event.title}
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

    onModalFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    modalFormShow = (value) => {
        this.setState({
            showAddEventDialog: value
        })
    }

    handleAddEventButtonClick = () => {
        this.modalFormShow(true);
    }   
    
    postEvents = (event) => {
        // Note to self, handle errors. See also: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        return fetch("http://localhost:3000/events",
            postEventsFetchParams(this.state.title, this.state.description, this.state.date));
    }

    handleModalFormSubmit = (event) => {
        this.postEvents(event)
            .then(res => res.json())
            .then(theNewEvent => {
                if (theNewEvent.errors) {
                    console.error(theNewEvent.errors);
                    alert(formatErrors(theNewEvent.errors));
                    return;
                }
                this.props.newEvent(theNewEvent);
                this.modalFormShow(false);
            })
    }

    renderTitleForm = () => {
        return (
            <React.Fragment>
                <label>
                    Event Title
                </label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="event-title"
                        value={this.state.eventDialogTitle}
                        onChange={this.onModalFieldChange}
                    />
            </React.Fragment>
        )
    }

    renderDescriptionForm = () => {
        return (
            <React.Fragment>
                <label>
                    Event Description
                </label>
                    <textarea
                        name="description"
                        id="event-description"
                        className="form-control"
                        value ={this.state.eventDialogDescription}
                        onChange={this.onModalFieldChange}
                    />
            </React.Fragment>
        )
    }

    renderModal = () => {
        return (
            <Modal show={this.state.showAddEventDialog} onHide={() => this.modalFormShow(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={() => { console.warn("notimpl") }}>
                        {this.renderTitleForm()}
                        {this.renderDescriptionForm()}
                    </form>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({showAddEventDialog: false})}>Close</Button>
                        <Button variant="primary" onClick={this.handleModalFormSubmit}>Save changes</Button>
                    </Modal.Footer>
            </Modal>
        );
    }

    render () {
        return (
            <div className="col-sm days" data-day = {this.props.date} onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}>
                <p className="weekdays">{this.props.name}</p>
                <p className="day-short-desc">
                    {this.props.date.getDate().toString()}
                </p>
                <button className = "new-event" onClick={this.handleAddEventButtonClick}>
                    + Add new event
                </button>
                <div className="container-fluid events-container">
    
                    <div className="day-events">
                        {this.renderEvents()}
                    </div>
                    {this.renderModal()}
                </div>
            </div>
        );
    }
}

export default Day;