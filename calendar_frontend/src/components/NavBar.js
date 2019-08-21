import React from 'react'
import Calendar from 'react-calendar';
import '../stylesheets/Navbar.css'
import moment from 'moment';


class NavBar extends React.Component {

    state = {
        date: new Date()
    }

    renderFilter = (filter) => {
        return (
            <div>
                <input type="checkbox" name = {filter} />
                <label for={filter} className = "event-filter-text">{filter}</label>
            </div>
        )
    }
    
    renderFilterForm = () => {
        // console.log(this.props.eventTags)
        return (
            <div className = "filters-container">
                {
                    this.props.eventTags.forEach(filter => this.renderFilter(filter))
                }  
            </div>
        )
    }

    toggleWeekFunc = (event) => {
        this.props.toggleCurrentWeek(event.target.innerText)
    }

    onChange = date => {
        this.props.toggleCurrentWeek(moment(date).week())
        this.setState({ date })
    }

    componentDidMount(){
        const weekNumbers = document.querySelectorAll('.react-calendar__tile span')
        weekNumbers.forEach(weekNum => {
            weekNum.addEventListener('click', this.toggleWeekFunc)
        })
    }

    // componentDidUpdate() {

    //     const weekNumbers = document.querySelectorAll('.react-calendar__tile span')
    //     weekNumbers.forEach(weekNum => {
    //         weekNum.addEventListener('click', this.toggleWeekFunc)
    //     })
    // }
    
    render(){
        return (
            <div className = "calendar-navbar">
                <Calendar calendarType="US" onChange={this.onChange} value={this.state.value}/>
                <div className="filter-heading">Filters</div>
                {this.renderFilterForm()}
            </div>
        );
    }
}

export default NavBar;