import React from 'react'
import Calendar from 'react-calendar';
import '../stylesheets/Navbar.css'
// import moment from 'moment';


class NavBar extends React.Component {

    renderFilter = (filter) => {
        return (
            <div>
                <input type="checkbox" name = {filter} />
                <label for={filter} className = "event-filter-text">{filter}</label>
            </div>
        )
    }
    
    renderFilterForm = () => {
        console.log(this.props.eventTags)
        return (
            <div className = "filters-container">
                {
                    this.props.eventTags.forEach(filter => this.renderFilter(filter))
                }  
            </div>
        )
    }
    
    render(){
        return (
            <div className = "calendar-navbar">
                <Calendar calendarType="US" showWeekNumbers={true}/>
                <div className="filter-heading">Filters</div>
                {this.renderFilterForm()}
            </div>
        );
    }
}

export default NavBar;