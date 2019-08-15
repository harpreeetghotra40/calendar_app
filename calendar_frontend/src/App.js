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


// function firstDayFromWeek(week) {
//   const day = week * 7;
//   console.log(day);
//   const dayInYear = moment().dayOfYear(day)._d;
//   console.log("dayInYear:", dayInYear);

//   return day;
//   // const dayOfWeek = (day % 7);
//   // const firstDayOfWeek = dayInYear - dayOfWeek;
//   // console.log(firstDayOfWeek)
//   // return firstDayOfWeek;
// }



class App extends React.Component {
  thisWeek = (iterator) => {
    const week = moment().week() + this.state.weekIterator;
    console.log(week);
    return week;
  }
  
  state = {
    firstDayOfSelectedWeek: new Date(),
    currentWeek: moment().week() -1,
    weekIterator: 0
  }
  getDay  = (dayOfWeek) => {
    return moment().dayOfYear(this.state.currentWeek * 7 + dayOfWeek)._d
  }
  componentDidMount() {
    // const first = firstDateOfThisWeek();
    // const week = this.thisWeek(this.state.weekIterator);
    // const dayOfWeek = firstDayFromWeek(week);
    // this.setState({firstDayOfSelectedWeek : dayOfWeek});
    // debugger;
  }

  render() {
    this.thisWeek();
    return (
      <div className="App">
        <NavBar/>
        <DaysContainer firstDate={this.state.firstDayOfSelectedWeek} getDayFunction = {this.getDay}/>
      </div>
    );
  }
}

export default App;
