import React, { Component } from 'react';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

const withErrorHandler = (WrappedComponent, axios) => {
   return class extends Component {
      state = {
         error: null,
         showModal: false
      };
      componentDidMount() {
         axios.interceptors.request.use((req) => {
            this.setState({ error: null });
            return req;
         });
         axios.interceptors.response.use(null, (error) => {
            this.setState({
               error: error,
               showModal: true
            });
         });
      }
      render() {
         return (
            <Auxi>
               {this.state.error ? (
                  <Backdrop click={() => {
                     this.setState({
                        error: null,
                        showModal: false
                     })
                  }} />
               ) : null}
               <Modal show={this.state.error}>
                  {this.state.error ? this.state.error.message : null}
                  {console.log(this.state.error)}
               </Modal>
               <WrappedComponent {...this.props} />
            </Auxi>
         );
      }
   };
};

export default withErrorHandler;
