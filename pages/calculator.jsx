import React from 'react';
import Layout from '../components/Homepage/Layout.jsx';
import CalculatorSection from '../components/CalcSection.jsx';

export default function Calculator() {
  return(
    <Layout id="Calculator" style={{paddingTop: 70}}>
      <CalculatorSection padding/>
    </Layout>
  );
}
