import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import AuthContext from '../../context/authContext';
import Auxi from '../../hoc/Auxi/Auxi';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		initialPrice: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		fixedPrices: {
			salad: 0.1,
			bacon: 0.1,
			cheese: 0.1,
			meat: 0.2,
		},
		totalPrice: 4,
		showModal: false,
	};

	ingredientHandler = (e, operator) => {
		const newState = { ...this.state.ingredients };
		const fixedPrices = { ...this.state.fixedPrices };
		const newPrices = { ...this.state.initialPrice };
		let totalPrice = this.state.totalPrice;

		for (const key in newState) {
			if (Object.hasOwnProperty.call(newState, key) && e.target.id === key) {
				let element = null;

				switch (operator) {
					case '+':
						element = newState[key] + 1;
						newPrices[key] += fixedPrices[key];
						totalPrice += fixedPrices[key];
						break;

					case '-':
						element = newState[key] - 1 < 0 ? 0 : newState[key] - 1;
						newPrices[key] =
							newPrices[key] <= fixedPrices[key]
								? 0
								: newPrices[key] - fixedPrices[key];
						totalPrice =
							totalPrice <= 4 ? 4 : totalPrice - fixedPrices[key];
						break;

					default:
						element = null;
				}
				newState[key] = element;
			}
		}
		this.setState({
			ingredients: newState,
			initialPrice: newPrices,
			totalPrice: +totalPrice.toFixed(1),
		});
	};

	onOrderClick = () => {
		if (!this.state.showModal) {
			document.body.classList.add('StopScroll');
		} else document.body.classList.remove('StopScroll');
		this.setState({
			showModal: !this.state.showModal,
		});
	};
	render() {
		const newObject = { ...this.state.ingredients };
		for (const key in newObject) {
			if (Object.hasOwnProperty.call(newObject, key)) {
				newObject[key] = newObject[key] <= 0;
			}
		}

		const showBackdrop = this.state.showModal ? (
			<Backdrop click={this.onOrderClick} />
		) : null;

		return (
			<AuthContext.Provider
				value={{
					addIngredient: (e) => this.ingredientHandler(e, '+'),
					removeIngredient: (e) => this.ingredientHandler(e, '-'),
				}}
			>
				<Auxi>
					{showBackdrop}
					<Modal show={this.state.showModal}>
						<OrderSummary
							data={{ ...this.state.ingredients }}
							click={this.onOrderClick}
							price={this.state.totalPrice}
						/>
					</Modal>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						object={this.state.ingredients}
						price={this.state.totalPrice}
						disabled={newObject}
						orderDisabled={this.state.ingredients}
						click={this.onOrderClick}
					/>
				</Auxi>
			</AuthContext.Provider>
		);
	}
}

export default BurgerBuilder;
