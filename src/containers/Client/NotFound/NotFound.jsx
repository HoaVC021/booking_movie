import {
  faFacebook, faGoogle, faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './notfound.css';

function NotFound() {
  const role = useSelector(state => state.auth.role)
  return (
    <div id="notfound">
      <div className="notfound-bg"></div>
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <Link to={role === "QuanTri" ? '/admin' : '/'} className="home-btn">
          Go Home
        </Link>
        {/* <a href="#" className="home-btn">
          Go Home
        </a> */}
        {/* <a href="#" className="contact-btn">
          Contact us
        </a> */}
        <div className="notfound-social">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
