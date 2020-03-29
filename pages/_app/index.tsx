import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { appStore } from '../../src/redux/store';
import withReduxStore from '../../src/lib/with-redux-store';
import { ToastContainer } from 'react-toastify';

import 'react-tippy/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/theme/main.scss';

import { Colors } from '@colors';

const theme = {
	colors: {
		...Colors
	}
}


class MyApp extends App {
  render() {
	const { Component, pageProps } = this.props
	return (
		<>
		<Provider store={appStore}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
		<ToastContainer />
		</>
	)
  }
}

export default withReduxStore(MyApp)