import React from 'react';
import './stylesheets/App.css';
import './stylesheets/main.css'
import DaysContainer from './containers/DaysContainer';
import moment from 'moment';
import Navigation from './components/Navigation';

class App extends React.Component {

  state = {
    firstDayOfSelectedWeek: new Date(),
    currentWeek: moment().week() - 1,
  }
  getDay  = (dayOfWeek) => {
    return moment().dayOfYear(this.state.currentWeek * 7 + dayOfWeek - 1)._d
  }

  getDifferentWeek = (weekIterate) => {
    this.setState({currentWeek: this.state.currentWeek + weekIterate})
  }

  toggleCurrentWeek = (week) => {
    this.setState({currentWeek: week - 1})
  }

  render() {
    return (
      <div className="App">
        {/* <Navigation navigate = {this.getDifferentWeek} currentWeek = {this.state.currentWeek}/> */}
        <DaysContainer firstDate={this.state.firstDayOfSelectedWeek} getDayFunction = {this.getDay} toggleWeek = {this.toggleCurrentWeek}/>
      </div>
    );
  }
}

export default App;
