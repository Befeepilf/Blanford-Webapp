import React from 'react';
import Layout from '../components/Homepage/Layout.jsx';
import '../styles/Homepage/Legal.scss';

export default function(props) {
  return(
    <Layout id="SiteNotice">
      <section className="legal">
        <div className="container">
          <h2>Impressum</h2>
          <address>
            Blue Logan Unternehmergesellschaft (haftungsbeschränkt)
            <br/>
            Otterweg 56,
            <br/>
            D-26123 Oldenburg
            <br/>
            <br/>
            Geschäftsführer: Jakob Jaworski
            <br/>
            <br/>
            E-Mail: contact@blue-logan.com
            <br/>
            <br/>
          </address>
          <p>
            Registergericht Oldenburg (Oldenburg)
            <br/>
            Registernummer: HRB 213130
            <br/>
            Steuernummer: 64/214/02341
            <br/>
            Einlage: EUR 500,00
          </p>
        </div>
      </section>
    </Layout>
  );
}
