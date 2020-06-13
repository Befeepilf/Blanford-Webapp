import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import GradientButton from './GradientButton.jsx';
import Storage from '../Storage.js';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'fixed',
    maxWidth: '41ch',
    bottom: 28,
    right: 42,
    zIndex: 10,
    padding: [[35, 35, 28, 28]],
    color: '#fff',
    backgroundColor: '#212121'
  },
  close: {
    position: 'absolute',
    top: -24,
    right: -24,
    color: '#fff',
    '& svg': {
      padding: 7,
      fontSize: 34,
      backgroundColor: '#2e2e2e',
      borderRadius: '50%'
    }
  },
  content: {
    fontFamily: '"helvetica neue regular", sans-serif',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 21,
    fontFamily: '"Open Sans", sans-serif',
    '& button': {
      fontSize: '0.8125rem',
      fontWeight: 500
    }
  },
  link: {
    marginLeft: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer'
  },
  snack: {
    color: '#fff',
    '& > *': {
      backgroundColor: '#212121'
    }
  },
  snackCloseContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: -24,
    right: -24,
    '& svg': {
      padding: 7,
      fontSize: 34,
      backgroundColor: '#2e2e2e',
      borderRadius: '50%'
    }
  }
});

function CookieConsent(props) {
  const [consentOpen, setConsentOpen] = React.useState(props.show);
  const [snackOpen, setSnackOpen] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      closeConsent();
    }, 20000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function deny() {
    Storage.setItem('disableAnalytics', 1);
    closeConsent();
    setSnackOpen(true);
  }

  function closeConsent() {
    setConsentOpen(false);
  }

  function closeSnack() {
    setSnackOpen(false);
  }

  const classes = useStyles();

  return [
    <Fade key={0} in={consentOpen} timeout={500} unmountOnExit>
      <Paper className={classes.paper}>
        <IconButton className={classes.close} onClick={closeConsent}>
          <CloseIcon color="inherit"/>
        </IconButton>
        <div className={classes.content}>
          <p>
            Blanford verwendet Cookies, um besser zu verstehen, wie Besucher unserer Webseite nutzen.
            Wenn Sie auf dieser Seite fortfahren, stimmen Sie dem zu.
          </p>
          <div className={classes.buttons}>
            <GradientButton onClick={closeConsent}>VERSTANDEN</GradientButton>
            <a role="button" className={classes.link} onClick={deny}>oder ablehnen</a>
          </div>
        </div>
      </Paper>
    </Fade>,
    <Snackbar
      key={1}
      className={classes.snack}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={snackOpen}
      autoHideDuration={7000}
      onClose={closeSnack}
      message={<span>Es werden <u>keine</u> Daten mehr bezüglich Ihres Nutzungsverhaltens unserer Webseite gesammelt.</span>}
      action={<div className={classes.snackCloseContainer}><IconButton aria-label="Schließen" color="inherit" onClick={closeSnack}><CloseIcon/></IconButton></div>}
    />
  ];
}

CookieConsent = connect(state => ({
  show: state.isBrowser ? !document.cookie.match(/disableAnalytics=1/) : state.cookies && state.cookies.denyAnalytics !== '1'
}))(CookieConsent);

export default CookieConsent;
