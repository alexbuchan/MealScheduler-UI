import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import './styles.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <NavBar />

          <Switch>
            <Route exact path="/" component={ SignupView }></Route>
            <Route exact path="/login" component={ LoginView }></Route>
            <Route exact path="/contacts">
              <h1>Contacts</h1>
            </Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
