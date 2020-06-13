import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../../components/Dashboard/Layout.jsx';
import YouForm from '../../components/YouForm.jsx';
import GradientButton from '../../components/GradientButton.jsx';
import {patchUserMetadata} from '../../API.js';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    margin: '0 auto'
  },
  title: {
    fontFamily: '"ITC Cheltenham W03 Book", serif',
    fontSize: '2.25rem',
    lineHeight: 1
  },
  subtitle: {
    maxWidth: '98ch',
    marginBottom: 21,
    fontSize: '0.9375rem',
    lineHeight: 1.5,
    color: theme.palette.type === 'dark' ? theme.palette.text.secondary : '#747474'
  },
  line: {
    width: '6ch',
    height: 3,
    margin: [[14, 0, 28, 0]],
    fontSize: '2.25rem',
    backgroundColor: '#cbcbcb'
  },
  stateContainer: {
    flex: 1,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    position: 'absolute',
    right: 0,
    '&.marginTop': {
      marginTop: 70
    }
  }
}));

let savingTimeout;

function You(props) {
  const [savingState, setSavingState] = React.useState(null);
  const [disableSaveButton, setDisableSaveButton] = React.useState(true);
  const [newData, setNewData] = React.useState({});
  const [newAnswers, setNewAnswers] = React.useState({});

  React.useEffect(() => () => {
    clearTimeout(savingTimeout);
  }, []);

  function handleDataChange(key, event) {
    props.dispatch({type: 'SET', data: {profile: {user_metadata: {[key]: event.target.value}}}});
    setNewData(Object.assign({}, newData, {[key]: event.target.value}));
    handleChange();
  }

  function handleAnswerChange(id, event) {
    props.dispatch({type: 'SET', data: {answers: props.answers.map(a => Object.assign({}, a, {answer: a.id == id ? event.target.value : a.answer}))}});
    setNewAnswers(Object.assign({}, newAnswers, {[id]: event.target.value}));
    handleChange();
  }

  function handleChange() {
    setSavingState(null);
    setDisableSaveButton(false);

    if(!savingTimeout) {
      savingTimeout = setTimeout(() => {
        if(!disableSaveButton) {
          save(false);
        }
        savingTimeout = null;
      }, 15000);
    }
  }

  function resetSavingState() {
    if(savingState === 'error') {
      setSavingState(null);
    }
  }

  function save(redirect) {
    setSavingState('loading');

    const thirtyPercent = Object.keys(props.answers).length / 19 > 0.3;
    const promises = [];

    if(Object.keys(newData).length) {
      promises.push(new Promise((resolve, reject) => {
        patchUserMetadata(newData, (error, result) => {
          if(error) {
            reject();
          }
          else {
            resolve();
          }
        });
      }));
    }

    if(Object.keys(newAnswers).length) {
      promises.push(new Promise((resolve, reject) => {
        if(props.firestore) {
          const batch = props.firestore.batch();
          Object.keys(newAnswers).forEach((id) => {
            batch.set(props.firestore.doc(`users/${props.profile.user_id}/answers/${id}`), {answer: newAnswers[id]})
          });
          batch.commit().then(resolve).catch(reject);
        }
        else {
          reject();
        }
      }));
    }

    Promise.all(promises).then(() => {
      setSavingState('success');
      if(redirect && !props.appointments.length && props.answers && thirtyPercent) {
        Router.push('/d/calendar');
      }
    }).catch((error) => {
      console.error(error);
      setSavingState('error');
    });
  }


  const answers = {};
  for(let i = 0; i < 19; i++) {
    const answer = (props.answers || []).find(a => a.id == i); // a.id is string, i is integer; DO NOT use triple equals!
    answers[i] = {value: answer ? answer.answer : "", onChange: event => {handleAnswerChange(i, event)}};
  }

  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Typography component="h2" className={classes.title}>Ein paar Fragen zu Ihrer Situation</Typography>
      <GradientButton
        onClick={() => {save(true)}}
        onStateReset={resetSavingState}
        state={savingState}
        disabled={disableSaveButton}
        ButtonProps={{className: classes.saveButton}}
      >{props.appointments.length || (props.answers && Object.keys(props.answers).length / 19 < 0.3) ? "Speichern" : "Speichern & Weiter"}</GradientButton>
      <hr className={classes.line}/>
      <Typography className={classes.subtitle}>Bitte nehmen Sie sich etwas Zeit für diese Fragen, damit wir Ihr Gewerbe und Ihre Ziele besser verstehen können. Sie können sich jederzeit später wieder einloggen um das Formular zu vervollständigen. Je besser Sie diese Fragen beantworten, desto besser können wir uns auf die Erfordernisse für Ihren Erfolg einstellen.</Typography>

      {props.firestore === undefined || (props.firestore && !props.answers) ?
        <div className={classes.stateContainer}>
          <CircularProgress/>
        </div>
      :
        !props.answers ?
          <div className={classes.stateContainer}>
            <Typography align="center">Der Fragebogen konnte nicht geladen werden.</Typography>
          </div>
        :
        <React.Fragment>
          <YouForm data={{
            name: {value: props.profile.user_metadata.name, onChange: (event) => {handleDataChange('name', event)}},
            jobtitle: {value: props.profile.user_metadata.jobtitle, onChange: (event) => {handleDataChange('jobtitle', event)}},
            plz: {value: props.profile.user_metadata.plz, onChange: (event) => {handleDataChange('plz', event)}}
          }} answers={answers}/>
          <GradientButton
            onClick={() => {save(true)}}
            onStateReset={resetSavingState}
            state={savingState}
            disabled={disableSaveButton}
            ButtonProps={{className: classNames(classes.saveButton, 'marginTop')}}
          >{props.appointments.length ? "Speichern" : "Speichern & Weiter"}</GradientButton>
        </React.Fragment>}
    </div>
  );
}

export default connect(({auth, firestore, profile, answers, appointments}) => ({auth, firestore, profile, answers, appointments: appointments || []}))(props => (
  <Layout id="You"><You {...props}/></Layout>
));
