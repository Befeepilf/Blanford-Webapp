import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';


function GradientButton(props) {
  let resetStateTimeout;

  React.useEffect(() => {
    if((props.state === 'error' || props.state === 'success') && props.onStateReset) {
      resetStateTimeout = setTimeout(() => {
        resetStateTimeout = null;
        props.onStateReset();
      }, 3000);
    }

    return () => {
      if(resetStateTimeout) {
        clearTimeout(resetStateTimeout);
      }
    }
  }, [props.state]);

  const ButtonProps = Object.assign({classes: {}}, props.ButtonProps);

  return(
    <Button variant="contained" color="primary" classes={{root: classNames(props.classes.root, ButtonProps.classes.root, ButtonProps.className), disabled: 'disabled'}} onClick={props.onClick} disabled={Boolean(props.state) || props.disabled}>
      {props.state === 'loading' ?
        <CircularProgress size={24}/>
      :
        props.state === 'success' ?
          <CheckIcon/>
        :
        props.state === 'error' ?
          <ErrorIcon/>
        :
      props.children}
    </Button>
  );
}

GradientButton.propTypes = {
  state: PropTypes.oneOf(['loading', 'error', 'success', null]),
  onClick: PropTypes.func.isRequired,
  onStateReset: PropTypes.func,
  disabled: PropTypes.bool,
  ButtonProps: PropTypes.shape({
    className: PropTypes.string,
    classes: PropTypes.object
  })
};

export default withStyles(theme => ({
  root: {
    padding: [[4, 20]],
    // marginTop: 14,
    textTransform: 'none',
    border: '1px solid transparent',
    boxShadow: 'none',
    transition: 'all 0.3s',
    '&:not(.disabled)': {
      background: 'linear-gradient(to top, #1272c6, #44a0e7)',
      borderColor: '#0e76c7'
    },
    // '&:first-of-type': {
    //   marginTop: -14,
    //   '@media (min-width: 615px) and (max-width: 800px)': {
    //     marginTop: 14
    //   }
    // }
  }
}))(GradientButton);
