import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import formatErrors from '../util/FormatErrorObject'


function postEventsFetchParams(title, description, date, time) {
    let eventDate = date.toString().split(" ");
    eventDate[4] = time;
    eventDate = eventDate.join(" ")
    return ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            event_time: eventDate
        })
    });
}


export default class EventModal extends Component{
    state = {
        // showAddEventDialog: true,
        title: '',
        description: '',
        time: ''
    }

    postEvents = (event) => { 
        // Note to self, handle errors. See also: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        return fetch("http://localhost:3000/events",
            postEventsFetchParams(this.state.title, this.state.description, this.props.date, this.state.time + ":00"));
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
                // this.modalFormShow(false);
            })
    }


    onModalFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // modalFormShow = (value) => {
    //     this.setState({
    //         showAddEventDialog: value
    //     })
    // }

    // handleAddEventButtonClick = () => {
    //     this.modalFormShow(true);
    // }   

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

    renderTimeForm = () => {
        return (
            <React.Fragment>
                <label>
                    Event Time
                </label>
                <input className = "form-control" type="time" name="time" min="09:00" max="18:00" required 
                value={this.state.time}
                onChange={this.onModalFieldChange
                }
                />
            </React.Fragment>
        )
    }

    renderModal = () => {
        return(
            <Modal show={true} onHide={() => this.props.modalFormShowSet(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={() => { console.warn("notimpl") }}>
                        {this.renderTitleForm()}
                        {this.renderDescriptionForm()}
                        {this.renderTimeForm()}
                    </form>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.modalFormShowSet(false)}>Close</Button>
                        <Button variant="primary" onClick={this.handleModalFormSubmit}>Save changes</Button>
                    </Modal.Footer>
            </Modal>
        )
    }


    render(){
        return this.renderModal();
    }
}