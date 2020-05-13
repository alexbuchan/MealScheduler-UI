/* LIBRARY IMPORTS */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* ACTION IMPORTS */
import UserActions from './actions/user/UserActions';

/* VIEW IMPORTS */
import SignupView from './views/SignupView';
import LoginView from './views/LoginView/LoginView';
import Contacts from './views/Contacts/ContactsView';
import Settings from './views/Settings';
import GenericNotFound from './views/GenericNotFoundPage/GenericNotFound';

/* COMPONENT IMPORTS */
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import FlashMessage from './components/FlashMessage/FlashMessage';

/* STYLES IMPORTS */
import './styles/styles.scss';

/* ROOT COMPONENT */
class App extends React.Component {
  constructor() {
    super();

    UserActions.retrieveUserDataOnRefresh();
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <NavBar />

          <Switch>
            <Route exact path="/" component={ SignupView } />
            <Route exact path="/login" component={ LoginView } />
            <Route exact path="/contacts" component={ Contacts } />
            <Route exact path="/settings" component={ Settings } />
            <Route path='/*' component={ GenericNotFound } />
          </Switch>

          <FlashMessage />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
