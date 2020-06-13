import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../components/Homepage/Layout.jsx';
import StarIcon from '../components/Homepage/icons/Star.svg';
import NoMoneyIcon from '../components/Homepage/icons/NoMoney.svg';
import ProfitsIcon from '../components/Homepage/icons/Profits.svg';
import Banner from '../components/Homepage/Banner.jsx';
import SignUp from '../components/Homepage/SignUp.jsx';
import '../styles/Homepage/Referral-BetaProgram.scss';

function BetaProgram(props) {
  const [formState, setFormState] = React.useState({});

  const classes = makeStyles({
    root: {
      backgroundColor: '#000'
    },
    buttonContainer: {
      display: formState.email && formState.password ? 'block' : 'none',
      maxWidth: 280,
      marginLeft: 21
    },
    benefits: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 70,
      textAlign: 'center',
      '& > *': {
        flex: 1,
        '&:nth-child(2)': {
          padding: [[0, 154]],
          '& > :last-child': {
            marginTop: 21,
            opacity: 0.5
          }
        }
      },
      '& svg': {
        display: 'block',
        width: 56,
        height: 56,
        margin: [[0, 'auto']],
        fill: '#fff'
      },
      '& h3': {
        margin: [[21, 0, 14, 0]],
        fontSize: '1.25rem',
        fontWeight: 500
      }
    }
  })();

  function onInputChange(event) {
    setFormState(Object.assign({}, formState, {[event.target.name]: event.target.value.length}));
  }

  return(
    <Layout id="BetaProgram" className={classes.root}>
      <Banner title="Beta Program" bgImgName="beta.jpg">
        <p>Wir arbeiten mit Ihnen an Ihrer Leadgenerierung. Unentgeltlich.</p>
        <SignUp>
          <div>
            <input type="email" autoComplete="email" placeholder="E-Mail" name="email" required onChange={onInputChange}/>
            <input type="password" autoComplete="new-password" placeholder="Passwort wählen" name="password" required onChange={onInputChange}/>
          </div>
          <div className={classes.buttonContainer}>
            <Button type="submit">Account erstellen & Weiter</Button>
            <small>Unverbindlich und kostenlos. Ihre Daten werden in Übereinstimmung mit unserer Datenschutzerklärung verarbeitet. Leitet Sie zu unserem Fragebogen weiter.</small>
          </div>
        </SignUp>
      </Banner>

      <div className="container">
        <div className={classes.benefits}>
          <div>
            <StarIcon/>
            <h3>Vollwertige Mitgliedschaft</h3>
            <p>Wir sind so motiviert wie Sie, den Prozess zu einem Erfolg zu machen.</p>
          </div>
          <div>
            <NoMoneyIcon/>
            <h3>Unverbindlich & unentgeltlich</h3>
            <p>Keine Angabe einer Zahlungsmethode in Ihrem Blanford-Account nötig.</p>
            <p>Aufwenden von Werbeausgaben jedoch vorausgesetzt.</p>
          </div>
          <div>
            <ProfitsIcon/>
            <h3>Potential für Revolution</h3>
            <p>Für Ihr Investment von Zeit und Werbeausgaben ist kein signifikanter Verlust zu erwarten, obgleich die Möglichkeit besteht Ihre Leadgenerierung zu revolutionieren.</p>
          </div>
        </div>

        <p>
          <strong>NEU</strong> — Nun können Sie  mit uns einen oder mehrere Monate unentgeltlich daran arbeiten, Ihren Marketing-ROI zu verbessern. Wir hängen von solchen Partnerschaften ab, um unsere Methodologie verbessern zu können.
          <br/>
          <br/>
          Wir hoffen hierin eine Zusammenarbeit mit hohem Aufwärtspotential und geringem Risiko für Verlust zu bieten.
        </p>

        <h3>Bewerben</h3>
        <p>
          Zum Loslegen benötigen Sie ein kostenloses Nutzerkonto, welches Sie mit dem Formular am Anfang dieser Seite erstellen können. Wir hoffen, dass die nachfolgenden Anweisungen selbsterklärend sind. Ihr Nutzerkonto enthält Ihren Chatkontakt zu uns, einen Fragebogen, welchen wir für unsere erste Einschätzung benötigen und relevante Einstellungen und Wegweiser.
        </p>

        <h3>Zweck & Vermeidung von Verlusten</h3>
        <p>
          Die einzige Möglichkeit, verlässliche Prozesse entwickeln zu können, besteht darin, Methodologien der Leadgenerierung unentgeltlich im reellen Marketingumfeld auf die Probe zu stellen. Kein Werbetreibender weiß den Erfolg einer bestimmten Positionierung oder Methode genau vorauszusagen, aber gute Advertiser verstehen es, Testläufe wohlbedacht aufzubauen und daraus die richtigen Schlüsse zu ziehen.
          <br/>
          <br/>
          Eine wissenschaftliche Herangehensweise ist ebenfalls wichtig, um Ihnen Verluste zu ersparen. Hat der Leadgen-Prozess eine letztendlich negative Rendite, lässt sich dies relativ schnell herausfinden und anhalten, bis notwendige Änderungen vorgenommen wurden. Ebenfalls können Sie Mangel an Rentabilität leicht anhand der Statistiken in Ihrem Nutzeraccount ermitteln.
          <br/>
          <br/>
          Unser Versprechen an Mitglieder des Beta Programs ist, dass wir nur jene dazu einladen, dessen Marketing mit sehr hoher Wahrscheinlichkeit zu einer Verbesserung in Rendite zu verhelfen ist.
        </p>

        <h3>Aufwendung von Werbebudget</h3>
        <p>
          Es ist wichtig zu verstehen, dass unsere Advertising Methodologien bezahlte Plattformen involvieren, für welche ein Werbebudget aufgewendet werden muss. Obgleich Sie also nichts an uns zahlen, wird die von Ihnen hinterlegte Zahlungsmethode bei Plattformen wie Facebook, ClickFunnels oder Perfect Audiences belastet.
        </p>

        <h3>10% Ersparnis für erfolgreiche Beta Program Absolventen</h3>
        <p>
          Sollten Sie sich nach erfolgreichem Absolvieren des Programs zwecks Aufrechterhaltung Ihres positiven Leadgen ROIs zur weiteren Zusammenarbeit mit uns entscheiden, erhalten Sie eine 10% Reduktion Ihrer monatlichen Servicegebühr als Anerkennung.
        </p>

        <br/>
        <br/>
        <br/>

        <p>
          Wir freuen uns auf Sie!
          <br/>
          <br/>
          — Blanford Team
        </p>
      </div>
    </Layout>
  );
}

export default connect(({auth, profile}) => ({auth, profile}))(BetaProgram);
