import React from 'react';
import './stylesheets/App.css';
import './stylesheets/main.css'
import DaysContainer from './containers/DaysContainer';
import moment from 'moment';
import Navigation from './components/Navigation';
import Authentication from './util/Authentication';

class App extends React.Component {

  state = {
    firstDayOfSelectedWeek: new Date(),
    currentWeek: moment().week() - 1,
    currentUser: null
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


  // return (
  //   <Router>
  //       <Route exact path="/" component={App}/>
  //       <Route exact path="/signup" component={Signup}/>
  //   </Router>

  componentDidMount() {
    if (this.state.currentUser ===  null) {
      const locallyStoredUser = Authentication.fromLocalStorage();
      if (locallyStoredUser === null) {
        Authentication.login()
      }
    }
  }

  renderLogout = () => {
    if (this.state.currentUser !== null) {
      return <button>Log out</button>
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderLogout()}
        {/* <Navigation navigate = {this.getDifferentWeek} currentWeek = {this.state.currentWeek}/> */}
        <DaysContainer
          firstDate = {this.state.firstDayOfSelectedWeek}
          getDayFunction = {this.getDay}
          toggleWeek = {this.toggleCurrentWeek}
        />
      </div>
    );
  }
}

export default App;
