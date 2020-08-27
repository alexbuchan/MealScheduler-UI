import React from 'react';
import { Link } from "react-router-dom";
import UserActions from '../../actions/user/UserActions';
import UserStore from '../../stores/UserStore/UserStore';

class NavBar extends React.Component  {
  constructor() {
    super();

    this.state = {
      user: UserStore.getUserState().user
    }

    this._onChange = this._onChange.bind(this);
  }

  handleLogout = (ev) => {
    UserActions.logoutUser();
  }

  _onChange() {
    this.setState({
      user: UserStore.getUserState().user,
    });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  renderAuthorisedLinks = () => {
    if (this.state.user) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item mobile-nav-item">
            <span className="nav-link user-profile" to="/schedule">{ this.state.user.username }<span className="sr-only">(current)</span></span>
          </li>

          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" to="/schedule">Schedule</Link>
          </li>

          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" to="/recipes">Recipes</Link>
          </li>

          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" data-test='settings-nav-link' to="/settings">Settings<span className="sr-only">(current)</span></Link>
          </li>

          <li className="nav-item mobile-nav-item">
            <Link
              onClick={ this.handleLogout }
              className="nav-link"
              data-test='logout-nav-link'
              to="/login"
            >
              Log out
              <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
      );
    }

    return null;
  }

  renderAllAccessLinks = () => {
    if (!this.state.user) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" to="/">Signup</Link>
          </li>

          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
          </li>
        </ul>
      );
    }

    return null;
  }

  render() {
    return (
      <nav className="navbar-height navbar navbar-expand-xs navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="">Meal Scheduler</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-sm-end" id="navbarNav">
          <ul className="navbar-nav">
            { this.renderAuthorisedLinks() }
            { this.renderAllAccessLinks() }
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
