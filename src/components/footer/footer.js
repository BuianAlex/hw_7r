import React from 'react';
import './footer.scss';
import Map from './../googmap/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

class Services extends React.Component {
  render() {
    return (
      <footer id="contacts" className="footer">
        <div className="container flex-wrap">
          <div className="col-3">
            <div className="logo">
              <a href="/">
                <img src="./img/company-logo.png" alt="company logo" />
              </a>
            </div>
            <nav>
              <a href="#serv">Services</a>
              <a href="#about">About US</a>
              <div className="socialBtn">
                <a href="facebook.com">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="twitter.com">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="youtube.com">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </nav>
          </div>
          <div className="col-3">
            <h3>Address:</h3>
            <p>90802 California</p>
            <p>Long beach</p>
            <p>PO Box 68789</p>
            <p>300 East Ocean</p>
            <p>Boulevard</p>
          </div>
          <div className="col-3">
            <div className="map">
              <Map center={{ lat: 33.765571, lng: -118.189348 }}></Map>
            </div>
          </div>
        </div>
        <div>
          <p className="copyright">© 2019 Alex_Bu</p>
        </div>
      </footer>
    );
  }
}

export default Services;
