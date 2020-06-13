import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {getRouteByComponent} from '../../Util.js';
import '../../styles/Homepage/ProcessSection.scss';

function ProcessSection(props) {
  return(
    <section id="ProcessSection">
      <div className="container">
        <h3>So funktioniert's</h3>
        <div>{[
          [<svg viewBox="0 0 80.21 102.53"><path fill="#3476d5" d="m 45.504,102.36218 0,-102.09599738 -19.44,0 C 24.192002,10.778172 14.975985,19.130183 0,19.418183 l 0,15.264 22.896,0 0,67.679997 22.608,0"/></svg>, "EVALUATION", "Wir erwägen Möglichkeiten, die Rendite Ihrer Leadgenerierung unter Zuhilfenahme unserer Methodologie zu erhöhen."],
          [<svg viewBox="0 0 80.21 102.53"><path fill="#3476d5" d="m 23.328,40.010183 c -0.575999,-1.871999 -0.72,-4.032002 -0.72,-5.616 0,-9.503991 6.048009,-15.984 15.408,-15.984 8.063992,0 13.968,5.904007 13.968,13.536 0,7.199992 -3.312009,11.808005 -11.808,16.704 l -16.56,9.504 C 5.1840184,68.666172 0.14399984,83.930201 -1.5258788e-8,102.36218 L 74.448,102.36218 l 0,-19.151997 -47.232,0 c 0.863999,-3.455997 3.744004,-6.336003 7.632,-8.64 l 20.16,-11.52 c 13.391987,-7.631993 19.728,-18.576013 19.728,-31.536 0,-18.143982 -14.256022,-33.4080004 -36.72,-33.4080004 -23.039977,0 -37.008,15.8400184 -37.008,33.8400004 0,2.735997 0.2880004,5.904001 0.72,7.488 l 21.6,0.576"/></svg>,
          "WERBEBOTSCHAFT FINDEN", "Wir besprechen die Details und Besonderheiten Ihres Angebots und wie es mit bestehenden Marktsegmenten in Einklang gebracht werden könnte."],
          [
          <svg viewBox="0 0 80.21 102.53"><path fill="#3476d5" d="m 73.152,50.810193 c -4.751995,-5.183994 -11.520009,-8.496001 -20.304,-9.936 l 22.752,-25.92 0,-15.11999958 -70.56,0 0,18.71999958 42.912,0 -20.736,23.472 0,15.408 10.656,0 c 12.527987,0 18.864,4.176009 18.864,12.384 0,4.175996 -1.728003,7.344003 -5.04,9.648 -3.455997,2.303998 -8.064006,3.312 -13.824,3.312 -5.327995,0 -10.512005,-0.720001 -15.552,-2.304 -5.039995,-1.583998 -9.504004,-3.888002 -13.248,-6.768 L 0,91.562193 c 4.7519952,3.455997 10.512007,6.192002 17.424,8.064 6.911993,1.871997 13.824007,2.735997 21.024,2.735997 9.071991,0 16.704006,-1.44 23.04,-4.463997 6.335994,-2.879997 10.944003,-6.912004 14.112,-11.808 3.023997,-4.895995 4.608,-10.368005 4.608,-16.272 0,-7.487992 -2.448005,-13.824005 -7.056,-19.008"/></svg>,
            "TESTING & MANAGEMENT", "Wir führen viele Split-tests durch, um Anzeigen zu identifizieren, welche sich für Ihre Ziele als profitabel herausstellen."
          ],
          [<svg viewBox="0 0 80.21 102.53"><path fill="#3476d5" d="M -8.9645386e-8,80.762183 46.08,80.762183 l 0,21.599997 22.608,0 0,-21.599997 15.12,0 0,-19.296 -15.12,0 0,-61.20000038 -27.792,0 L -8.9645386e-8,57.866183 l 0,22.896 M 46.08,61.466183 l -26.208,0 26.208,-37.296 0,37.296"/></svg>, "KONTINUIERLICHE OPTIMIERUNG", "Wir überwachen alle Anzeigen und deaktivieren solche, welche unter Ihrer Profitabilitäts-Schwelle fallen, erstellen selektiv neue Split-tests und verfeinern Ihre Custom Audiences."]
          ].map((step, index) => (
            <div key={index}>
              {step[0]}
              <div>
                <h4>{step[1]}</h4>
                <p>{step[2]}</p>
              </div>
            </div>
          ))}</div>
        <p className="more">Mehr Informationen über den Arbeitsablauf finden Sie <NavLink to={getRouteByComponent(props.routes, 'FunctionalityOverview').fullPath + '#process'} className="link">hier</NavLink>.</p>
      </div>
    </section>
  );
}

export default connect(({routes}) =>({routes: routes.homepage}))(ProcessSection);
