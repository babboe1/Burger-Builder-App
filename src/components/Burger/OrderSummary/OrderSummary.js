// import axios from 'axios';
import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// componentDidUpdate() {
	// 	console.log('[Order Summary] component updated');
	// }
	render() {
	
		const ingredientSummary = Object.keys(this.props.data).map((key, idx) => {
			return (
				<li key={key + idx}>
					<span style={{ textTransform: 'capitalize' }}>{key}</span>:
					{this.props.data[key]}
				</li>
			);
		});
		return (
			<Auxi>
				<h3>Your Order</h3>
				<p>A delicious Burger ith the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>Continue to checkout?</p>
            <p> <strong>Total Price: ${this.props.price }</strong></p>
				<Button class="Danger" click={this.props.click}>
					CANCEL
				</Button>
				<Button class="Success" click={this.props.purchase}>
					CONTINUE
				</Button>
			</Auxi>
		);
	}
}

export default OrderSummary;
