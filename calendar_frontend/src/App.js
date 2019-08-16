import React from 'react';
import './App.css';
// import './main.css';
import NavBar from './components/NavBar';
import DaysContainer from './containers/DaysContainer';
// import NavBar from '../'
import moment from 'moment';

class App extends React.Component {
  // thisWeek = (iterator) => {
  //   const week = moment().week() + this.state.weekIterator;
  //   console.log(week);
  //   return week;
  // }
  
  state = {
    firstDayOfSelectedWeek: new Date(),
    currentWeek: moment().week() -1,
    weekIterator: 0
  }
  getDay  = (dayOfWeek) => {
    return moment().dayOfYear(this.state.currentWeek * 7 + dayOfWeek)._d
  }

  componentDidMount() {
  }

  render() {
    //this.thisWeek();
    return (
      <div className="App">
        <NavBar/>
        <DaysContainer firstDate={this.state.firstDayOfSelectedWeek} getDayFunction = {this.getDay}/>
      </div>
    );
  }
}

export default App;
