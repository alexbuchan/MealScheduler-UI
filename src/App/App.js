/* LIBRARY IMPORTS */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* ACTION IMPORTS */
import UserActions from '../actions/user/UserActions';
import AppStore from '../stores/AppStore/AppStore';

/* VIEW IMPORTS */
import Schedule from '../views/Schedule/ScheduleView';
import Recipes from '../views/Recipes/RecipesView';
import Recipe from '../views/Recipe/RecipeView';
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

    this.state = {
      appState: AppStore.getAppState()
    };

    UserActions.retrieveUserDataOnRefresh();
  }

  _onChange = () => {
    this.setState({ appState: AppStore.getAppState() });
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <NavBar />

          <Switch>
            <Route exact path="/" component={ withUserEntry(SignupForm, this.state.appState) } />
            <Route exact path="/login" component={ withUserEntry(LoginForm, this.state.appState) } />
            <Route exact path="/schedule" component={ withAuthentication(Schedule, this.state.appState) } />
            <Route exact path="/recipes" component={ withAuthentication(Recipes, this.state.appState) } />
            <Route exact path="/recipes/:id" component={ withAuthentication(Recipe, this.state.appState) } />
            <Route exact path="/settings" component={ withAuthentication(Settings, this.state.appState) } />
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
