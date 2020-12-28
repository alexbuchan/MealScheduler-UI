import React from 'react';
import { Link } from "react-router-dom";
import UserActions from '../../actions/user/UserActions';
import UserStore from '../../stores/UserStore/UserStore';
import NavBarItem from './NavBarItem/NavBarItem';
import NavBarLogout from './NavBarLogout/NavBarLogout';
import NavBarUserProfile from './NavBarUserProfile/NavBarUserProfile';
import Logo from '../../assets/images/meal_scheduler_logo_round_no_container.jpeg';

import translations from './translations.json';
import { translate } from '../../lib/i18n/i18n';
let t = translate(translations);


class NavBar extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      user: UserStore.getUserState().user
    }

    this.t = t(this.props.appState.locale);
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
        <ul className="navbar-menu-list">
          <NavBarItem title={ this.t('navbar.schedule') } link='/schedule'/>
          <NavBarItem title={ this.t('navbar.recipes') } link='/recipes'/>
          <NavBarUserProfile username={ this.state.user.username } link='/settings'/>
          <NavBarLogout title={ this.t('navbar.logout') } link='/login' handleOnClick={ this.handleLogout } dataTest='logout-nav-link'/>
        </ul>
      );
    }

    return null;
  }

  renderAllAccessLinks = () => {
    if (!this.state.user) {
      return (
        <ul className="navbar-menu-list">
          <li className="navbar-menu-list-item">
            <Link className="navbar-menu-list-item-title" to="/">Signup</Link>
          </li>

          <li className="navbar-menu-list-item">
            <Link className="navbar-menu-list-item-title" to="/login">Login</Link>
          </li>
        </ul>
      );
    }

    return null;
  }

  render() {
    this.t = t(this.props.appState.locale);

    return (
      <nav className="navbar">
        <div className='navbar-brand'>
          <Link className="navbar-brand-name" to="">
            <img className='navbar-brand-logo' src={ Logo }></img>
          </Link>
          {/* <div className="navbar-brand-logo-wrapper">
            <img className='navbar-brand-logo' alt='l'></img>
          </div> */}
        </div>
        { this.renderAuthorisedLinks() }
        { this.renderAllAccessLinks() }
      </nav>
    );
  }
}

export default NavBar;
