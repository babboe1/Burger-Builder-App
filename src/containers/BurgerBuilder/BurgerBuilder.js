import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import AuthContext from '../../context/authContext';
import Auxi from '../../hoc/Auxi/Auxi';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
   state = {
      ingredients: null,
      initialPrice: null,
      fixedPrices: null,
      totalPrice: null,
      showModal: false,
      loading: false,
      error: false,
      credits: false,
   };

   componentDidMount() {
      axios
         .get('/.json')
         .then((res) => {
            this.setState({
               ingredients: res.data.ingredients,
               fixedPrices: res.data.fixedPrice,
               initialPrice: res.data.initialPrice,
               totalPrice: res.data.totalPrice,
               // error: false,
            });
         })
   }

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
         credits: false,
      });
   };

   onOrderPurchase = () => {
      document.body.classList.add('StopScroll');
      this.setState({
         loading: true,
      });
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
         customer: {
            name: 'Max',
            address: {
               street: 'Teststreet 1',
               zipCode: '41351',
               country: 'Germany',
            },
            email: 'test@test.com',
         },
         deliveryMethod: 'fastest',
      };
      axios
         .post(`/orders.json`, order)
         .then((res) => {
            this.setState({
               // showModal: !this.state.showModal,
               loading: false,
               credits: true,
            });
            // console.log(res);
            // document.body.classList.remove('StopScroll');
         })
         .catch((err) => {
            this.setState({
               error: true,
               loading: false,
               credits: true
            });
            // console.log(err, this.state.error, this.state.credits);
         });
   };
   render() {
      // console.log(
      //    axios.get('/.json').then((res) => console.log(res.data.ingredients)),
      // );

      const newObject = { ...this.state.ingredients };
      for (const key in newObject) {
         if (Object.hasOwnProperty.call(newObject, key)) {
            newObject[key] = newObject[key] <= 0;
         }
      }

      let orderSummary = (
         <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchase={this.onOrderPurchase}
            click={this.onOrderClick}
            data={{ ...this.state.ingredients }}
         />
      );
      if (this.state.loading) {
         orderSummary = <Spinner />;
      } else if (this.state.credits && this.state.error) {
         console.log('there is error');
         this.onOrderClick();
      } else if (this.state.credits) {
         // console.log('there is credits', this.state.error);
         orderSummary = (
            <p style={{ textAlign: 'center' }}>
               <strong>Thank you for placing your order</strong>
            </p>
         );
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
               <Modal show={this.state.showModal} load={this.state.loading}>
                  {orderSummary}
               </Modal>
               {!this.state.ingredients ? (
                  <Spinner />
               ) : (
                  <Auxi>
                     <Burger ingredients={this.state.ingredients} />
                     <BuildControls
                        object={this.state.ingredients}
                        price={this.state.totalPrice}
                        disabled={newObject}
                        orderDisabled={this.state.ingredients}
                        click={this.onOrderClick}
                     />
                  </Auxi>
               )}
               {!this.state.ingredients ? (
                  <p style={{ textAlign: 'center' }}>
                     <strong>Error!!, can't load ingredients</strong>
                  </p>
               ) : null}
            </Auxi>
         </AuthContext.Provider>
      );
   }
}

export default withErrorHandler(BurgerBuilder, axios);
