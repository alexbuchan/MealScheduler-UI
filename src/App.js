/* LIBRARY IMPORTS */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* STORE IMPORTS */
import UserStore from './stores/user';

/* ACTION IMPORTS */
import UserActions from './actions/user';

/* VIEW IMPORTS */
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import Contacts from './views/ContactsView';

/* COMPONENT IMPORTS */
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import GenericNotFound from './components/GenericNotFound/GenericNotFound';
import FlashMessage from './components/FlashMessage/FlashMessage';

/* STYLES IMPORTS */
import './styles/styles.scss';

/* ROOT COMPONENT */
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userStore: UserStore.getUserState(),
      closeFlashMessage: UserStore.getCloseFlashMessage(),
      error: ''
    }

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({
      userStore: UserStore.getUserState(),
      error: UserStore.getError(),
      closeFlashMessage: UserStore.getCloseFlashMessage()
    });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  isLoggedIn = () => {
    if (this.state.userStore.cookie) return <Contacts />;

    return <Redirect to='/login' />;
  }

  renderFlashMessage() {
    return (
        <FlashMessage
          message={ this.state.error }
          type='error'
          close={ this.state.closeFlashMessage }
          closeFlashMessage={ UserActions.closeFlashMessage }
          timeout={ 3000 }
        />
    );
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <NavBar 
            cookie={ this.state.userStore.cookie }
          />

          <Switch>
            <Route exact path="/" render={ () => <SignupView cookie={ this.state.userStore.cookie } /> } />
            <Route exact path="/login" render={ () => <LoginView cookie={ this.state.userStore.cookie } /> } />
            <Route exact path="/contacts" render={ this.isLoggedIn } />
            <Route path='/*' component={ GenericNotFound } />
          </Switch>

          { this.renderFlashMessage() }
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
