import React from 'react';
import Layout from '../components/Homepage/Layout.jsx';
import Calendar from '../components/Calendar.jsx';

export default function Appointment() {
  return(
    <Layout>
      <div className="container" style={{paddingTop: 70, paddingBottom: 112}}>
        <Calendar/>
      </div>
    </Layout>
  )
}
