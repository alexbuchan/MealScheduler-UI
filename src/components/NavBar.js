import React from 'react';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Goldenspear Contacts App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-sm-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/contacts">Contacts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Signup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
