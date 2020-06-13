import React from 'react';
import Layout from '../components/Homepage/Layout.jsx';
import HomeUpperSections from '../components/Homepage/HomeUpperSections.jsx';
import LeadgenSections from '../components/Homepage/LeadgenSections.jsx';

export default function HomeLeadgenCombo(props) {
  return(
    <Layout id="HomepageLeadgenCombo">
      <HomeUpperSections/>
      <LeadgenSections/>
    </Layout>
  );
}
