import React from 'react';
import './clients.scss';
import Slider from '../slider/slider';

class Clients extends React.Component {

  render() {
    return (
      <section id="clients" className="container clients">
        <h2>Happy clients</h2>
        <Slider sideData = {this.props.clientsData} />
      </section>
    );
  }
}

export default Clients;
