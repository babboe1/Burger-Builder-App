import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const NavItems = (props) => {
	const list = props.data.map((item, idx) => (
		<NavItem link={props.links[idx]} active={(props.active)[idx]}>{item}</NavItem>
	));
	return <ul className={classes.NavItems}>{list}</ul>;
};

export default NavItems;
