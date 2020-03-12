/* REACT IMPORTS */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* STORE IMPORTS */
import UserStore from './stores/user';

/* COMPONENT IMPORTS */
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import Contacts from './views/ContactsView';

/* STYLES IMPORTS */
import './styles.scss';

/* ROOT COMPONENT */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userStore: UserStore.getUserState()
    }

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ userStore: UserStore.getUserState() });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  isLoggedIn = () => {
    if (this.state.userStore.auth) return <Contacts />;

    return <Redirect to='/login' />;
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <NavBar 
            isLoggedIn={ this.state.userStore.auth }
            userName={ (this.state.userStore.user) ? this.state.userStore.user.name : null }
          />

          <Switch>
            <Route exact path="/" render={ () => <SignupView auth={ this.state.userStore.auth } /> } />
            <Route exact path="/login" render={ () => <LoginView auth={ this.state.userStore.auth } /> } />
            <Route exact path="/contacts" render={ this.isLoggedIn } />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
