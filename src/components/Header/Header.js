/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src="https://inassets1-internationsgmbh.netdna-ssl.com/static/bundles/internationshomepage/frontend/images/whitelogo@2x.png" height="38" alt="Internations" />
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">UMS</h1>
            <p className="Header-bannerDesc">User management system</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
