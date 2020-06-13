import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {ChevronRight, CheckCircleOutline} from '@material-ui/icons';
import Layout from '../components/Homepage/Layout.jsx';
import TopSection from '../components/Homepage/TopSection.jsx';
import LeadgenSections from '../components/Homepage/LeadgenSections.jsx';
import SignUp from '../components/Homepage/SignUp.jsx';
import MazeIcon from '../components/Homepage/icons/Maze.svg';
import EyeIcon from '../components/Homepage/icons/Eye.svg';
import CheckCircleIcon from '../components/Homepage/icons/CheckCircle.svg';
import '../styles/Homepage/Page2.scss';

export default function Page2(props) {
  React.useEffect(() => {
    if(props.location.hash) {
      const element = document.querySelector(props.location.hash);
      if(element) {
        element.scrollIntoView({behavior: 'instant'});
      }
    }
  }, []);

  return(
    <Layout id="Page2">
      <TopSection
        title={<span>AUM Acqusition Program</span>}
        bottomItems={[
          {icon: <MazeIcon/>, label: <p>Erprobte<br/>Prozesse</p>},
          {icon: <EyeIcon/>, label: <p>ROI <span className="long">optimal </span>messen<br/>& <span className="long">jederzeit </span>auslesen</p>},
          {icon: <CheckCircleIcon/>, label: <p>Jede Anzeige von<br/>Ihnen genehmigt</p>}
        ]}
        bottomRight={(
          <SignUp>
            <p>Nehmen Sie sich etwas Zeit für unseren Fragebogen, indem Sie einen unverbindlichen Account erstellen.</p>
            <div>
              <div>
                <label htmlFor="compactValidationDefaultEmail">E-Mail</label>
                <input name="email" className="form-control" id="compactValidationDefaultEmail" autoComplete="email" type="email" required/>
              </div>
              <div>
                <label htmlFor="compactValidationDefault02">Passwort</label>
                <input name="password" className="form-control" autoComplete="new-password" type="password" id="compactValidationDefault02" required/>
              </div>
              <div className="buttonContainer">
                <IconButton type="submit"><ChevronRight/></IconButton>
                <span>Go</span>
              </div>
            </div>
          </SignUp>
        )}
        bgImgName="ppc-bg5.jpg"
      >
        <p>Wir helfen Finanzberatern, die beste Rendite auf deren Werbeausgaben zu machen durch kosteneffiziente online Leadgenerierung.</p>
        <ul>{[
          "Umstellung & Management Ihrer Leadgenerierung zu bewährten Online-Methodologien",
          "Erstellen & Verbessern eines Lead-generierenden Sales Funnels",
          "Genaues Bewusstsein über Ihre Marketing-Effizienz, Rentabilität & ROI",
          "LinkedIn & E-Mail Leadgenerierung",
          "Selektion für relevanteste Leads",
          "Aufmerksamkeit & Interesse aufbauen, vom Unbekannten bis zum Kunden",
          "Überlassen Sie uns Advertising & technisches Management, arbeiten Sie nur an unersetzlichen Aufgaben"
          ].map((item, index) => (
            <li key={index}>
              <CheckCircleOutline/>
              {item}
            </li>
          ))}</ul>
      </TopSection>

      <LeadgenSections/>
    </Layout>
  );
}
