

import React, { Component } from 'react';
// import './theme/styles.scss';
import { appStore } from './redux/store';
import { Provider } from 'react-redux';

import './theme';


import Home from './containers/Home';


class App extends Component {
    
    render() {
        return (
            <Provider store={appStore}>
                <Home />
            </Provider>
        );
    }
}
export default App;