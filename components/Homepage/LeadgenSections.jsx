import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from '../Image.jsx';
import '../../styles/Homepage/LeadgenSections.scss';

export default function LeadgenSections(props) {
  return(
    <div id="LeadgenSections">
      <section>
        <div className="container">
          <Grid container justify="space-around" spacing={2}>
            <Grid item xs={12} md lg={6}>
              <h2>
                Was macht Blanford anders?<br/>Wir garantieren Resultate.
              </h2>
              <p>Wenn Sie dies lesen, bieten wir entweder bereits eine Garantie für bestimmte zentrale Resultate an oder arbeiten daran, dies zu ermöglichen. Das Agenturmodell lässt Kunden oft ohne das, was sie suchten, von Business Consulting bis Designarbeiten. Wir wollen sicherstellen, dass Sie den Monat mit dem beenden, was sie von uns haben wollten.</p>
            </Grid>
            <Grid item xs={12} md lg={4}>
              <h2>Das Endprodukt ist <br/>Return on Investment.</h2>
              <p style={{lineHeight: 1.4}}>Was unsere Kunden letztendlich interessiert ist ein positiver ROI — deswegen liegt es im Zentrum unserer  Bemühungen. In Ihrem Dashboard indiziert der ”ROI Score” die Rendite von Paid Ads auf Ihre Gesamtausgaben (basierend auf den von Ihnen angegebenen Werten im Dashboard).</p>
            </Grid>
          </Grid>

          <Image name="card.png"/>
        </div>

        <Image name="paint.png" retina className="bg"/>
      </section>

      <section className="container">
        <hr/>
        <h2>Unkompliziert loslegen.</h2>
        <ol>
          <li>E-Mail und Passwort festlegen</li>
          <li>E-Mail bestätigen</li>
          <li>Kurzen Fragebogen ausfüllen</li>
          <li>Termin für Besprechung wählen oder Chat nutzen</li>
        </ol>
      </section>
    </div>
  );
}
