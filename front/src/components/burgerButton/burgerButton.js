import React from 'react';
import './burgerButton.scss';

class Burger extends React.Component {
  render() {
    return (
      <>
        <button
          type="button"
          className={`nav-btn  ${this.props.btnState ? 'change' : null}`}
          onClick={() => {
            this.props.onClick();
          }}
        >
          <div/>
          <div/>
          <div/>
        </button>
      </>
    );
  }
}

export default Burger;
