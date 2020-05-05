import React from 'react';
import { Link } from "react-router-dom";

import UserActions from '../../actions/user/UserActions';

const NavBar = ({ user }) => {
  const handleLogout = (ev) => {
    UserActions.logoutUser();
  }

  const renderUsername = () => {
    if (user) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/contacts">{ user.username }<span className="sr-only">(current)</span></Link>
        </li>
      );
    }

    return null;
  }

  const renderSignup = () => {
    if (!user) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/">Signup</Link>
        </li>
      );
    }

    return null;
  }

  const renderLogin = () => {
    if (user) {
      return (
        <li className="nav-item">
          <Link onClick={ handleLogout } className="nav-link" to="/login">Log out<span className="sr-only">(current)</span></Link>
        </li>
      );
    }

    return (
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
      </li>
    );
  }

  return (
    <nav className="navbar-height navbar navbar-expand-xs navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="">Signup and Login App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-sm-end" id="navbarNav">
        <ul className="navbar-nav">
          { renderUsername() }
          <li className="nav-item">
            <Link className="nav-link" to="/contacts">Contacts</Link>
          </li>
          { renderSignup() }
          { renderLogin() }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
