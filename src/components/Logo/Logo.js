import React from 'react';
import { Link } from 'react-router-dom';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <Link to="/" >
            <img src={burgerLogo} alt="MyBurger" />
        </Link>
    </div>
);

export default logo;