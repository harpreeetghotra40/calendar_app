import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import './main.css';
import NavBar from './components/NavBar';
import DaysContainer from './containers/DaysContainer';
// import NavBar from '../'
import moment from 'moment';

// const firstDateOfThisWeek = () => {
//   const date = new Date();
//   const currentDay = date.getDay();
//   const firstMonthDayOfWeek = date.getDate() - currentDay;
//   console.log(firstMonthDayOfWeek);
//   const firstMonthDayAsDate = new Date(date.getFullYear(), date.getMonth(), firstMonthDayOfWeek);
//   return firstMonthDayAsDate;
// }

function thisWeek(iterator) {
  const week = moment().week();
  console.log(week);
}

function firstDayFromWeek(week) {
  const day = week * 7;
  const dayInYear = moment().dayOfYear(day)._d;
  console.log("dayInYear:", dayInYear);
  return dayInYear;
}




class App extends React.Component {

  state = {
    firstDayOfSelectedWeek: new Date(),
    weekIterator: -1
  }

  componentDidMount() {
    // const first = firstDateOfThisWeek();
    this.setState({firstDayOfSelectedWeek : firstDayFromWeek(thisWeek(this.state.weekIterator))});
  }

  render() {
    thisWeek();
    return (
      <div className="App">
        <NavBar/>
        <DaysContainer firstDate={this.state.firstDayOfSelectedWeek}/>
      </div>
    );
  }
}

export default App;
