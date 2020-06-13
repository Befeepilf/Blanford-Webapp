import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import deLocale from 'date-fns/locale/de';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import VerifyLoginMessageScreen from '../components/VerifyLoginMessageScreen.jsx';


let timerId;

function Login(props) {
  const [error, setError] = React.useState();
  const [redirect, setRedirect] = React.useState(false);
  const [remaining, setRemaining] = React.useState();

  React.useEffect(() => {
    if(window.location && /access_token|id_token|error/.test(window.location.hash)) {
      props.auth.handleAuthentication(error => {
        if(error) {
          console.error("[Login]", error);

          if(typeof error === 'string') {
            error = {errorDescription: error};
          }

          error.errorInfo = {};
          if(error.errorDescription) {
            const errorDescriptionSplit = error.errorDescription.split('#');
            error.errorDescription = errorDescriptionSplit[0];
            if(errorDescriptionSplit[1]) {
              errorDescriptionSplit[1].split(';').forEach((kv) => {
                kv = kv.split(':');
                error.errorInfo[kv[0]] = kv[1];
              });
            }
          }


          const code = error.errorInfo.code && parseInt(error.errorInfo.code);

          if(code === 901) {
            timerId = setInterval(() => {
              const recoverAt = addMinutes(addHours(new Date(parseInt(error.errorInfo.changedEmailAt)), 24), 10);
              setRemaining(formatDistanceStrict(new Date(), recoverAt, {locale: deLocale}));
              setRedirect((recoverAt.getTime() - new Date().getTime()) <= 0);
            }, 60000);
          }
          else if(code !== 900 && code !== 902) {
            // this.timeout = setTimeout(() => {
            //   this.setState({redirect: true});
            // }, 5000);
          }

          setError(error);
        }
        else {
          Router.replace('/d');
        }
      });
    }
    else {
      Router.replace('/d');
    }

    return () => {
      clearInterval(timerId);
    }
  }, []);


  function relogin() {
    props.dispatch({type: 'LOGOUT', relogin: true});
  }


  if(redirect) {
    if(error) {
      relogin();
      return null;
    }
    else {
      Router.replace('/d');
      return null;;
    }
  }
  else {
    if(error && error.errorInfo) {
      const code = parseInt(error.errorInfo.code);
      if(code === 900) {
      }
      else if(code === 901) {
        error.errorSubDescription = "verbleibende Zeit, bis vorherige Ihre E-Mail-Adresse wiederhergestellt wird: " + (this.state.remaining || formatDistanceStrict( new Date(), addMinutes(addHours(new Date(parseInt(error.errorInfo.changedEmailAt)), 24), 10), {locale: deLocale}));
      }
      else if(code === 902) {
        error.errorSubDescription = <span>Ihre vorherige E-Mail-Adresse (<i>{error.errorInfo.oldEmail}</i>) wurde wiederhergestellt. Um <i>{error.errorInfo.newEmail}</i> für Ihr Konto zu verwenden, loggen Sie sich mit Ihrer vorherigen E-Mail-Adresse ein und wiederholen Sie den Änderungsvorgang.</span>;
      }

      error.type = (function() {
        if(code >= 900 && code <= 902) {
          return "Unautorisiert";
        }
        else if(code === 800) {
          return ("Stripe");
        }
        return "Unbekannter Fehler";
      }())
    }

    return(
      <VerifyLoginMessageScreen
        state={error ? 'error' : 'loading'}
        action={relogin}
        actionLabel="Erneut versuchen"
        message={error ? [error.type, ': ', error.errorDescription, ' ', (error.errorSubDescription || error.errorInfo.message)] : "Dashboard wird geladen..."}
      />
    );
  }
}


export default connect(({auth}) => ({auth}))(Login);
