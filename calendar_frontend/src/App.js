import React from 'react';
// import {browserHistory} from 'react-router'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import './stylesheets/App.css';
import './stylesheets/main.css'
import DaysContainer from './containers/DaysContainer';
import moment from 'moment';
import Navigation from './components/Navigation';
import Authentication from './util/Authentication';
import Signup from './components/Signup';
import Login from './components/Login'
// console.warn(Authentication)

function localCreds() {
  let newAuth = new Authentication
  return newAuth.fromLocalStorage();

}

class App extends React.Component {

  state = {
    firstDayOfSelectedWeek: new Date(),
    currentWeek: moment().week() - 1,
    currentUser: localCreds()
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
      let newAuth = new Authentication
      const locallyStoredUser = newAuth.fromLocalStorage();
      if (locallyStoredUser !== null) {
        this.setState({currentUser: locallyStoredUser})
      }
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
      console.log('no cached creds, redirecting to signup page')
      return (
        <>
          <Redirect to='/signup'/>
        </>
      )
    }
    return (
      <Route exact path='/'>
        {this.renderLogout()}
        <DaysContainer
          firstDate = {this.state.firstDayOfSelectedWeek}
          getDayFunction = {this.getDay}
          toggleWeek = {this.toggleCurrentWeek}
          currentUser = {this.state.currentUser}
        />
      </Route>
    );
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login}/>

          {this.renderLoginOrHome()}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
