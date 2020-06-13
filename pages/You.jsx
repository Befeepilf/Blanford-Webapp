import React from 'react';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import Layout from '../components/Homepage/Layout.jsx';
import YouForm from '../components/YouForm.jsx';

const useStyles = makeStyles({
  root: {
    paddingTop: 70,
    paddingBottom: 140
  },
  h2: {
    marginBottom: 70,
    fontFamily: ['ITC Cheltenham W03 Book', 'serif'],
    fontSize: '3rem',
    fontWeight: 500,
    color: '#000'
  }
});
export default function You(props) {
  const [data, setData] = React.useState({name: "", jobtitle: "", plz: ""});
  const [answers, setAnswers] = React.useState((() => {
    const defaultAnswers = {};
    for(let i = 0; i < 19; i++) {
      defaultAnswers[i] = {value: "", onChange: (event) => {handleAnswerChange(i, event)}};
    }
    return defaultAnswers;
  })());

  function handleDataChange(id, event) {
    setData(Object.assign({}, data, {[id]: event.target.value}));
  }

  function handleAnswerChange(id, event) {
    setAnswers(Object.assign({}, answers, {[id]: Object.assign({}, answers[id], {value: event.target.value})}));
  }


  const classes = useStyles();
  return(
    <Layout id="You" className={classNames(classes.root, 'container')}>
      <h2 className={classes.h2}>Fragebogen</h2>
      <YouForm data={{
        name: {value: data.name, onChange: (event) => {handleDataChange('name', event)}},
        jobtitle: {value: data.jobtitle, onChange: (event) => {handleDataChange('jobtitle', event)}},
        plz: {value: data.plz, onChange: (event) => {handleDataChange('plz', event)}}
      }} answers={answers}/>
  </Layout>
  );
}
