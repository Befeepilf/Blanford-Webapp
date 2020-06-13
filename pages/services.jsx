import React from 'react';
import Layout from '../components/Homepage/Layout.jsx';
import ServicesOverview from '../components/ServicesOverview.jsx';
import '../styles/Homepage/Services.scss';


export default function Services(props) {
  return(
    <Layout id="Services">
      <div className="container">
        <h2>Übersicht</h2>
        <p className="super">SERVICE PRODUKTE</p>
        <ServicesOverview/>
      </div>
    </Layout>
  );
}
