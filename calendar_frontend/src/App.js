import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
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

  render() {
    return (
      <div className="App">
        <NavBar/>
        <Navigation navigate = {this.getDifferentWeek}/>
        <DaysContainer firstDate={this.state.firstDayOfSelectedWeek} getDayFunction = {this.getDay}/>
      </div>
    );
  }
}

export default App;
