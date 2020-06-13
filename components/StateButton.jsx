import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

@connect()
class StateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setStatus(status) {
    this.setState({status}, () => {
      if(this.props.onStatusChange) {
        this.props.onStatusChange(status);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.status !== this.state.status) {
      if(this.state.status === 'success') {
        if(this.props.onSuccess) {
          this.props.onSuccess();
        }
        this.timeout = setTimeout(() => {
          this.setStatus(null);
        }, 3000);
      }
      else if(this.state.status === 'error') {
        this.timeout = setTimeout(() => {
          this.setStatus('retry');
        }, 3000);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    let label;
    let icon;
    let labelColor;
    let backgroundColor;
    let disabledBackgroundColor;
    if(this.state.status === 'success' && !this.props.hideSuccessIndicator) {
      icon = <DoneIcon/>;
      backgroundColor = green[500];
      disabledBackgroundColor = green[500];
    }
    else if(this.state.status === 'error') {
      icon = <ErrorIcon/>;
      backgroundColor = red[500];
      disabledBackgroundColor = red[500];
    }
    else if(this.state.status === 'loading') {
      icon = <CircularProgress size={24}/>;
    }
    else if(this.state.status === 'retry') {
      icon = <RefreshIcon style={{color: '#303030'}}/>;
      backgroundColor = yellow[600];
      disabledBackgroundColor = yellow[600];
    }
    else {
      label = this.props.label;
      labelColor = this.props.labelColor;
      backgroundColor = this.props.backgroundColor;
    }

    const enabled = !this.state.status || this.state.status === 'retry' ? true : false;
    const disabled = !enabled || this.props.disabled;

    return(
      <div style={Object.assign({display: 'inline'}, this.props.contrainerStyle || {})}>
        <Button
          className={this.props.className}
          classes={this.props.classes}
          variant={this.props.variant || "contained"}
          disabled={disabled}
          color={(!backgroundColor && !disabledBackgroundColor) && this.props.primary ? "primary" : "default"}
          style={Object.assign({backgroundColor: disabled ? disabledBackgroundColor : backgroundColor}, this.props.style || {})}
          autoFocus={typeof this.props.autoFocus === 'undefined' ? true : this.props.autoFocus}
          onClick={() => {
            this.setStatus('loading');
            this.props.onClick((error) => {
              const state = (error ? 'error' : 'success');
              const notification = (error ? this.props.errorMessage || error.message || "Bei der Ausführung ist ein Fehler aufgetreten!" : this.props.successMessage);
              this.setStatus(state);
              if(notification) {
                this.props.dispatch({type: 'SET', data: {notification}});
              }
            });
          }}>{icon}{label}</Button>
      </div>
    );
  }
}

StateButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onStatusChange: PropTypes.func,
  labelColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  hideSuccessIndicator: PropTypes.bool,
  autoFocus: PropTypes.bool,
  style: PropTypes.object,
  contrainerStyle: PropTypes.object,
  primary: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object
};

export default StateButton;