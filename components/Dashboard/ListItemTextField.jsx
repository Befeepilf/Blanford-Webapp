import React from 'react';
import PropTypes from 'prop-types';
import {withTheme} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RefreshIcon from '@material-ui/icons/Refresh';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

@withTheme
class ListItemTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      value: props.value
    };
  }

  reset() {
    this.setState({edit: false, value: this.props.value, status: null}, () => {this.forceUpdate()});
  }

  submit() {
    if(this.props.onSubmit) {
      this.setState({status: 'loading'});
      this.props.onSubmit(this.state.value, (error) => {
        let status = 'success';
        if(error) {
          status = 'error';
          setTimeout(() => {
            this.setState({status: 'retry'});
          }, 3000);
        }
        else {
          if(this.props.onSuccess) {
            this.props.onSuccess(this.state.value);
          }
          setTimeout(() => {
            this.setState({edit: false, value: this.props.value, status: null});
          }, 1500);
        }
        this.setState({status});
      });
    }
    else {
      this.reset();
    }
  }

  render() {
    const dark = this.props.theme.palette.type === 'dark';
    let icon = <ChevronLeftIcon/>;
    if(this.state.status === 'success') {
      icon = <DoneIcon style={{color: dark ? this.props.theme.palette.success.dark : this.props.theme.palette.success.light}}/>
    }
    else if(this.state.status === 'error') {
      icon = <ErrorIcon style={{color: this.props.theme.palette.error.main}}/>;
    }
    else if(this.state.status === 'loading') {
      icon = <CircularProgress size={24}/>;
    }
    else if(this.state.status === 'retry') {
      icon = <RefreshIcon style={{color: dark ? this.props.theme.palette.warning.dark : this.props.theme.palette.warning.light}}/>;
    }

    const labelProps = this.props.labelProps || {};


    const listItem = (
      <ListItem dense={this.props.dense || false} disabled={this.props.disabled || false} button={!this.state.edit} onClick={() => {this.setState({edit: true})}} onBlur={this.reset.bind(this)}>
        {
          this.state.edit ?
            <ListItemText>
              <TextField
                fullWidth
                autoFocus
                required={this.props.required || false} InputProps={this.props.InputProps}
                label={this.props.label} disabled={this.state.status === 'loading'}
                error={this.state.status === 'error'}
                defaultValue={this.props.value}
                onChange={(event) => {
                  this.setState({value: event.target.value});
                  if(this.props.onChange) {
                    this.props.onChange(event.target.value);
                  }
                }} onKeyDown={(event) => {
                  if(event.key === 'Enter' && (this.props.onSubmit ? this.props.value !== this.state.value : true)) {
                    this.submit();
                  }
                  else if(event.key === 'Escape') {
                    this.reset();
                  }
                }}/>
              </ListItemText>
              :
              <ListItemText>
                <Typography variant="subtitle1" {...labelProps}>{this.props.label + (this.props.required ? " *" : '')}</Typography>
                <Typography>{this.props.value}</Typography>
              </ListItemText>
          }
          <ListItemIcon>
            {this.state.edit ?
              <IconButton style={{marginRight: 0}} disabled={typeof this.state.status === 'string' && this.state.status !== 'retry'} onClick={() => {
                if(this.state.status === 'retry') {
                  this.submit();
                }
                else {
                  this.reset();
                }
              }}>{icon}</IconButton>
            :
            <ChevronRightIcon/>
            }
          </ListItemIcon>
        </ListItem>
    );

    if(this.props.disabled) {
      return(
        <Tooltip title="Aufgrund serverinterner Probleme kann diese Einstellung momentan nicht geändert werden.">{listItem}</Tooltip>
      );
    }
    else {
      return listItem;
    }
  }
}

ListItemTextField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onSuccess: PropTypes.func,
  disabled: PropTypes.bool,
  dense: PropTypes.bool,
  InputProps: PropTypes.object,
  required: PropTypes.bool,
};

export default ListItemTextField;