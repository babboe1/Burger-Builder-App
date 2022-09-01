import React from 'react';
import classes from './Modal.css';

class Modal extends React.Component {
   shouldComponentUpdate(nextProps, nextState) {
      return nextProps.show !== this.props.show
   }
   componentDidUpdate() {
      console.log('[Modal] component updated');
   }

	render() {
		return (
			<div
				className={classes.Modal}
				style={{
					transform: this.props.show
						? 'translateY(0)'
						: 'translateY(-100vh)',
					opacity: this.props.show ? 1 : 0,
					zIndex: this.props.show ? 500 : -1,
					pointerEvents: this.props.show ? 'all' : 'none',
				}}
			>
				{this.props.children}
			</div>
		);
	}
};

export default Modal;
