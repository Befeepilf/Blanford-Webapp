import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import deLocale from 'date-fns/locale/de';
import startOfDay from 'date-fns/startOfDay';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonBase from '@material-ui/core/ButtonBase';
import CalendarWidget from './CalendarWidget.jsx';
import GradientButton from './GradientButton.jsx';
import StateButton from './StateButton.jsx';
import {patchUserMetadata} from '../API.js';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row !important',
    flexWrap: 'wrap'
  },
  calendarWidget: {
    flex: 1,
    '@media (max-width: 1450px)': {
      order: 2
    }
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '42ch',
    maxWidth: '42ch',
    width: '42ch',
    marginLeft: 70,
    '@media (max-width: 1450px)': {
      maxWidth: 700,
      margin: [[0, 70, 56, 70]]
    }
  },
  title: {
    marginBottom: 14,
    fontFamily: '"ITC Cheltenham W03 Book", serif',
    fontSize: '2.25rem',
    lineHeight: 1.4
  },
  line: {
    width: 105,
    height: 2,
    margin: [[42, 0, 28, 0]],
    fontSize: '2.25rem',
    backgroundColor: '#cbcbcb'
  },
  subtitle: {
    color: theme.palette.type === 'dark' ? theme.palette.text.secondary : '#747474'
  },
  summaryTitle: {
    margin: [[0, 0, 7, 21]],
    fontFamily: '"Open Sans", sans-serif',
    fontsize: '0.9375rem'
  },
  summary: {
    marginLeft: 21
  },
  saveButton: {
    float: 'right',
    marginTop: 56
  },
  thanking: {
    '& p': {
      fontSize: '1rem'
    }
  },
  addToCalendarButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 35
  },
  addToCalendarButton: {
    display: 'block',
    maxWidth: 224,
    padding: [[7, 28]],
    margin: [[21, 28, 0, 28]],
    fontSize: '1.125rem',
    lineHeight: 1.6,
    textAlign: 'center',
    border: '1px solid ' + (theme.palette.type === 'dark' ? '#fff' : '#747474'),
    borderRadius: 5
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  dialogTextField: {
    alignSelf: 'center',
    marginBottom: 14
  },
  '@media (min-width: 1200px)': {
    thanking: {
      display: 'grid',
      gridTemplateColumns: '1fr 224px',
      gridTemplateRows: 'auto auto',
      gridColumnGap: 28,
      '& p': {
        gridRow: 2,
        maxWidth: 631
      }
    },
    addToCalendarButtons: {
      gridRow: 2,
      display: 'block',
      marginTop: 0
    },
    addToCalendarButton: {
      margin: [[21, 0, 0, 0]],
      '&:first-child': {
        marginTop: 14
      }
    }
  }
}));

function Calendar(props) {
  const [selectedDate, setSelectedDate] = React.useState();
  const [moreInfoNeededDialogOpen, setMoreInfoNeededDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [savingState, setSavingState] = React.useState();
  const [savedAppointmentDate, setSavedAppointmentDate] = React.useState();
  const [thanking, setThanking] = React.useState(false);

  function resetSavingState() {
    setSavingState(null);
  }

  function save() {
    if((props.phoneNumber || phoneNumber) && (props.name || name)) {
      setSavingState('loading');
      const savedAppointmentDate = selectedDate;

      console.warn(Object.assign({
        time: savedAppointmentDate.getTime(),
        name: props.name || name,
        phoneNumber: props.phoneNumber || phoneNumber
      }, props.userId ? {uid: props.userId} : {}))

      props.firestore.collection('appointments').add(Object.assign({
        time: savedAppointmentDate.getTime(),
        name: props.name || name,
        phoneNumber: props.phoneNumber || phoneNumber
      }, props.userId ? {uid: props.userId} : {})).then(() => {
        props.dispatch({type: 'ADD_BUSY_INTERVAL', data: {start: new Date(selectedDate.getTime() - 3600000), end: new Date(selectedDate.getTime() + 3600000)}});
        setSavedAppointmentDate(savedAppointmentDate);
        setSavingState('success');
        setThanking(true);
      }).catch((error) => {
        console.error("[Firestore]", error);
        props.dispatch({type: 'SET', data: {notification: "Bei der Festlegung Ihres Termins ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie unseren Support."}})
        setSavingState('error');
      });
    }
    else {
      setMoreInfoNeededDialogOpen(true);
    }
  }

  function setPhoneNumberWrapper(event) {
    setPhoneNumber(event.target.value);
  }

  function setNameWrapper(event) {
    setName(event.target.value);
  }

  function closeDialog() {
    setMoreInfoNeededDialogOpen(false);
  }

  function cancelAppointment(cb) {
    const onFail = (error) => {
      console.error("[Firestore]", error);
      props.dispatch({type: 'SET', data: {notification: "Bei der Absage Ihres Termins ist ein Fehler aufgetreten. Versuchen Sie es erneut oder kontaktieren Sie uns."}});
      cb(error);
    }

    props.firestore.collection('appointments')
      .where('time', '==', savedAppointmentDate.getTime())
      .where('uid', '==', props.userId)
      .get().then((snapshot) => {
        const promises = [];
        snapshot.forEach((doc) => {
          promises.push(doc.ref.delete());
        });
        Promise.all(promises).then(() => {cb()}).catch(onFail);
      }).catch(onFail);
  }

  function saveMissingInfo(cb) {
    const promises = [];

    if(props.userId) {
      promises.push(new Promise((resolve, reject) => {
        patchUserMetadata({name}, (error, result) => {
          if(error) {
            reject(error);
          }
          else {
            props.dispatch({type: 'SET', data: {profile: {user_metadata: {name}}}});
            resolve();
          }
        });
      }));

      promises.push(new Promise((resolve, reject) => {
        patchUserMetadata({phoneNumber}, (error, result) => {
          if(error) {
            reject(error);
          }
          else {
            props.dispatch({type: 'SET', data: {profile: {user_metadata: {phoneNumber}}}});
            resolve();
          }
        });
      }));
    }

    Promise.all(promises).then(() => {
      cb();
    }).catch((error) => {
      cb(error);
    });
  }

  const classes = useStyles();
  return(
    <div id="Calendar" className={classes.root}>
      {thanking ? (
        <div className={classes.thanking}>
          <div>
            <Typography component="h2" className={classes.title}>Das hat geklappt - Bewerbung komplett und Ihre Strategiebesprechung ist reserviert. Vielen Dank!</Typography>
            <hr className={classes.line}/>
          </div>
          <Typography>
            {/* Wir haben Ihnen eine Bestätigung mit Zeit und Datum der Besprechnung per E-Mail gesendet; in diesem kurzen Gespräch hoffen wir mehr über Ihre Situation zu erfahren.
              <br/>
            <br/> */}
            Wir werden Sie pünktlich zum ausgewählten Zeitpunkt anrufen, seien Sie deshalb bitte zu dieser Zeit erreichbar. Waren Sie länger als 15 Minuten unerreichbar, verfällt Ihre Reservierung und Sie erhalten nur eine weitere Chance, eine neue Besprechung zu reservieren. Tragen Sie es sich mit einem Klick auf den Button rechts in Ihren Kalender ein.
            <br/>
            <br/>
            Bitte achten Sie auf eine eher ruhige Umgebung mit gemäßtiger Geräuschkulisse, d.h. wir bitten Sie darum, bspw. nicht vom Flughafen aus oder im Auto zu sprechen.
          </Typography>
          <div className={classes.addToCalendarButtons}>
            {[
              ["Google Calendar", `https://calendar.google.com/calendar/r/eventedit?text=Besprechung+mit+Blanford-Team&dates=${savedAppointmentDate.toISOString().replace(/[-:\.]/g, '').slice(0, -4)}Z/${new Date(savedAppointmentDate.getTime() + 3600000).toISOString().replace(/[-:\.]/g, '').slice(0, -4)}Z&details=Wir+werden+Sie+p%C3%BCnktlich+zum+ausgew%C3%A4hlten+Zeitpunkt+anrufen.+Bitte+achten+Sie+auf+eine+eher+ruhige+Umgebung+mit+gem%C3%A4%C3%9Ftiger+Ger%C3%A4uschkulisse%2C+d.h.+wir+bitten+Sie+darum%2C+bspw.+nicht+vom+Flughafen+aus+oder+im+Auto+zu+sprechen.`],
              ["iCloud Kalender", `/api/ics?start=${savedAppointmentDate.getTime()}`],
              ["Outlook Kalender", `/api/ics?start=${savedAppointmentDate.getTime()}`]].map((calendar, index) => <ButtonBase key={index} className={classes.addToCalendarButton} href={calendar[1]} target="_blank">In {calendar[0]} eintragen</ButtonBase>)}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <CalendarWidget className={classes.calendarWidget} date={selectedDate} onChange={setSelectedDate}/>
          <div className={classes.rightContainer}>
            <div>
              <Typography component="h2" className={classes.title}>Anruf vereinbaren</Typography>
              <hr className={classes.line}/>
              <Typography>
                Bitte wählen Sie im Kalender einen Tag aus. Um eine Uhrzeit zu bestimmen, verschieben Sie den blauen Schieberegler oder nutzen Sie die "+" & "-" Buttons.
                Graue Bereiche und ausgegraute Tage bedeuten Zeiträume, an denen wir nicht für Sie zur Verfügung stehen können.
              </Typography>
            </div>

            <div style={{marginTop: 56}}>
              <Typography className={classes.summaryTitle}>Ihr Termin:</Typography>
              <Typography className={classes.summary}>{selectedDate ? format(selectedDate, "eee, do MMMM HH:mm 'Uhr'", {locale: deLocale}) : <em>Bitte auswählen</em>}</Typography>
              <GradientButton
                onClick={save}
                onStateReset={resetSavingState}
                state={savingState}
                disabled={!selectedDate}
                ButtonProps={{className: classes.saveButton}}
              >Festlegen</GradientButton>
            </div>
          </div>
        </React.Fragment>
      )}

      <Dialog open={moreInfoNeededDialogOpen}>
        <DialogTitle>Wie können wir Sie erreichen?</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Wir freuen uns, persönlich mit Ihnen sprechen zu können.
            Dafür brauchen wir allerdings noch {props.name ? "" : "Ihren Namen"} {props.name && props.phoneNumber ? "" : "und"} {props.phoneNumber ? "" : "Ihre Telefonnummer"}.
            Bitte tragen Sie {!props.name && !props.phoneNumber ? "die fehlenden Informationen" : props.name ? "diese" : "diesen"} in das Feld ein:
          </DialogContentText>
          <br/>
          {props.name ? null : <TextField variant="filled" label="Name" value={name} onChange={setNameWrapper} className={classes.dialogTextField}/>}
          {props.phoneNumber ? null : <TextField variant="filled" label="Telefonnummer" type="tel" value={phoneNumber} onChange={setPhoneNumberWrapper} className={classes.dialogTextField}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Abbrechen</Button>
          <StateButton
            variant="contained"
            primary autoFocus
            label="Weiter"
            disabled={(!props.phoneNumber ? !phoneNumber : false) || (!props.name ? !name : false)}
            onClick={saveMissingInfo}
            onSuccess={() => {
              closeDialog();
              save();
            }}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(state => ({
  firestore: state.firestore,
  userId: state.profile.user_id,
  name: state.profile.user_metadata.name,
  phoneNumber: state.profile.user_metadata.phoneNumber
}))(Calendar);
