import React from 'react';
// import {browserHistory} from 'react-router'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import './stylesheets/App.css';
import './stylesheets/main.css'
import DaysContainer from './containers/DaysContainer';
import moment from 'moment';
import Authentication from './util/Authentication';
import Signup from './components/Signup';
import Login from './components/Login'
// console.warn(Authentication)

function localCreds() {
  let newAuth = new Authentication()
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
    // console.log(week-1);
    this.setState({currentWeek: week - 1})
  }

  setCurrentUser = (currentUser) => {
    // console.log("currentUser", currentUser)
    this.setState({currentUser: currentUser}); 
  }

  // return (
  //   <Router>
  //       <Route exact path="/" component={App}/>
  //       <Route exact path="/signup" component={Signup}/>
  //   </Router>

  componentDidMount() {
    if (this.state.currentUser ===  null) {
      const newAuth = new Authentication()
      const locallyStoredUser = newAuth.fromLocalStorage();
      if (locallyStoredUser !== null) {
        this.setState({currentUser: locallyStoredUser})
      }
    }
  }

  

  logoutClick = (event) => {
    this.setState({currentUser: null});
    const newAuth = new Authentication()
    newAuth.clearLocalStorage();
    
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
      <>
        {this.renderLogout()}
        <DaysContainer
          firstDate = {this.state.firstDayOfSelectedWeek}
          getDayFunction = {this.getDay}
          toggleWeek = {this.toggleCurrentWeek}
          currentUser = {this.state.currentUser}
        />
      </>
    );
  }
  

  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <Route exact path='/login' render={(props)=> <Login {...props} setCurrentUser={this.setCurrentUser}/>}/>
          <Route exact path='/signup' render={(props) =><Signup {...props} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route exact path='/' render={this.renderLoginOrHome}/>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
