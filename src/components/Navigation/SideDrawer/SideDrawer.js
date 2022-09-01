import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavItems/NavItems';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {
	const navData = {
		BurgerBuilder: 'some line',
		Checkout: 'some lime',
	};
	return (
      <div className={[classes.SideDrawer, classes[props.class]].join(' ')}>
         <Logo class={ classes.Logo}/>
			<nav>
				<NavItems
					data={Object.keys(navData)}
					links={Object.values(navData)}
					active={[true, ...false]}
				/>
			</nav>
		</div>
	);
};

export default SideDrawer;
