import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    marginBottom: 7,
    fontSize: ({compact}) => (compact ? '1.25rem' : '1.5rem'),
    opacity: 0.3
  },
  subtitle: {
    opacity: 0.6
  },
  icon: {
    marginBottom: ({compact}) => (compact ? 7 : 21),
    fontSize: ({compact}) => (compact ? '4rem' : '5rem'),
    opacity: 0.3
  }
});

function Info(props) {
  const classes = useStyles(props);
  return(
    <React.Fragment>
      {React.cloneElement(props.icon, {className: classes.icon})}
      <Typography variant="h5" align="center" className={classes.title}>{props.title}</Typography>
      {props.subtitle ?
        <Typography variant="body1" color="textSecondary" className={classes.subtitle}>{props.subtitle}</Typography>
        :
        null}
    </React.Fragment>
  );
}

Info.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  compact: PropTypes.bool
};

export default Info;
