import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import formatErrors from '../util/FormatErrorObject'


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
        let appendDay = event.target;
        if(appendDay.classList.value === "weekdays"){
            appendDay = appendDay.parentElement;
        }
        else if(appendDay.classList.value.includes("new-event") || appendDay.classList.value.includes("day-short-desc")){
                appendDay = appendDay.parentElement;
            }
        else if(appendDay.classList.value.includes("day-events")){
                appendDay = appendDay.parentElement.parentElement;
            }
        else if(appendDay.classList.value.includes("event")){
            appendDay = appendDay.parentElement.parentElement.parentElement;
        }    
        fetch("http://localhost:3000/events", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                eventToBeDropped,
                new_event_time: appendDay.dataset.day
            })
        }).then(res => res.json())
        .then(new_event => {
            this.props.newEvent(new_event)
        }) 
    }
    
    renderEvents = () => {
        if (this.props.events.length === 0) {
            return null;
        }
        return this.props.events.map(event => {
            return (
                <div className="event" onDragStart={(event) => this.drag(event)} draggable="true" key={`event-${event.title}`}>{event.title}</div>
            )
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
        return fetch("http://localhost:3000/events", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                event_time: this.props.date
            })
        });
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

    renderModal = () => {
        return (
        <Modal show={this.state.showAddEventDialog} onHide={() => this.modalFormShow(false)}>

            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={() => { console.warn("notimpl") }}>
                    <label>
                        Event Title</label>
                        <input type="text" name="title" className="form-control" id="event-title" value={this.state.eventDialogTitle} onChange={this.onModalFieldChange} />
                    
                    <label>
                        Event Description</label>
                        <textarea name="description" id="event-description" className="form-control" value ={this.state.eventDialogDescription} onChange={this.onModalFieldChange} />
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