import React from 'react';
import classNames from 'classnames';
import Router from 'next/router';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import {request} from '../../API.js';


const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 455,
    width: '100%',
    padding: 14,
    backgroundColor: '#1f3141'
  },
  title: {
    paddingBottom: 14,
    fontFamily: '"Open Sans", "Roboto", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#fff'
  },
  content: {
    paddingBottom: 4
  },
  text: {
    color: theme.palette.grey[100]
  },
  list: {
    paddingLeft: 10,
    margin: 0,
    marginTop: 28,
    '& > li': {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      maxWidth: '38ch',
      padding: [[0, 0, 28, 28]],
      fontFamily: '"Comic Sans", "Roboto", sans-serif',
      fontSize: '0.97rem',
      lineHeight: 1.6,
      color: '#fff',
      '&:nth-child(1)': {
        color: '#6bff6f',
        '&::before': {
          background: 'linear-gradient(to bottom, #1D59e9, #1372e7)'
        }
      },
      '&:nth-child(2)::before': {
        background: 'linear-gradient(to bottom, #1372e7, #098ce5)'
      },
      '&:nth-child(3)::before': {
        background: 'linear-gradient(to bottom, #098ce5, #00a6e3)'
      },
      '&:not(:last-child)::before': {
        content: '""',
        position: 'absolute',
        width: 1,
        height: '100%',
        top: 7,
        left: 2.25
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        width: 6,
        height: 6,
        top: 7,
        left: 0,
        backgroundColor: '#00a6e3',
        borderRadius: '50%'
      },
      '& svg': {
        marginLeft: 7,
        fontSize: 18,
        color: '#6bff6f'
      }
    }
  },
  actions: {
    justifyContent: 'center'
  },
  button: {
    paddingLeft: 42,
    paddingRight: 42,
    boxShadow: 'none'
  },
}));
function WelcomeDialog(props) {
  function onStart() {
    props.dispatch({type: 'SET', data: {profile: {app_metadata: {hideWelcomeDialog: true}}}});
    Router.push('/d/you');
    request('/hideWelcomeDialog', 'POST', {}, () => {});
  }

  const classes = useStyles();
  return(
    <Dialog
      open={props.open}
      disableBackdropClick disableEscapeKeyDown
      classes={{paper: classes.paper}}
    >
      <DialogTitle className={classes.title} disableTypography>Vielen Dank, das hat geklappt! :)</DialogTitle>
      <DialogContent className={classes.content}>
        <Typography className={classes.text}>Nächste Schritte:</Typography>
        <ol className={classes.list}>
          <li>
            Account erstellen
            <CheckIcon/>
          </li>
          <li>Kurzen Fragebogen ausfüllen</li>
          <li>Telefonische Besprechung abmachen</li>
          <li>Optional: Wir geben Ihnen Unterstützung und Auskunft im Chat.</li>
        </ol>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" color="primary" className={classes.button} onClick={onStart}>Start</Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(({profile}) => ({open: profile.logins_count === 1 && !profile.app_metadata.hideWelcomeDialog}))(WelcomeDialog);
