import React from 'react';
import './services.scss';

class Services extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <section id="serv" className="container services">
        <h2>What we Do</h2>
        <ul className="services-list">
          {this.props.srvData.map(item => {
            return (
              <li key={item.id}>
                <img src={'./img/' + item.icon} alt="dd" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Services;
