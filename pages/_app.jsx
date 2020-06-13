import * as Sentry from '@sentry/browser';
import React from 'react';
import {withRouter} from 'next/router';
import App from 'next/app';
import Head from 'next/head';
import {Provider} from 'react-redux';
import {PageTransition} from 'next-page-transitions';
import createStore from '../redux/createStore.js';
import Auth from '../Auth.js';
import Firebase from '../Firebase.js';
import '../styles/main.scss';

Sentry.init({
  dsn: 'https://f4f102b708934943bdf3aa2d52db4e8d@sentry.io/1759857'
});


const store = createStore();

@withRouter
export default class BlanfordApp extends App {
  constructor(props) {
    super(props);

    const auth = new Auth(store);
    const firebase = new Firebase(null, store);
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const {Component, pageProps} = this.props;
    return(
      <React.Fragment>
        <Head>
          <title>Blanford</title>
        </Head>

        <Provider store={store}>
          <PageTransition timeout={400} classNames="page-transition">
            <Component key={this.props.router.route} {...pageProps}/>
          </PageTransition>
        </Provider>
      </React.Fragment>
    );
  }
}
