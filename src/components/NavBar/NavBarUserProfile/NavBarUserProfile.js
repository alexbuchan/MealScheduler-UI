import React from 'react';
import UserProfileIcon from '../../../assets/images/svg/user.svg';

const NavBarUserProfile = ({ username, link }) => {
  return (
    <li className="navbar-menu-list-item navbar-menu-profile">
      <div className="navbar-menu-list-item-title user-profile-wrapper" to={ link }>
        <UserProfileIcon className='user-profile-icon'/>
      </div>
        <span className='user-profile'>{ username }</span>
    </li>
  );
}
 
export default NavBarUserProfile;