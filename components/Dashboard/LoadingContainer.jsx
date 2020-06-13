import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Info from './Info.jsx';


const useStyles = makeStyles(theme => ({
  root: props => Object.assign(Object.assign({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }, props.isLoading && props.loadingOverlay ? {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,
    opacity: 0.8
  }  : {}), props.isLoading || !props.hasData ? {alignItems: 'center', justifyContent: 'center'} : {})
}));


function LoadingContainer(props) {
  const classes = useStyles(props);
  return(
    <div className={classes.root}>
      {props.firestore === null ?
        <Info icon={props.errorIcon || <ErrorIcon/>} title={props.errorTitle || "Daten konnten nicht geladen werden"} subtitle={props.errorSubtitle}/>
        :
        props.isLoading ?
          <CircularProgress/>
          :
          props.hasData ?
            props.getContent()
            :
            <Info icon={props.noDataIcon || <InfoIcon/>} title={props.noDataTitle} subtitle={props.noDataSubtitle}/>
    }
    </div>
  );
}

LoadingContainer.propTypes = {
  noDataIcon: PropTypes.element,
  noDataTitle: PropTypes.string.isRequired,
  noDataSubtitle: PropTypes.string,
  errorIcon: PropTypes.element,
  errorTitle: PropTypes.string,
  errorSubtitle: PropTypes.string,
  getContent: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  loadingOverlay: PropTypes.bool
};

export default connect(({firestore}) => ({firestore}))(LoadingContainer);
