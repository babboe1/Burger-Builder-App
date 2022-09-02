import React from 'react';
import classes from './Modal.css';

const modal = (props) => {
	return (
		<div
			className={classes.Modal}
			style={{
				transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
				opacity: props.show ? 1 : 0,
				zIndex: props.show ? 500 : -1,
				pointerEvents: props.show ? 'all' : 'none',
			}}
		>
			{props.children}
		</div>
	);
};

export default modal;
