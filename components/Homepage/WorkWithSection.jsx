import React from 'react';
import Image from '../Image.jsx';
import '../../styles/Homepage/WorkWithSection.scss';

export default function WorkWithSection() {
  return(
    <section className="work-with">
      <div className="container">
        <h3>Ein Grund mit Blanford zu arbeiten?<br/>Wir geben ihnen drei.</h3>
        <div className="row justify-content-between">
          <div className="col-md-3">
            <p>Wir finden die vielversprechendste Lösung für <i>Ihr </i> Gewerbe in der Marketing-Umgebung.</p>
            <div className="imgContainer">
              <Image name="reason-1.png" lazy/>
            </div>
          </div>
          <div className="col-md-3">
            <p>Sie erhalten so viele Informationen, Kontrolle & Unterstützung wie Sie möchten, direkt in Ihrem Browser.</p>
            <div className="imgContainer">
              <Image name="reason-3.png" lazy/>
            </div>
          </div>
          <div className="col-md-3">
            <p>Wir sind auf die Maximierung  Ihres ROI fokussiert, überwachen Rentabilität & Sie können jederzeit monatlich kündigen.</p>
            <div className="imgContainer">
              <Image name="reason-2.png" lazy/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
