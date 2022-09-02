import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import classes from '../Layouts/Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Backdrop from '../UI/Backdrop/Backdrop';

class Layout extends Component {
	state = {
		showDrawer: false,
	};

	toggleDrawer = () => {
		if (!this.state.showDrawer) {
			document.body.classList.add('StopScroll');
		} else document.body.classList.remove('StopScroll');
		this.setState({ showDrawer: !this.state.showDrawer });
	};

	render() {
		const renderDrawer = this.state.showDrawer ? (
			<Auxi>
				<Backdrop click={this.toggleDrawer} />
			</Auxi>
		) : null;
		return (
			<Auxi>
				<Toolbar click={this.toggleDrawer} />
				{renderDrawer}
            <SideDrawer class={ this.state.showDrawer ? 'Open' : 'Close'}/>
				<main className={classes.content}>{this.props.children}</main>
			</Auxi>
		);
	}
}

export default Layout;
