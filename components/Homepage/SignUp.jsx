import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import '../../styles/Homepage/SignUp.scss';


function SignUp(props) {
  const [error, setError] = React.useState();

  function submit(event) {
    event.preventDefault();
    props.auth.webauth.redirect.signupAndLogin({
      connection: 'Marketing-Users',
      email: event.target.querySelector('input[type="email"]').value,
      password: event.target.querySelector('input[type="password"]').value,
    }, (error) => {
        if(error) {
          console.error(error);
          if(error.code === 'invalid_password') {
            setError((
              <div>
                Password zu schwach! Kriterien:
                <ul>
                  {
                    error.description.rules.map((rule, index) => {
                      if(rule.code === 'lengthAtLeast') {
                        return <li key={index}>mindestens {rule.format[0]} Zeichen</li>;
                      }
                      else if(rule.code === 'containsAtLeast') {
                        return(
                          <li key={index}>
                            beinhaltet mindestens {rule.format[0]} der folgenden {rule.format[1]} Zeichengruppen:
                            <ul>
                              {rule.items.map((item, index2) => {
                                if(item.code === 'lowerCase') {
                                  return <li key={index2}>Kleinbuchstaben (a-z)</li>;
                                }
                                else if(item.code === 'upperCase') {
                                  return <li key={index2}>Großbuchstaben (A-Z)</li>;
                                }
                                else if(item.code === 'numbers') {
                                  return <li key={index2}>Zahlen (0-9)</li>;
                                }
                                else if(item.code === 'specialCharacters') {
                                  return <li key={index2}>Sonderzeichen (bspw. !@#$%^&*)</li>;
                                }
                              })}
                            </ul>
                          </li>
                        );
                      }
                      else if(rule.code === 'identicalChars') {
                        return <li key={index}>nicht mehr als {rule.format[0]} identische Zeichen hintereinander</li>;
                      }
                    })
                  }
                </ul>
              </div>
            ));
          }
          else if(error.code === 'email is required') {
            setError("Bitte geben Sie eine E-Mail-Adresse ein.");
          }
          else if(error.code === 'request_error') {
            try {
              if(JSON.parse(error.description).url.includes('authenticate')) {
                setError(<span>Die Registrierung war erfolgreich, allerdings konnten Sie nicht automatisch angemeldet werden. Melden Sie sich <a href="http://127.0.0.1:8080/dashboard">hier</a> an oder kontaktieren Sie unseren <a href="mailto:support@leadmechanic.com">Support</a>.</span>);
              }
            }
            catch(error2) {
              setError(<span>Bei der Registrierung ist ein Fehler aufgetreten. Versuchen Sie es erneut oder kontaktieren Sie unseren <a href="mailto:support@leadmechanic.com">Support</a>.</span>);
            }
          }
          else if(error.code === 'invalid_signup') {
            setError("Die Registrierung ist nicht möglich.");
          }
          else {
            setError(error.description || error.original.message);
          }
        }
      }
    );
  }

  React.useEffect(() => {
    if(error) {
      props.dispatch({type: 'SET', data: {notification: {message: error}}});
      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [error]);


  if(props.children) {
    return(
      <form onSubmit={submit} className={classNames('signup', props.className)}>{props.children}</form>
    );
  }

  return(
    <section className={classNames('signup', 'standard', props.className, {dark: props.dark, 'curved-edge': !props.dark})} style={props.dark ? {backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3541 975'%3E %3Cpath fill='%23202125' d='M0 616c889-9 1646-568 2625-468 133-13 607 15 923 136-9 695-6 697-6 697H0l3-365z'/%3E %3Cpath fill='${props.bgColor ? props.bgColor.replace('#', '%23') : '%23fff'}' d='M0 36c674-99 2051 208 3548 81V-1H0v37z'/%3E %3Cpath fill='%23121215' d='M1016 984s142-647 1162-750c583-59 961 220 1370 295v452z'/%3E %3C/svg%3E")`} : {}}>
      {/* <svg viewBox="0 0 3000 151">
        <path fill="#fff" d="M2036 32c226-4 357 118 521 118S2831 7 2993 3C3163-2-362 3 30 3c244 0 333 157 511 147 177-10 151-81 428-106 146-13 357 61 527 61 229 0 452-71 540-73z"/>
      </svg> */}
      <div className="container">
        <div>
          <h3>{props.title || "Jetzt persönliche Einschätzung einholen"}</h3>
          <p>{props.text || "Wenn Sie sich für Optionen unserer Hilfe interessieren, besprechen wir uns gern mit Ihnen! Vor dem Anruf möchten wir Sie bitten, den Fragebogen in Ihrem Nutzeraccount bereits so weit wie möglich ausgefüllt zu haben, da wir so im Vorhinein recherchieren können. Da es hier nur darum geht, Ihre Situation zu analysieren und Optionen zu erwägen."}</p>
        </div>
        <form onSubmit={submit}>
          <div>
            <label for="#signupEmailInput" style={{display: 'none'}}>E-Mail-Adresse</label>
            <input id="signupEmailInput" type="email" autoComplete="email" placeholder="E-Mail"/>

            <label for="#signupPasswordInput" style={{display: 'none'}}>Passwort</label>
            <input id="signupPasswordInput" type="password" autoComplete="new-password" placeholder="Passwort wählen"/>
            <ButtonBase type="submit">Account erstellen & Weiter</ButtonBase>
          </div>
          <p>Nutzerkonto ist unverbindlich und kostenlos. Leitet Sie direkt zu unserem Fragebogen weiter. Sie klären sich dazu bereit, E-Mails relevant für die Verwaltung Ihres Nutzerkontos zu erhalten.</p>
        </form>
      </div>
    </section>
  );
}

SignUp.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  text: PropTypes.string,
  dark: PropTypes.bool,
  bgColor: PropTypes.string
};

export default connect(({auth}) => ({auth}))(SignUp);
