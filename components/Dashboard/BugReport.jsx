import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import StateButton from '../StateButton.jsx';

@connect(state => ({
  useragent: state.useragent,
  firestore: state.firestore
}))
@withStyles(theme => ({
  upperInputsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: [[20, 0]]
  },
  descriptionInput: {
    paddingBottom: 20
  }
}))
export default class BugReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      os: props.useragent ? props.useragent.os.name : '',
      osVersion: props.useragent ? props.useragent.os.version : '',
      browser: props.useragent ? props.useragent.browser.name : '',
      browserVersion: props.useragent ? props.useragent.browser.version : ''
    }
  }


  render() {
    return(
      <Dialog open={this.props.open || false} onClose={this.props.onClose}>
        <DialogTitle>Bug Report</DialogTitle>
        <DialogContent>
          <DialogContentText>Haben Sie Fehler gefunden?  Dann lassen Sie es uns wissen.</DialogContentText>
          <div className={this.props.classes.upperInputsContainer}>
            <TextField label="Betriebssystem" value={this.state.os} onChange={(event) => {this.setState({os: event.target.value})}} margin="normal"/>
            <TextField label="OS Version" value={this.state.osVersion} onChange={(event) => {this.setState({osVersion: event.target.value})}} margin="normal"/>
            <TextField label="Browser" value={this.state.browser} onChange={(event) => {this.setState({browser: event.target.value})}} margin="normal"/>
            <TextField label="Browser Version" value={this.state.browserVersion} onChange={(event) => {this.setState({browserVersion: event.target.value})}} margin="normal"/>
          </div>
          <TextField
            className={this.props.classes.descriptionInput}
            label="Was ist passiert?"
            placeholder="Bitte beschreiben Sie das Problem und nennen ggf. Fehlermeldungen"
            multiline autoFocus fullWidth required
            rowsMax={10}
            value={this.state.description}
            margin="normal"
            onChange={(event) => {this.setState({description: event.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Abbrechen</Button>
          <StateButton label="Absenden" disabled={!Boolean(this.state.description)} primary
            onClick={(cb) => {
              this.props.firestore.collection('bugReports').add(Object.assign({}, this.state, {timestamp: new Date().getTime()})).then(() => {cb()}).catch((error) => {
                console.error("[Firestore]", error);
                cb(error);
              });
            }}
            onSuccess={this.props.onClose}
            successMessage="Vielen Dank für Ihren Bericht!"
            errorMessage="Bei der Speicherung Ihres Berichts ist ein Fehler aufgetreten."
          />
        </DialogActions>
      </Dialog>
    );
  }
}
