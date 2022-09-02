import React from 'react';
import classes from './BuildControl.css';
import AuthContext from '../../../../context/authContext';
import Auxi from '../../../../hoc/Auxi/Auxi';

const BuildControl = (props) => {
	return (
		<div className={classes.BuildControl}>
			<AuthContext.Consumer>
				{(context) => {
					return (
						<Auxi>
							<div className={classes.Label}>{props.label}</div>
							<button className={classes.Less} onClick={context.removeIngredient} id={props.id} disabled={props.disabled}>
								Less
							</button>
							<button className={classes.More} onClick={context.addIngredient} id={props.id}>
								More
							</button>
						</Auxi>
					);
				}}
			</AuthContext.Consumer>
		</div>
	);
};

export default BuildControl;
