import React from 'react';
import classes from './Logo.css'

const Logo = (props) => (
	<div className={[classes.Logo, props.class].join(' ')}>
		<img src={require('../../assets/images/burger-logo.png')} alt="Logo" />
	</div>
);

export default Logo