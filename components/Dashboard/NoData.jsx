import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {InfoOutlined} from '@material-ui/icons';

@withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    opacity: 0.3,
    '&.fullHeight': {
      height: '100%'
    },
    '&.flexItem': {
      flex: 1
    },
    '& > svg': {
      marginBottom: 28,
      fontSize: '5rem'
    },
    '&.compact > svg': {
      marginBottom: 7,
      fontSize: '4rem'
    },
    '&.compact $title': {
      fontSize: '1.25rem'
    }
  },
  title: {
    marginBottom: 7,
    fontSize: '1.5rem'
  }
}))
class NoData extends React.Component {
  render() {
    return(
      <div className={classNames(this.props.classes.root, {fullHeight: this.props.fullHeight, flexItem: this.props.flexItem, compact: this.props.compact})}>
        {this.props.icon || <InfoOutlined/>}
        <Typography variant="h5" align="center" className={this.props.classes.title}>{this.props.title || "Keine Daten verfügbar"}</Typography>
        {this.props.subtitle ?
          <Typography variant="body1" color="textSecondary">{this.props.subtitle}</Typography>
        :
        null}
      </div>
    );
  }
}

NoData.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
  fullHeight: PropTypes.bool,
  flexItem: PropTypes.bool,
  compact: PropTypes.bool
};

export default NoData;