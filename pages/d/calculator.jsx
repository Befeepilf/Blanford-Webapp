import React from 'react';
import Layout from '../../components/Dashboard/Layout.jsx';
import CalcSection from '../../components/CalcSection.jsx';

export default function Calculator(props){
  return(
    <Layout id="Calculator">
      <CalcSection dashboard/>
    </Layout>
  );
}
