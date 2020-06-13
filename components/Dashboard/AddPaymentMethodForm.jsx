import React, {useState} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {injectStripe, CardElement, IbanElement} from 'react-stripe-elements';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';

import ErrorIcon from '@material-ui/icons/Error';
import CheckCircle from '@material-ui/icons/CheckCircle';


const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    width: 490,
    padding: 70,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : '#e0e0e0',
    '&.disabled $loadingContainer': {
      zIndex: 0,
      opacity: 0.9
    },
    '&.solid $loadingContainer': {
      zIndex: 0,
      opacity: 1
    }
  },
  input: {
    padding: [[10, 21]],
    backgroundColor: theme.palette.type === 'dark' ? '#323232' : '#fff',
    borderRadius: 28,
    '& input': {
      color: theme.palette.text.primary
    }
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : '#e0e0e0',
    opacity: 0,
    transition: 'opacity 0.3s'
  },
  icon: {
    fontSize: 56
  }
}));

function AddPaymentMethodForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(0);
  const [state, setState] = useState();


  function onChange(event) {
    if(event.complete && !event.error) {
      if(props.stripe) {
        setIsLoading(true);
        props.stripe.createSource({
          type: event.elementType,
          usage: 'reusable'
        }).then(result => {
          if(result.error) {
            setState('error');
            setIsLoading(false);
            props.dispatch({type: 'SET', data: {notification: result.error}});
            setTimeout(() => setState(null), 3000);
          }
          else {
            props.stripe2.addSource(result.source.id, (error, source) => {
              if(error) {
                setState('error');
                setIsLoading(false);
                props.dispatch({type: 'SET', data: {notification: error.message}});
                setTimeout(() => setState(null), 3000);
              }
              else {
                setState('success');
                setIsLoading(false);
                setTimeout(props.onClose, 2000);
              }
            });
          }
        });
      }
      else {
        console.warn("Form submitted before Stripe.js loaded.");
      }
    }
  }

  function incrementReady() {
    setIsReady(isReady + 1);
  }

  const classes = useStyles();
  return(
    <form className={classNames(classes.form, {disabled: isLoading || state === 'error', solid: isReady < 1 || state === 'success'})}>
      <CardElement className={classes.input} onChange={onChange} onReady={incrementReady}/>
      {/*<Typography align="center" style={{margin: '28px 0'}}>oder</Typography>
      <IbanElement supportedCountries={['SEPA']} className={classes.input} onChange={onChange} onReady={incrementReady}/>*/}
      <div className={classes.loadingContainer}>
        {state === 'success' ? <Zoom in><CheckCircle className={classes.icon} style={{color: 'green'}}/></Zoom>
        : state === 'error' ? <Zoom in><ErrorIcon className={classes.icon} style={{color: 'red'}}/></Zoom>
        : <CircularProgress/>}
      </div>
    </form>
  );
}


export default injectStripe(connect(({stripe}) => ({stripe2: stripe}))(AddPaymentMethodForm));
