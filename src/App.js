

import React, { Component } from 'react';
// import './theme/styles.scss';
import { appStore } from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './theme';
import 'react-tippy/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';


import Home from './containers/Home';


class App extends Component {
    
    render() {
        return (
            <>
                <Provider store={appStore}>
                    <Home />
                </Provider>
                <ToastContainer />
            </>
        );
    }
}
export default App;