import React from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DateTimePicker} from '@material-ui/pickers';
import areIntlLocalesSupported from 'intl-locales-supported';
import StateButton from '../StateButton.jsx';
import {request} from '../../API.js';
require('../../styles/Dashboard/EventMaker.scss');


@connect()
export default class EventMaker extends React.Component {
  constructor(props) {
    super(props);

    if(Intl) {
      if(!areIntlLocalesSupported(['de-DE'])) {
        const IntlPolyfill = require('intl');
        this.DateTimeFormat = IntlPolyfill.DateTimeFormat;
      }
      else {
        this.DateTimeFormat = Intl.DateTimeFormat;
      }
    }
    else {
      Intl = require('intl');
      require('intl/locale-data/jsonp/de-DE');
      this.DateTimeFormat = Intl.DateTimeFormat;
    }

    this.state = {
      title: "",
      description: ""
    };
  }

  reset() {
    this.setState({
      title: "",
      description: "",
      start: new Date(),
      end: new Date()
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.open !== this.props.open) {
      if(this.props.edit) {
        this.setState({
          title: this.props.event ? this.props.event.title : "",
          description: this.props.event ? this.props.event.description : "",
          start: this.props.event && new Date(this.props.event.start),
          end: this.props.event && new Date(this.props.event.end)
        });
      }
      else if(prevProps.edit && this.props.edit === false) {
        this.reset()
      }
    }
  }

  render() {
    return(
      <Dialog
        open={this.props.open}
        onClose={this.props.onRequestClose}
      >
        <DialogTitle>
          <TextField value={this.state.title} label="Titel" required autoFocus fullWidth onChange={(event) => {this.setState({title: event.target.value})}}/>
        </DialogTitle>
        <DialogContent>
          <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 42}}>
            <DateTimePicker
              label="Beginn"
              value={this.state.start}
              maxDate={this.state.end}
              ampm={false}
              required
              showTodayButton
              todayLabel="Heute"
              cancelLabel="Abbrechen"
              invalidDateMessage="ungültiges Format"
              maxDateMessage="Beginn muss früher als Ende sein"
              style={{marginRight: 7}}
              onChange={(date) => {this.setState({start: date})}}
            />
            <DateTimePicker
              label="Ende"
              value={this.state.end}
              minDate={this.state.start}
              ampm={false}
              required
              showTodayButton
              todayLabel="Heute"
              cancelLabel="Abbrechen"
              invalidDateMessage="ungültiges Format"
              minDateMessage="Ende muss später als Beginn sein"
              onChange={(date) => {this.setState({end: date})}}
            />
          </div>
          {/* <DatePicker textFieldStyle={{width: '100%'}} value={this.state.startDate} hintText="Beginn: Datum" autoOk={true} DateTimeFormat={this.DateTimeFormat} locale="de-DE" mode="landscape" onChange={(event, date) => {this.setState({startDate: date})}}/>
            <TimePicker textFieldStyle={{width: '100%'}} value={this.state.startTime} hintText="Beginn: Uhrzeit" autoOk={true} format="24hr" onChange={(event, date) => {this.setState({startTime: date})}}/>
            bis
            <DatePicker textFieldStyle={{width: '100%'}} value={this.state.endDate} hintText="Ende: Datum" autoOk={true} DateTimeFormat={this.DateTimeFormat} locale="de-DE" mode="landscape" onChange={(event, date) => {this.setState({endDate: date})}}/>
          <TimePicker textFieldStyle={{width: '100%'}} value={this.state.endTime} hintText="Ende: Uhrzeit" autoOk={true} format="24hr" onChange={(event, date) => {this.setState({endTime: date})}}/> */}
          <TextField value={this.state.description} label="Beschreibung" multiline fullWidth required rows={2} onChange={(event) => {this.setState({description: event.target.value})}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onRequestClose}>Abbrechen</Button>
          {this.props.edit ?
            <StateButton
              label="Ändern"
              keyboardFocused
              primary
              disabled={!(this.state.title && this.state.description && this.state.start && this.state.end)}
              errorMessage="Beim Ändern des Events ist ein Fehler aufgetreten!"
              successMessage="Das Event wurde erfolgreich bearbeitet!"
              onClick={(cb) => {
                let state = this.state;
                let event = {id: this.props.event.id, title: state.title, description: state.description, start: state.start.getTime(), end: state.end.getTime()};
                request('/event', 'PATCH', {json: true, body: event}, (error, result) => {
                  if(!error) {
                    this.props.dispatch({type: 'PATCH_EVENT', event});
                  }
                  cb(error);
                });
              }}
              onSuccess={() => {
                this.props.onRequestClose();
              }}
            />
          :
          <StateButton
            label="Hinzufügen"
            keyboardFocused
            primary
            disabled={!(this.state.title && this.state.description && this.state.start && this.state.end && this.state.start.getTime() < this.state.end.getTime())}
            errorMessage="Beim Speichern des Events ist ein Fehler aufgetreten!"
            successMessage="Das Event wurde erfolgreich gespeichert!"
            onClick={(cb) => {
              let state = this.state;
              let event = {id: require('uuid/v4')(), title: state.title, description: state.description, start: state.start.getTime(), end: state.end.getTime()};
              request('/event', 'POST', {json: true, body: event}, (error, result) => {
                if(!error) {
                  this.props.dispatch({type: 'ADD_EVENT', event});
                }
                cb(error);
              });
            }}
            onSuccess={() => {
              this.reset();
              this.props.onRequestClose();
            }}
          />
          }
        </DialogActions>
      </Dialog>
    );
  }
}
