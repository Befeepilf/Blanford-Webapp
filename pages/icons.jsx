import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Layout from '../components/Homepage/Layout.jsx';
import '../styles/Homepage/Legal.scss';

const useStyles = makeStyles({
  item: {
    marginBottom: 35,
    '& p': {
      marginBottom: '0px !important'
    }
  }
});
export default function icons(props) {
  const np = " from the Noun Project";
  const classes = useStyles();
  return(
    <Layout id="IconBibliography">
      <section className="legal">
        <div className="container">
          <h2>Icon Bibliography</h2>
          {[
            ["Check mark within a circle", "done by Vipul Malhotra" + np, 'https://thenounproject.com/search/?q=done&i=1026756'],
            ["Eye", "Eye by Abe Garcia" + np, 'https://thenounproject.com/search/?q=eye&i=1655'],
            ["Laptop outline", "Laptop by Lee Hills" + np, 'https://thenounproject.com/search/?q=laptop&i=932746'],
            ["Pulse monitor", "Fitness by Rediffusion" + np, 'https://thenounproject.com/search/?q=fitness&i=149855'],
            ["Omnipresence", "Omnipresence by Yazmin Perez Aviles" + np, 'https://thenounproject.com/term/omnipresence/56392'],
            ["Piggy Bank", "Piggy Bank by Becris" + np, 'https://thenounproject.com/term/piggy-bank/1468096'],
            ["Process", "process by Christopher Holm-Hansen" + np, 'https://thenounproject.com/term/process/147184'],
            ["Profits", "profits by nauraicon" + np, 'https://thenounproject.com/search/?q=profit&i=2207581'],
            ["Euro", "Euro by StoneHub" + np, 'https://thenounproject.com/term/euro/925214'],
            ["Star", "Star by ibrandify" + np, 'https://thenounproject.com/search/?q=star&i=2235552']
            ].map((icon, index) => (
              <div key={index} className={classes.item}>
                <strong>{icon[0]}</strong>
                <p>{icon[1]}</p>
                <a className="link" href={icon[2]} target="_blank">{icon[2]}</a>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
}
