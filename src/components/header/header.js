import React from 'react';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container app-header">
          <div className="logo">
            <img src="./img/company-logo.png" alt="company logo" />
            <h1 className="hidden-h1">The servise company</h1>
          </div>
          <nav>
            <a href="#serv">Services</a>
            <a href="#about">About US</a>
            <a href="#contacts">Contacts</a>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
