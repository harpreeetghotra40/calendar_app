import React from 'react';

class Day extends React.Component {


    renderEvents = () => {
        if (this.props.events.length === 0) {
            return null;
        }

        return this.props.events.map(event => {
            return (
                <div className="event" draggable>{event.title}</div>
            )
        })
    }

    render () {
        console.log(this.props.events)
        return (
            <div className="col-sm days" id={this.props.name}>
                <p className="weekdays">{this.props.name}</p>
                <p className="day-short-desc">
                    {this.props.date.toString()}
                </p>
                <div className="container-fluid events-container">
    
                    <div className="day-events">
                        {this.renderEvents()}
                    </div>
                    <button type="button" className="new-event">+ Add new event</button>
                </div>
            </div>
        );
    }
}

export default Day;