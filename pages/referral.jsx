import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Layout from '../components/Homepage/Layout.jsx';
import GradientButton from '../components/GradientButton.jsx';
import Banner from '../components/Homepage/Banner.jsx';
import CopyIcon from '../components/icons/Copy.jsx';
const copy = require('clipboard-copy');
import '../styles/Homepage/Referral-BetaProgram.scss';


const useStyles = makeStyles({
  buttonLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8125rem',
    '& svg': {
      marginLeft: 14,
      fontSize: '1.125rem',
      color: '#fff'
    }
  }
});
function Referral(props) {
  const [showReferral, setShowReferral] = React.useState(false);

  function onButtonClick() {
    if(showReferral) {
      copy(props.referral).then(() => {
        props.dispatch({type: 'SET', data: {notification: {message: "Der Referral Code wurde in die Zwischenablage kopiert.", duration: 3000}}});
      });
    }
    else {
      setShowReferral(true);
    }
  }


  const classes = useStyles();
  return(
    <Layout id="Referral">
      <Banner title="Referral Program" bgImgName="referral2.jpg">
        {props.referral && props.stripeCustomer && props.stripeCustomer.subscriptions.total_count ? (
          <GradientButton classes={{label: classes.buttonLabel}} onClick={onButtonClick}>{showReferral ? [
            props.referral,
              <CopyIcon key={1}/>
          ] : "Wie lautet mein Code?"}</GradientButton>
        ) : null}
      </Banner>

      <div className="container">
        <p>Falls Sie als Blanford-Kunde einen Kollegen oder Bekannten einladen möchten,  gibt es nun einen einfachen Weg, hierfür mit zwei Monaten kostenlosem Service belohnt zu werden, wenn die eingeladene Person ein Kunde wird.</p>

        <h3>Ihr Referral Code</h3>
        <p>Sie benötigen lediglich Ihren einzigen Code für alle Referrals. Sie finden ihn in Ihrem Nutzeraccount unter [Gewerbename] oder "Account" > Einstellungen > Referral Code.</p>

        <h3>Gutwilligkeit</h3>
        <p>
          Das Nutzen Ihres Codes erfordert Gutwilligkeit. Um klar zu sein, Kommerzialsieren, Werben, Publizieren, Massenverteilung, Verkaufen oder Bezahlen für das Benutzen von Referral Codes ist nicht gestattet und solche Codes werden nicht gewürdigt. Wir können nicht jede unlautere Nutzung detaillieren, jedoch versprechen wir fair und vernünftg in unserem Urteil zu sein.
          <br/>
          <br/>
          Nicht OK:
        </p>
        <ul>
          <li>Werbung</li>
          <li>Spam</li>
          <li>Fehlleitendes</li>
          <li>Social Media Bios</li>
          <li>Bezahlen oder Bieten von Anreizen für das Nutzen Ihres Codes</li>
        </ul>
        <br/>
        <p>OK:</p>
        <ul>
          <li>YouTube-Kanäle</li>
          <li>Direktes Social Media Teilen (Direct Messaging)</li>
        </ul>

        <h3>Zukünftige Änderungen</h3>
        <p>Wir müssen uns das Recht vorbehalten, genannte Regelungen in Zukunft zu ändern. In einem solchen Fall würden wir alle Nutzer in Kenntnis setzen und alle Gutschriften so weit wie möglich würdigen.</p>
      </div>
    </Layout>
  );
}

export default connect(({profile, stripeCustomer}) => ({referral: profile.app_metadata.referral, stripeCustomer}))(Referral);
