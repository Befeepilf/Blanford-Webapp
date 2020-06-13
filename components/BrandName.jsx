import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import {makeStyles} from '@material-ui/styles';
import Link from 'next/link';
import '../styles/BrandName.scss';

const useStyles = makeStyles(({palette}) => ({
  root: {
    fontFamily: ['cerapro medium', 'sans-serif'],
    fontSize: '1.25rem',
    fontWeight: 'lighter',
    letterSpacing: '-0.03125rem',
    color: palette.text.primary,
    opacity: 0.9
  },
  wide: {
    fontFamily: ['cerapro regular', 'sans-serif'],
    letterSpacing: 2
  },
  inline: {
    display: 'inline'
  },
  additionalText: {
    fontFamily: ['Open Sans', 'sans-serif'],
    fontSize: '0.875em',
    fontWeight: 'lighter',
    opacity: 0.9
  },
  betaBatch: {
    display: 'inline-block',
    padding: [[1, 5, 0, 5]],
    marginLeft: 2,
    fontSize: '0.5625rem',
    lineHeight: 1,
    verticalAlign: 'text-top',
    border: '1px solid ' + palette.text.primary,
    borderRadius: 7,
    opacity: 0.9
  },
  trademark: {
    fontFamily: ['Open Sans', 'sans-serif'],
    fontSize: '0.75rem',
    fontWeight: 'lighter',
    verticalAlign: 'super',
    opacity: 0.9
  }
}));

function BrandName(props) {
  const router = useRouter();
  const classes = useStyles();

  const showBeta = props.header && router.pathname.includes('beta') || (props.profile.app_metadata.isBetaTester && router.pathname.startsWith('/d'));
  const content = (
    <Link href="/">
      <a {...props.linkProps}>
        BLANFORD
        {props.showRegisteredTrademark ? <span className={classes.trademark}>{String.fromCharCode(174)}</span> : ''}
        {typeof props.children === 'string' ? <span className={classes.additionText}> {props.children}</span> : ''}
        {(showBeta || props.showBeta) && (typeof props.showBeta === 'boolean' ? props.showBeta : true) ? <span className={classes.betaBatch}>BETA</span> : ''}
      </a>
    </Link>
  );

  const className = classNames('BrandName', classes.root, {[classes.inline]: props.inline, [classes.wide]: props.wide, [props.className]: props.className});
  if(props.header) {
    return <h1 className={className}>{content}</h1>;
  }
  else {
    return <div className={className}>{content}</div>;
  }
}

BrandName.propTypes = {
  className: PropTypes.string,
  linkProps: PropTypes.object,
  children: PropTypes.node,
  header: PropTypes.bool,
  showRegisteredTrademark: PropTypes.bool,
  showBeta: PropTypes.bool,
  inline: PropTypes.bool,
  wide: PropTypes.bool
};

export default connect(({profile}) => ({profile}))(BrandName);
