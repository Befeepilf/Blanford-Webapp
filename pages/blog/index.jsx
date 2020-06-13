import React from 'react';
import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../../components/Homepage/Layout.jsx';
import Banner from '../../components/Homepage/Banner.jsx';
import ArticlePreview from '../../components/Homepage/ArticlePreview.jsx';
import '../../styles/Homepage/Blog.scss';
import '../../styles/Homepage/BlogGrid.scss';


function Blog(props) {
  return(
    <Layout id="Blog">
      <Banner title="Blog" bgImgName="blog-bg.jpg" dark/>
      {props.blogArticles ? (
        <div className="container blogGrid">
          {props.blogArticles.map((article, index) => <ArticlePreview {...article} key={index}/>)}
        </div>
      ) : (
        <div className="loadingContainer">
          <CircularProgress/>
        </div>
      )}
    </Layout>
  );
}

export default connect(({blogArticles}) => ({blogArticles}))(Blog);
