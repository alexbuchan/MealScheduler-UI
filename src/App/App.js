/* LIBRARY IMPORTS */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* ACTION IMPORTS */
import UserActions from '../actions/user/UserActions';

/* VIEW IMPORTS */
import Schedule from '../views/Schedule/ScheduleView';
import Recipes from '../views/Recipes/RecipesView';
import Settings from '../views/Settings/Settings';
import GenericNotFound from '../views/GenericNotFoundPage/GenericNotFound';

/* COMPONENT IMPORTS */
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import FlashMessage from '../components/FlashMessage/FlashMessage';
import SignupForm from '../components/SignupForm/SignupForm';
import LoginForm from "../components/LoginForm/LoginForm";

/* HOC IMPORTS */
import withUserEntry from '../HOC/UserEntryView/UserEntryView';
import withAuthentication from '../HOC/Authentication/Authentication';

/* STYLES IMPORTS */
import '../styles/styles.scss';

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
            <Route exact path="/" component={ withUserEntry(SignupForm) } />
            <Route exact path="/login" component={ withUserEntry(LoginForm) } />
            <Route exact path="/schedule" component={ withAuthentication(Schedule) } />
            <Route exact path="/Recipes" component={ withAuthentication(Recipes) } />
            <Route exact path="/settings" component={ withAuthentication(Settings) } />
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
