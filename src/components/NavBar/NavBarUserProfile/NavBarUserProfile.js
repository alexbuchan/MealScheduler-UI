import React from 'react';
import { Link } from "react-router-dom";
import UserProfileIcon from '../../../assets/images/svg/user.svg';

class NavBarUserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
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
    const { username, link } = this.props;

    return (
      <Link
        className={ `navbar-menu-list-item navbar-menu-profile${this.hoverClass()}` }
        onMouseEnter={ this.handleOnMouseEnter }
        onMouseLeave={ this.handleOnMouseLeave }
        to={ link }
      >
        <div className="navbar-menu-list-item-title user-profile-wrapper">
          <UserProfileIcon className='user-profile-icon'/>
        </div>

        <span className='user-profile'>{ username }</span>
      </Link>
    );
  }
}

export default NavBarUserProfile;