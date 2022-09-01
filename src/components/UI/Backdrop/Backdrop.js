import React from 'react';
import classes from './Backdrop.css'

const Backdrop = (props) => {
   return <button className={classes.Backdrop} onClick={props.click}></button>
}

export default Backdrop; 