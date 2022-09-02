import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const BuildControls = (props) => {
	const ingredientKey = Object.keys(props.object).map((key, idx) => {
		return (
			<BuildControl
				label={key.charAt(0).toUpperCase() + key.slice(1)}
				id={key}
				key={key + idx}
				disabled={props.disabled[key]}
			/>
		);
	});

	return (
		<div className={classes.BuildControls}>
			<p><strong>Price:$ {props.price}</strong></p>
			{ingredientKey}
			<button
				className={classes.OrderButton}
				disabled={
					Object.values(props.orderDisabled).reduce(
						(acc, key) => acc + key,
						0,
					) < 1
						? true
                  : false
               }
               onClick={props.click}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
