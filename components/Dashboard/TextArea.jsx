import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withTheme, withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

@connect()
@withTheme
@withStyles(theme => ({
  'root': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.text.disabled,
    borderRadius: 5,
    transition: 'border-color 0.3s ease-in-out, opacity 0.3s ease',
    '&.focus': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2
    },
    '&.success': {
      borderColor: theme.palette.success.main
    },
    '&.loading': {
      opacity: 0.25
    },
    '&.retry': {
      borderColor: theme.palette.warning.main
    },
    '&.error': {
      borderColor: theme.palette.error.main
    },
    '& textarea': {
      resize: 'none',
      width: '100%',
      height: '100%',
      padding: 14,
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.palette.text.primary
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute !important',
    width: '100%',
    right: 0,
    bottom: 0
  }
}))
export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      statuses: {}
    };
  }

  setStatus(status, actionType) {
    if(this.props.onStatusChange) {
      this.props.onStatusChange(status, actionType);
    }
    if(status === 'success' && actionType === 'clear' && !this.props.onValueChange) {
      this.setState({statuses: Object.assign({}, this.state.statuses, {[actionType]: status}), value: ""});
    }
    else {
      this.setState({statuses: Object.assign({}, this.state.statuses, {[actionType]: status})});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    Object.keys(this.state.statuses).forEach((actionType) => {
      if(prevState.statuses[actionType] !== this.state.statuses[actionType] ) {
        if(this.state.statuses[actionType] === 'success') {
          setTimeout(() => {
            this.setStatus(null, actionType);
          }, 3000);
        }
        else if(this.state.statuses[actionType] === 'error') {
          setTimeout(() => {
            this.setStatus('retry', actionType);
          }, 3000);
        }
      }
    });

    if(prevProps.value !== this.props.value) {
      this.setState({value: this.props.value || ""});
    }
  }

  setValue(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const {value} = this.state;

    let primaryIcon = <Tooltip title={this.props.actionTooltip || "Absenden"}>
      <div>
        <IconButton disabled={(this.props.disableOnEmpty && !Boolean(value)) || Boolean(this.state.statuses.clear)} tooltip={this.props.actionTooltip || "Absenden"} onClick={() => {
          this.setStatus('loading', 'primary');
          this.props.onSend(value, (error) => {
            const state = (error ? 'error' : 'success');
            const notification = (error ? this.props.primaryErrorNotification || "Bei der Ausführung ist ein Fehler aufgetreten" : this.props.primarySuccessNotification);

            this.setStatus(state, 'primary');

            if(notification) {
              this.props.dispatch({type: 'SET', data: {notification}});
            }
          });
        }}>
          {
            this.state.statuses.primary === 'retry' ?
              <RefreshIcon style={{color: yellow[500]}}/>
            :
            <SendIcon/>
          }
        </IconButton>
      </div>
    </Tooltip>;

    if(this.state.statuses.primary === 'success') {
      primaryIcon = <IconButton tooltip="Abgesendet!"><DoneIcon style={{color: green[500]}}/></IconButton>;
    }
    else if(this.state.status === 'error') {
      primaryIcon = <IconButton tooltip="Fehler"><ErrorIcon style={{color: red[500]}}/></IconButton>;
    }
    else if(this.state.status === 'loading') {
      primaryIcon = <IconButton tooltip="Loading"><CircularProgress size={24}/></IconButton>;
    }



    let clearIcon = <Tooltip title={this.props.clearActionTooltip || "Eingabe löschen"}>
      <div>
        <IconButton disabled={!Boolean(value) || Boolean(this.state.statuses.primary)} tooltip={this.props.clearActionTooltip || "Eingabe löschen"} onClick={() => {
          this.setStatus('loading', 'clear');
          const cb = (error) => {
            const state = (error ? 'error' : 'success');
            const notification = (error ? "Die Eingabe konnte nicht gelöscht werden!" : "Die Eingabe wurde erfolgreich gelöscht!");
            this.setStatus(state, 'clear');
            this.props.dispatch({type: 'SET', data: {notification}});
          }
          if(this.props.onClear) {
            this.props.onClear(cb);
          }
          else {
            cb();
          }
        }}>
          {
            this.state.statuses.clear === 'retry' ?
              <RefreshIcon style={{color: yellow[500]}}/>
            :
            <ClearIcon/>
          }
        </IconButton>
      </div>
    </Tooltip>;

    if(this.state.statuses.clear === 'success') {
      clearIcon = <IconButton tooltip="Gelöscht!"><DoneIcon style={{color: green[500]}}/></IconButton>;
    }
    else if(this.state.clear === 'error') {
      clearIcon = <IconButton tooltip="Fehler"><ErrorIcon style={{color: red[500]}}/></IconButton>;
    }
    else if(this.state.clear === 'loading') {
      clearIcon = <IconButton tooltip="Loading"><CircularProgress size={24}/></IconButton>;
    }



    return(
      <div className={classNames(this.props.classes.root, this.state.status, this.props.className, {['focus']: this.state.focus})} style={this.props.style}>
        <textarea
          style={Object.assign({}, this.props.theme.typography.body1, (this.props.hideActions ? {} : {height: 'calc(100% - 48px)'}))}
          placeholder={this.props.placeholder}
          value={value}
          onChange={this.props.onValueChange || this.setValue.bind(this)} onFocus={() => {
            if(this.props.onFocus) {
              this.props.onFocus();
            }
            this.setState({focus: true});
          }}
          onBlur={() => {
            if(this.props.onBlur) {
              this.props.onBlur();
            }
            this.setState({focus: false})
          }}
        />
        {
          !this.props.hideActions?
            <div className={this.props.classes.actions}>
              {this.props.showClearAction && clearIcon}
              {primaryIcon}
            </div>
          :
            null
        }
      </div>
    );
  }
}