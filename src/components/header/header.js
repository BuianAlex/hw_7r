import React from 'react';
import './header.scss';
import Burger from './../burgerButton/burgerButton';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navState: false
    };
  }
  navPopup() {
    if (window.screen.width <= 576) {
      const curState = this.state.navState;
      this.setState({ navState: !curState });
    }
  }
  render() {
    return (
      <header>
        <div
          className={`container app-header  ${
            this.state.navState ? 'nav-shown' : null
          }`}
        >
          <div className="logo">
            <img src="./img/company-logo.png" alt="company logo" />
            <h1 className="hidden-h1">The servise company</h1>
          </div>
          <nav>
            {[
              { id: 1, name: 'Services', url: '#serv' },
              { id: 2, name: 'About US', url: '#about' },
              { id: 3, name: 'Contacts', url: '#contacts' }
            ].map(index => {
              return (
                <a
                  key={index.id}
                  href={index.url}
                  onClick={() => {
                    this.navPopup();
                  }}
                >
                  {index.name}
                </a>
              );
            })}
          </nav>
          <Burger
            btnState={this.state.navState}
            onClick={this.navPopup.bind(this)}
          ></Burger>
        </div>
      </header>
    );
  }
}

export default Header;
