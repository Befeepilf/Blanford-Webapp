import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider, makeStyles} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import getMuiTheme from '../styles/getMuiTheme.js';
import Image from './Image.jsx';
import BrandName from './BrandName.jsx';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    '& .bg': {
      opacity: 0.7
    },
    '& h1': {
      marginBottom: 14,
      opacity: 0.3
    },
    '& h2': {
      fontFamily: ['ITC Cheltenham W03 Book', 'serif'],
      fontWeight: 400,
      textAlign: 'center',
      '& + *': {
        margin: [[42, 0]],
        fontSize: '4rem'
      }
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: [[35, 28]],
    '@media (min-width: 576px)': {
      maxWidth: 420,
      height: 'auto'
    },
    '@media (min-width: 768px)': {
      maxWidth: 448
    }
  },
  button: {
    fontWeight: 400,
    textTransform: 'none',
    color: '#303030'
  }
}))

function VerifyLoginMessageScreen(props) {
  const [countdown, setCountdown] = React.useState(4);

  React.useEffect(() => {
    if(props.countdown) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [props.countdown]);


  if(countdown < 1 && props.action) {
    props.action();
  }

  const classes = useStyles();
  return(
    <div id="Login" className={classes.root}>
      <Image name="blog-banner.jpg" className="bg"/>
      <Paper className={classes.paper}>
        <BrandName header/>
        <h2>{props.message}</h2>
        {props.state === 'success' ? <CheckCircleIcon style={{color: green[500]}}/> : props.state === 'error' ? <ErrorIcon style={{color: red[500]}}/> : <CircularProgress/>}
        {props.state !== 'loading' && props.action && props.actionLabel ? <Button className={classes.button} onClick={props.action}>{props.actionLabel} >{props.countdown ? ` (${countdown})` : null}</Button> : null}
      </Paper>
    </div>
  );
}

VerifyLoginMessageScreen.propTypes = {
  message: PropTypes.node.isRequired,
  state: PropTypes.oneOf(['loading', 'error', 'success']).isRequired,
  countdown: PropTypes.bool,
  actionLabel: PropTypes.string,
  action: PropTypes.func
};


export default (props) => (
  <ThemeProvider theme={getMuiTheme('homepage', false)}>
    <CssBaseline/>
    <VerifyLoginMessageScreen {...props}/>
  </ThemeProvider>
)
