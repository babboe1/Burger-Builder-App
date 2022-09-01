import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavItems/NavItems';
import classes from './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const style = {
	display: 'flex',
	height: '100%',
	width: '100%',
	columnGap: '1rem',
	alignItems: 'center',
};

const Toolbar = (props) => {
	const navData = {
		HOME: 'some line',
		BurgerBuilder: 'some line',
		Checkout: 'some lime',
	};
	return (
		<header className={classes.Toolbar}>
			<div style={style}>
            <DrawerToggle click={props.click }/>
				<Logo />
			</div>
			<nav>
				<NavItems
					data={Object.keys(navData)}
					links={Object.values(navData)}
					active={[true, ...false]}
				/>
			</nav>
		</header>
	);
};

export default Toolbar;
