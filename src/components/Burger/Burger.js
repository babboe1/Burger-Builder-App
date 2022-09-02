import React from 'react';
import classes from "./Burger.css"
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
   // console.log(props.ingredients);

   const keyIg = Object.keys(props.ingredients);
   const valueIg = Object.values(props.ingredients);
   // console.log(keyIg, valueIg);
   const transformedIngredients =
		valueIg.reduce((a, b) => a + b, 0) > 0 ? (
			keyIg.map((igKey, idx) => {
				return [...Array(props.ingredients[igKey])].map((_, id) => {
					return <BurgerIngredient type={igKey} key={igKey + id} />;
				});
			})
		) : (
			<p>Please add an Ingredient!!!</p>
		);

   return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default Burger