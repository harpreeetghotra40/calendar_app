import React from 'react'
import Calendar from 'react-calendar';
import '../stylesheets/Navbar.css'
import moment from 'moment';

const MONTHS = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

class NavBar extends React.Component {
    
    render(){
        return (
            <div className = "calendar-navbar">
                <p className = "navbar-heading" id = "navbar-month">{MONTHS[moment().month()]}</p>
                <p className = "navbar-heading" id = "navbar-year">{moment().year()}</p>
            </div>
        );
    }
}

export default NavBar;