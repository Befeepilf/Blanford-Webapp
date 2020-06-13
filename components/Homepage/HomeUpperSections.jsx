import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import Image from '../Image.jsx';
import SignUp from './SignUp.jsx';
import Brain from './icons/Brain.svg';
import ColorfulDashboard from './icons/ColorfulDashboard.svg';
import GoogleIcon from './icons/Google.svg';
import '../../styles/Homepage/HomeUpperSections.scss';

const useStyles = makeStyles(theme => ({
  firstLeft: {
    paddingTop: 42,
    paddingBottom: 35
  },
  brain: {
    width: 35
  },
  signUpOr: {
    maxWidth: 420,
    margin: [[21, 'auto', 28, 'auto']],
    '& p': {
      margin: [[0, 10]],
      fontSize: '1rem',
      color: '#575757'
    },
    '& hr': {
      flex: 1,
      height: 0,
      border: '2px solid #efefef'
    }
  }
}));

function HomeUpperSections(props) {
  const fbButton = React.createRef();

  React.useEffect(() => {
    console.log(fbButton.current);
  }, []);

  const classes = useStyles();
  return(
    <div id="HomeUpperSections">
      <section className="container">
        <Grid container>
          <Grid item sm={12} md={4} className={classes.firstLeft}>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <Brain className={classes.brain}/>
              </Grid>
              <Grid item>
                <h2>New AUM</h2>
              </Grid>
            </Grid>
            <h3>Superkräfte für Berater</h3>
            <p>Realisieren Sie konstantere Kundenakquise und angenehmere Arbeitsprozesse durch unser Programm aus mehreren optionalen Komponenten (Selbstbildung, IT-Hilfe, Done-With-You Ads & persönlicher Support).</p>
          </Grid>

          <Grid item sm={12} md={8}>
            <ColorfulDashboard/>
          </Grid>
        </Grid>
      </section>

      <section>
        <div className="container">
          {[
            ["Zuverlässigerer \"Lead-Flow\"", "Da nicht nur Qualität und Quantität zählen, sondern auch Kontinuität, ist ein stabiler, widerholbarer Ansatz wichtig."],
            ["ROI & Überblick", "Verstehen Sie Ihr Marketing genau und überwachen Sie die Faktoren, die es beeinflussen."],
            ["Geringere Kosten pro Lead", "Wer durch eine gänzlich organische, kostenneutrale Herangehensweise genügend relevante Leads erzielt, macht mit Leichtigkeit mehr Profit als in Kombination mit bezahltem Werbeaufwand."],
            ["Zeiteffektiver arbeiten", "Verschwenden Sie weniger Zeit mit unrentable Leadgenerierung."]
          ].map((tile, index) => (
            <div key={index}>
              <Image name={`home-tiles-${index}.jpg`} className="bg"/>
              <h3>{tile[0]}</h3>
              <p>{tile[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2>Aktivieren Sie Blanford mit einem unverbindlichen Nutzerkonto um sich umzuschauen, Fragen zu stellen oder Beratung zu erhalten.</h2>
        <p>Wenn Sie sich für Optionen unserer Hilfe interessieren, besprechen wir uns gern mit Ihnen! Vorher möchten wir Sie um ein paar Rahmeninformationen bitten. Sie werden zu einem kurzen Questionnaire weitergeleitet, welchen Sie jederzeit verlassen können.</p>

        <Grid container justify="center" spacing={3}>
          <Grid item>
            <Button className="fb-login" onClick={() => {props.auth.webauth.authorize({connection: 'facebook'})}}>
              <FacebookIcon/>
              Weiter mit Facebook
            </Button>
          </Grid>
          <Grid item>
            <Button className="google-login" onClick={() => {props.auth.webauth.authorize({connection: 'google-oauth2'})}}>
              <GoogleIcon/>
              Weiter mit Google
            </Button>
          </Grid>
        </Grid>

        <Grid container alignItems="center" className={classes.signUpOr}>
          <hr/>
          <p>ODER</p>
          <hr/>
        </Grid>

        <SignUp>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <input type="email" autoComplete="email" placeholder="E-Mail-Adresse" name="email" required/>
            </Grid>
            <Grid item>
              <input type="password" autoComplete="new-password" placeholder="Passwort wählen" name="password" required/>
            </Grid>
            <Grid item>
              <Button type="submit">Weiter</Button>
            </Grid>
            <Grid item>
              <small>Nutzerkonto ist unverbindlich und kostenlos. Sie klären sich dazu bereit, E-Mails relevant für die Verwaltung Ihres Nutzerkontos zu erhalten.</small>
            </Grid>
          </Grid>
        </SignUp>
      </section>
    </div>
  );
}


export default connect(({auth}) => ({auth}))(HomeUpperSections);
