import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import './main.css';
import NavBar from './components/NavBar';
import DaysContainer from './containers/DaysContainer';
// import NavBar from '../'


const firstDateOfThisWeek = () => {
  const date = new Date();
  // const currentDay = date.getDate();
  // const currentWeek = Math.floor(date.getDate() / 7);
  const currentDay = date.getDay();
  const firstMonthDayOfWeek = date.getDate() - currentDay;
  console.log(firstMonthDayOfWeek);
  const firstMonthDayAsDate = new Date(date.getFullYear(), date.getMonth(), firstMonthDayOfWeek);
  // console.log(currentDay, currentWeek);
  // console.log(DAYS[currentDay]);
  // return currentWeek;
  return firstMonthDayAsDate;

}


class App extends React.Component {

  state = {
    firstDayOfSelectedWeek: new Date()
  }

  componentDidMount() {
    const first = firstDateOfThisWeek();
    this.setState({firstDayOfSelectedWeek : first});
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
        <DaysContainer firstDate={this.state.firstDayOfSelectedWeek}/>
      </div>
    );
  }
}

export default App;
