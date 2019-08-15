import React from 'react';



const Day = (props) => {
    return (
        <div className="col-sm days" id={props.name}>
            <p className="weekdays">{props.name}</p>
            <p className="day-short-desc">
                {props.date.toString()}
            </p>
            <div className="container-fluid events-container">

                <div className="day-events">

                </div>
                <button type="button" className="new-event">+ Add new event</button>
            </div>
        </div>
    );
}

export default Day;