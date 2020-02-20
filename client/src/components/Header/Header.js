import React from 'react';
import classes from './Header.module.css';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
const Header = props => {
  return (
    <div className={classes.Header}>
      <div className={classes.appLogo}>
        <img src={logo} alt="" />
      </div>
      <div className={classes.appTitle}>
        <h3>My Library</h3>
      </div>
      <div className={classes.appUser}>
        <Link to="/users/login">
          <i class="fa fa-user"></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
