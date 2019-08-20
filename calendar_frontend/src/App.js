import React from 'react';
// import {browserHistory} from 'react-router'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './stylesheets/App.css';
import './stylesheets/main.css'
import DaysContainer from './containers/DaysContainer';
import moment from 'moment';
import Navigation from './components/Navigation';
import Authentication from './util/Authentication';
import Signup from './components/Signup';

console.warn(Authentication)

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
      console.log(Authentication.fromLocalStorage);
      const locallyStoredUser = Authentication.fromLocalStorage();
      // if (locallyStoredUser === null) {
      //   Authentication.login()
      // }
    }
  }

  logoutClick = (event) => {
    console.warn("notimpl");
    this.setState({currentUser: null});
    Authentication.clearLocalStorage();
    
  }

  renderLogout = () => {
    if (this.state.currentUser !== null) {
      return <Link to='/signup' className="logout-button" onClick={this.logoutClick}>Log out</Link>
    }
  }

  renderLoginOrHome = () => {
    if (this.state.currentUser === null) {
      return <Route exact path='/signup' component={Signup}/>
    }
    return (
      <Route exact path='/'>
        {this.renderLogout()}
        <DaysContainer
          firstDate = {this.state.firstDayOfSelectedWeek}
          getDayFunction = {this.getDay}
          toggleWeek = {this.toggleCurrentWeek}
        />
      </Route>
    );
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter >
          {this.renderLoginOrHome()}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
