import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import Axios from '../../axios-orders';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.respInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });

        }

        componentWillUnmount() {
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        pageContent() {
            let content = <WrappedComponent {...this.props} />;
            if (this.state.error) {
                content = <p> {this.state.error.message}</p>
            }
            return content;
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    {this.pageContent()}
                </Aux>
            );
        }
    }
}

export default withErrorHandler;