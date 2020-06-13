import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import EventIcon from '@material-ui/icons/Event';
import {DateTimePicker} from '@material-ui/pickers';
import deLocale from 'date-fns/locale/de';
import addHours from 'date-fns/addHours';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import Layout from '../../components/Dashboard/Layout.jsx';
import TextArea from '../../components/Dashboard/TextArea.jsx';
import StateButton from '../../components/StateButton.jsx';


@connect(state => ({
  firestore: state.firestore,
  userId: state.profile.user_id,
  events: state.events
}))
@withStyles(theme => ({
  section: {
    paddingTop: 112,
    '&:first-of-type': {
      paddingTop: 56
    },
    '& h2': {
      marginBottom: 28
    },
    '& table th, & table td': {
      textAlign: 'left'
    }
  },
  secondFormSection: {
    marginTop: 46,
    marginBottom: 49,
    transition: 'opacity 0.3s ease',
    '&.disabled': {
      opacity: 0.5
    }
  },
  lastFormSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      specificTime: false,
      startDate: new Date(),
      endDate: addDays(addHours(new Date(), 1), 1)
    };
  }

  checkOverflowTd() {
    document.querySelectorAll('#Events td').forEach((td) => {
      if(td.scrollWidth > td.clientWidth) {
        td.classList.add('overflow');
      }
    });
  }

  componentDidMount() {
    this.checkOverflowTd();
  }

  componentDidUpdate(prevProps) {
    if(this.props.events.length !== prevProps.events.length) {
      this.checkOverflowTd();
    }
  }

  render() {
    return(
      <React.Fragment>
        <section className={this.props.classes.section}>
          <Typography variant="h6">Neues Ereignis eintragen</Typography>
          <form className="row justify-content-between">
            <div className={classNames('col-md-4', this.props.classes.firstFormSection)}>
              <TextField label="Titel" value={this.state.title} required onChange={(event) => {this.setState({title: event.target.value})}} style={{width: '70%', marginBottom: 14}}/>
              <TextArea
                style={{width: '100%', height: 200}}
                hideActions
                value={this.state.description}
                placeholder="optionale Beschreibung"
                onValueChange={(event) => {this.setState({description: event.target.value})}}/>
            </div>
            <div className={classNames(this.props.classes.secondFormSection, 'col-lg-5', {disabled: !this.state.specificTime})}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.specificTime}
                      onChange={() => {this.setState({specificTime: !this.state.specificTime})}}
                      value="specificTime"
                    />
                  }
                  label="Spezifischer Zeitrahmen"
                />
              </div>
              <div className="row">
                <div className="col">
                  <FormHelperText>Von</FormHelperText>
                  <DateTimePicker
                    ampm={false}
                    animateYearScrolling
                    disablePast
                    showTodayButton
                    todayLabel="Heute"
                    cancelLabel="Abbrechen"
                    value={this.state.startDate}
                    maxDateMessage="Startzeit muss vor Endzeit liegen"
                    InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <IconButton><EventIcon/></IconButton>
                      </InputAdornment>
                    )}}
                    onChange={(date) => {this.setState({startDate: date})}}
                  />
                </div>
                <div className="col">
                  <FormHelperText>Bis</FormHelperText>
                  <DateTimePicker
                    ampm={false}
                    animateYearScrolling
                    disablePast
                    showTodayButton
                    todayLabel="Heute"
                    cancelLabel="Abbrechen"
                    value={this.state.endDate}
                    minDate={this.state.startDate}
                    minDateMessage="Endzeit muss hinter Startzeit liegen"
                    InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <IconButton><EventIcon/></IconButton>
                      </InputAdornment>
                    )}}
                    onChange={(date) => {this.setState({endDate: date})}}
                  />
                </div>
              </div>
            </div>
            <div className={classNames(this.props.classes.lastFormSection, 'col-md-2')}>
              <StateButton
                label="Speichern"
                errorMessage="Beim Speichern des Events ist ein Fehler aufgetreten!"
                successMessage="Das Event wurde erfolgreich gespeichert!"
                primary
                disabled={!(this.state.title && this.state.title.length && (this.state.startDate.getTime() < this.state.endDate.getTime() || (!this.state.specificTime))) || !this.props.firestore}
                onClick={(cb) => {
                  const data = {
                    timestamp: new Date().getTime(),
                    title: this.state.title,
                    description: this.state.description
                  };
                  if(this.state.specificTime) {
                    data.startDate = this.state.startDate.getTime();
                    data.endDate = this.state.endDate.getTime();
                  }

                  this.props.firestore.collection('users/' + this.props.userId + '/events').add(data).then(() => {cb()}).catch((error) => {
                    console.error(error);
                    cb(error);
                  });
                }}
              />
            </div>
          </form>
        </section>
        <section className={this.props.classes.section}>
          <Typography variant="h6">Eingetragenes</Typography>
          <div className="main table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"><Typography variat="subtitle2">Betreff / Zeitraum</Typography></th>
                  <th scope="col"><Typography variat="subtitle2">Beschreibung</Typography></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.events.map((event, index) => {
                    return(
                      <tr key={index}>
                        <td style={{width: '40%'}}>
                          <Typography variant="body1">{event.title}</Typography>
                          {event.startDate && event.endDate ?
                            <Typography variant="body2" color="textSecondary">
                              {format(new Date(event.startDate), 'MMM dd, y', {locale: deLocale})} - {format(new Date(event.endDate), 'MMM dd, y', {locale: deLocale})}
                            </Typography>
                          :
                          null}
                        </td>
                        <td style={{width: '60%'}}>
                          <Typography variant="body2">{event.description}</Typography>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </section>
      </React.Fragment>
    );
  }
}


export default props => <Layout id="Events"><Events {...props}/></Layout>;
