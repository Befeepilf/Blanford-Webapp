import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';


const useStyles = makeStyles(theme => ({
  hint: {
    display: 'inline-block',
    width: '100%',
    maxWidth: 420,
    paddingTop: 22,
    marginBottom: 28,
    backgroundColor: 'transparent',
    border: '1px solid ' + (theme.palette.type === 'dark' ? theme.palette.grey[700] : '#cbcbcb'),
    borderRadius: 7
  },
  title: {
    marginBottom: 18,
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '1.3rem',
    fontWeight: 600
  },
  content: {
    padding: [[0, 0, 22, 28]],
    '& > *': {
      paddingRight: 28
    }
  },
  action: {
    display: 'block',
    padding: [[16, 0, 16, 28]],
    textAlign: 'left',
    textTransform: 'none',
    borderTop: '1px solid ' + (theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]),
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
  actionLabel: {
    fontSize: '0.875rem',
    fontWeight: '500'
  }
}));

function Hint(props) {
  const hasAction = props.actionLabel && props.actionProps;
  const classes = useStyles();
  return(
    <Grow in={true} timeout={props.hintsPageMountedAgain ? 0 : 'auto'}>
      <div className={classes.hint}>

        <div className={classes.content} {...props.contentProps}>
          <Typography variant="h5" component="h3" className={classes.title}>{props.title}</Typography>
          {props.children}
        </div>

        {hasAction ?
          <Button className={classes.action} {...props.actionProps} size="large" color="primary" classes={{label: classes.actionLabel}} fullWidth>{props.actionLabel}</Button>
        :
        null}

      </div>
    </Grow>
  );
}

export default connect(({ui}) => ({hintsPageMountedAgain: ui.hintsPageMountedAgain}))(Hint);
