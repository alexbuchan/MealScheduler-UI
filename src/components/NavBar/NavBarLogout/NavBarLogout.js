import React from 'react';
import { Link } from "react-router-dom";
import LogoutIcon from '../../../assets/images/svg/logout.svg';

class NavBarLogout extends React.Component {
  state = {
    hover: false
  }

  handleOnMouseEnter = () => {
    this.toggleHover();
  }

  handleOnMouseLeave = () => {
    this.toggleHover();
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  hoverClass = () => {
    return (this.state.hover) ? '-hover' : ''
  }

  render() {
    const { title, link, handleOnClick, dataTest } = this.props;

    return (
      <Link
        className={ `navbar-logout${this.hoverClass()}` }
        to={ link }
        onClick={ handleOnClick }
        data-test={ dataTest }
        onMouseEnter={ this.handleOnMouseEnter }
        onMouseLeave={ this.handleOnMouseLeave }
      >
        <LogoutIcon className='navbar-logout-icon'/>
        <p className='navbar-logout-title'>{ title }</p>
      </Link>
    );
  }
}
 
export default NavBarLogout;