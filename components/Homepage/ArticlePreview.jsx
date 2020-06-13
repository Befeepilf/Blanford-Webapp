import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import Link from 'next/link';
import ButtonBase from '@material-ui/core/ButtonBase';
import {getRouteByComponent} from '../../Util.js';
import Image from '../Image.jsx';

const NavLinkForButton = React.forwardRef((props, ref) => <div><Link href={props.href}><a {...Object.assign({}, props, {href: undefined})}/></Link></div>);
const useStyles = makeStyles({
  root: {
    border: '1px solid #cfcfcf',
    borderRadius: 7,
    overflow: 'hidden'
  },
  imgContainer: {
    display: 'block',
    height: 210,
    overflow: 'hidden',
    '& picture': {
      display: 'block',
      height: '100%'
    }
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  content: {
    padding: [[21, 21]],
    fontFamily: "'Gotham A', 'Gotham B', sans-serif",
    borderTop: 'none',
    '& h3': {
      fontSize: '1.25rem',
      lineHeight: '1.3'
    },
    '& h4': {
      margin: [[14, 0]],
      fontWeight: 500,
      fontSize: '1rem',
      color: '#575757'
    },
    '& p': {
      height: '4.5em',
      fontSize: '1rem',
      lineHeight: '1.5em',
      color: '#575757',
      overflow: 'hidden'
    }
  },
  '@media (min-width: 576px)': {
    imgContainer: {
      height: 280
    },
    content: {
      '& h4': {
        fontSize: '0.875rem'
      },
      '& p': {
        fontSize: '0.875rem'
      }
    }
  }
});

function ArticlePreview(props) {
  const url = '/blog/' + props.id;
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <ButtonBase component={NavLinkForButton} href={url} className={classes.imgContainer}>
        <Image name={props.imgName} className={classes.img} alt={props.title}/>
      </ButtonBase>
      <div className={classes.content}>
        <h3>
          <Link href={url}>
            <a>{props.title}</a>
          </Link>
        </h3>
        <h4>{props.subtitle}</h4>
        <p>{props.content.find((element) => typeof element.content[0] === 'string').content[0]}</p>
      </div>
    </div>
  );
}

ArticlePreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  subtitle: PropTypes.string
};

export default ArticlePreview;
