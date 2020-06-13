import React from 'react';
import {connect} from 'react-redux';
import Layout from '../../components/Dashboard/Layout.jsx';
import ThreadsOverview from '../../components/ThreadsOverview.jsx';


export default connect(({firestore, profile, channels}) => ({
  firestore,
  userId: profile.user_id,
  channels
}))(props => (
  <Layout id="Threads">
    <ThreadsOverview userId={props.userId} sender={props.userId} channels={props.channels} style={{paddingBottom: 0}}/>
  </Layout>
));
