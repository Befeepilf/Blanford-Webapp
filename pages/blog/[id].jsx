import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../../components/Homepage/Layout.jsx';
import Image from '../../components/Image.jsx';
import Banner from '../../components/Homepage/Banner.jsx';
import {articleContentToHTML} from '../../Util.js';
import '../../styles/Homepage/Article.scss';


function Article(props) {
  const router = useRouter();
  const article = (props.blogArticles || []).find(({id}) => id === router.query.id);

  return(
    <Layout id="Article" className={classNames({loading: !article})}>
      {/*<Helmet title={this.state.title} meta={[{name: 'description', content: this.state.content ? this.state.content[0].content: ""}]}/>*/}

      {article ?
        <React.Fragment>
          <Banner title={article.title} bgImgName={article.imgName} dark/>

          <div className="container">
            <time dateTime={format(article.timestamp, 'yyyy-MM-dd')}>{format(article.timestamp, 'LLLL dd, y', {locale: de})}</time>
            {articleContentToHTML(article.content)}
          </div>
        </React.Fragment>
      :
      <div className="loadingContainer">
        <CircularProgress/>
      </div>}
    </Layout>
  );
}

export default connect(({blogArticles}) => ({blogArticles}))(Article);
