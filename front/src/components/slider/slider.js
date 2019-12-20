import React from 'react';
import './slider.scss';
import Carousel from'./ctrlSlider'

class Slider extends React.Component {
    
    componentDidMount() {
        new Carousel({
          wraper: document.querySelector('#sl-1'),
          autoSide: true,
          autoSideTimeOut: 4000,
          displaySlide: 3
        });
      }
    
      render(){
        return(
            <div className="wraper-carousel" id="sl-1">
                <button href="#" className="slide-prev">
                    &#10094;
                </button>
                <button href="#" className="slide-next">
                    &#10095;
                </button>
                <ul className="carousel">
                    {this.props.sideData.map(item => {
                    return (
                        <li className="slide fade sl-3" key={item.id}>
                        <img src={'./img/company/' + item.img} alt={item.name} />
                        </li>
                    );
                    })}
                </ul>
                <div className="wraper-dots slider-dots_outside"></div>
            </div>
        )
    }
    
}

export default Slider;