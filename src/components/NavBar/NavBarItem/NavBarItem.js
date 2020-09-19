import React from 'react';
import { Link } from "react-router-dom";

class NavBarItem extends React.Component {
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
    const { title, link, handleOnClick, dataTest } = this.props;

    return (
      <li className={ `navbar-menu-list-item${this.hoverClass()}` }>
        <Link
          className="navbar-menu-list-item-title" 
          to={ link }
          onClick={ handleOnClick }
          data-test={ dataTest }
          onMouseEnter={ this.handleOnMouseEnter }
          onMouseLeave={ this.handleOnMouseLeave }
        >
          { title }
        </Link>
      </li>
    );
  }
}

export default NavBarItem;