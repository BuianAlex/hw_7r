import React from 'react';
import './clients.scss';
import Carousel from './../../vendor/mySlider/slider';

class Clients extends React.Component {
  componentDidMount() {
    const mySlider = new Carousel({
      wraper: document.querySelector('#sl-1'),
      autoSide: true,
      autoSideTimeOut: 4000,
      displaySlide: 3
    });
  }
  render() {
    return (
      <section id="clients" className="container clients">
        <h2>Happy clients</h2>
        <div class="wraper-carousel" id="sl-1">
          <button href="#" class="slide-prev">
            &#10094;
          </button>
          <button href="#" class="slide-next">
            &#10095;
          </button>
          <ul className="carousel">
            {this.props.clientsData.map(item => {
              return (
                <li class="slide fade sl-3" key={item.id}>
                  <img src={'./img/company/' + item.img} alt={item.name} />
                </li>
              );
            })}
          </ul>
          <div class="wraper-dots slider-dots_outside"></div>
        </div>
      </section>
    );
  }
}

export default Clients;
