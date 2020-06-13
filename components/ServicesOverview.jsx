import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Image from './Image.jsx';
import '../styles/ServicesOverview.scss';

const useStyles = makeStyles(theme => ({
  root: {
    '& h3, & h4, & h5': {
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#303030'
    },
    '& h3 + p': {
      color: theme.palette.text.primary
    },
    '& p': {
      color: theme.palette.type === 'dark' ? theme.palette.text.secondary : '#747474'
    },
    '& li p': {
      color: theme.palette.type === 'dark' ? theme.palette.text.secondary : null
    }
  }
}));
export default function ServicesOverview(props) {
  const [activeView, setActiveView] = React.useState(1);

  const classes = useStyles();
  return(
    <div id="ServicesOverview" className={classes.root}>
      <nav>
        <ButtonBase className={classNames({active: activeView})} onClick={() => {setActiveView(1)}}>
          <p>AUM Acqusition</p>
          <p className="brand">BLANFORD</p>
          <Image name="services-leadgen.jpg" className="bg"/>
        </ButtonBase>

        <ButtonBase disabled classes={{disabled: 'disabled'}} className={classNames({active: !activeView})} onClick={() => {setActiveView(0)}}>
          <p>GOOGLE ACCELERATOR</p>
          <p className="brand">BLANFORD</p>
          <Image name="services-google.jpg" className="bg"/>
        </ButtonBase>
      </nav>

      {activeView ? (
        <div className="content">
          <h3>Leadgenerierung durch Generieren & Auffangen effizienten Traffics</h3>
          <p>Social-Media-Advertising ist unser primärer Service geworden, da es sich als die wertvollste Dienstleistung herausstellte. Das Ziel besteht essentiell in Effizienz; für die geringsten Kosten Interessenten für Ihr Gewerbe zu gewinnen. Dies erfordert drei hauptsächliche Bereiche von Expertise: Verlässliche Recherche über Markt und Kunden, Erstellung eines Ad Creatives welches Interesse weckt und genaue Vertrautheit mit Facebooks algorithmischen Eigenheiten zum Erreichen eines geringen CPC-Wertes.</p>
          <h4>INVOLVIERTE LEISTUNGEN</h4>
          <ul>
            <li>
              <h5>Werbekonto</h5>
              <p>Vorteilhaftes Etablieren eines Ad Accounts</p>
            </li>
            <li>
              <h5>Profil Ihres idealen Kunden</h5>
              <p>Durchdenken und Charakterisieren Ihrer Zielgruppe zum verbesserten Ansprechen dieser Gruppe</p>
            </li>
            <li>
              <h5>Marktrecherche</h5>
              <p>Welche Interessen verfolgt Ihre Zielgruppe? Welche Vorbehalte hat sie? Wie vielen ähnlichen Werbeanzeigen ist sie schon begegnet, was denkt & weiß sie also über Angebote wie Ihres?</p>
            </li>
            <li>
              <h5>Split-Test Erstellung & Auswertung</h5>
              <p>Erstellung ansprechender Anzeigen basierend auf den besten Vermutungen der Markt- und Kundenrecherche in vielen verschiedenen Targeting-Variationen, algorithmisches Deaktivieren der ineffektiven Anzeigen und Skalieren der effektiven.</p>
            </li>
            <li>
              <h5>Strategisches Management</h5>
              <p>Zusammenstellung der Anzeigen in Ihrer Budgetierung, Auslieferung und Anzeigentyp in der Weise des höchsten Nutzens.</p>
            </li>
            <li>
              <h5>Kontinuierliches Management</h5>
              <p>Auffangen abfallend-leistender Anzeigensets, Deaktivieren von Anzeigensets/Anzeigen/Kampagnen außerhalb Ihrer Rentabilitäts-Schwellenwerte und Erprobung neuer Marktsegmente.</p>
            </li>
            <li>
              <h5>Traffic Conversion</h5>
              <p>Erstellung von Landing Pages, welche Anzeigen Traffic in qualitativ hochwertige Leads umwandeln und Interessenten für zukünftiges Re-marketing erfassen.</p>
            </li>
            <li>
              <h5>Re-Marketing & Back-end Marketing</h5>
              <p>Erhöhung der Konversionsrate durch E-Mail Marketing (nach Absprache) und optimierten Re-marketing.</p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="content">
          <h3>Leadgenerierung durch verbesserte Präsenz in Google Search</h3>
        <p>Ihre Google-Präsenz zu optimieren ist unsere sekundäre Dienstleistung. Falls Verbesserungspotential vorhanden ist und es wirtschaftlich sinnvoll wäre, erschöpfen wir einige Maßnahmen, damit Sie von mehr Kunden gefunden und erwägt werden. Dies ist besonders sinnvoll für Gewerbe, nach denen häufig nicht spezifisch gesucht wird; im Fall von Dachdeckern beispielsweise, kommen Suchen für “Dachdecker Musterstadt” häufiger vor als Suchen für “Dachdecker Mustermann”.</p>
        <h4>INVOLVIERTE LEISTUNGEN</h4>
        <ul>
          <li>
            <h5>Google "My Business"</h5>
            <p>Falls noch nicht vorhanden, kostenlose Komplettierung Ihres Gewerbeeintrags in Google Maps.</p>
          </li>
          <li>
            <h5>Entwerfen einer Strategie</h5>
            <p>Wählen der optimalen Maßnahmen für Ihre Ziele und Situationen</p>
          </li>
          <li>
            <h5>Keyword & Wettbewerber Recherche</h5>
            <p>Isolieren produktivster Keywords und bester Praktiken von Wettbewerbern</p>
          </li>
          <li>
            <h5>On-page Optimization</h5>
            <p>Vornehmen von Änderungen an Ihrer Website selbst zu SEO-Zwecken</p>
          </li>
          <li>
            <h5>Blogposts</h5>
            <p>Evtl. Integration einer Blog-Funktion und Erstellung von Blogposts zu SEO-Zwecken</p>
          </li>
          <li>
            <h5>Google Ads</h5>
            <p>Erstellen & Optimieren von Google Ads und Landing Pages</p>
          </li>
          <li>
            <h5>Linkbuilding</h5>
            <p>Herstellen von Backlinks zu Ihrer Seite</p>
          </li>
        </ul>
        </div>
      )}
    </div>
  );
}
