import React from 'react';
import {connect} from 'react-redux';
import {withTheme, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PaletteIcon from '@material-ui/icons/Palette';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Layout from '../../components/Dashboard/Layout.jsx';
import CopyIcon from '../../components/icons/Copy.jsx';
import StateButton from '../../components/StateButton.jsx';
import ListItemTextField from '../../components/Dashboard/ListItemTextField.jsx';
import {request, patchUserMetadata} from '../../API.js';
const copy = require('clipboard-copy');

@connect(state => ({
  auth: state.auth,
  userId: state.profile.user_id,
  name: state.profile.user_metadata.name,
  email: state.profile.email,
  businessName: state.profile.user_metadata.businessName,
  address: state.profile.user_metadata.address || {},
  useMFA: state.profile.user_metadata.useMFA || false,
  usedMFA: state.profile.user_metadata.usedMFA || false,
  lastPasswordReset: state.profile.last_password_reset || state.profile.created_at,
  referral: state.profile.app_metadata.referral,
  customer: state.stripeCustomer
}))
@withTheme
@withStyles(theme => ({
  topic: {
    paddingBottom: 105
  },
  headline: {
    width: '100%',
    marginBottom: 7,
    fontSize: '1.25rem'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 auto'
  },
  left: {
    flex: 2,
    minWidth: 400,
    maxWidth: 500,
    marginRight: 112,
    marginBottom: 28
  },
  right: {
    flex: 3,
    minWidth: 400,
    maxWidth: 700
  },
  cardContent: {
    padding: [[24, 42]]
  },
  cardTitle: {
    marginTop: 7,
    marginBottom: 21,
    fontSize: '1.125rem'
  },
  addressList: {
    display: 'flex',
    width: '100%',
    height: '100%',
    '& button': {
      alignSelf: 'flex-start',
      margin: [[6, 28, 0, 0]]
    },
    '& ul': {
      flex: 1
    }
  },
  dialogWarningContainer: {
    display: 'flex',
    '& span:last-of-type': {
      flex: 1,
      marginLeft: 14
    }
  },
  '@media (min-width: 1240px)': {
    section: {
      paddingLeft: 40,
      paddingRight: 40
    }
  },
  '@media (min-width: 800px) and (max-width: 1239px)': {
    section: {
      paddingLeft: 20,
      paddingRight: 20
    }
  },
  '@media (max-width: 799px)': {
    container: {
      padding: '0'
    }
  }
}))
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {passwordDialogOpen: false, MFADialogOpen: false, isEditingAddress: false};
  }

  copyReferral() {
    copy(this.props.referral).then(() => {
      this.props.dispatch({type: 'SET', data: {notification: {message: "Der Referral Code wurde in die Zwischenablage kopiert.", duration: 3000}}});
    });
  }

  render() {
    return(
      <React.Fragment>
        <div className={this.props.classes.topic}>
          <div className={this.props.classes.content}>
            <Typography variant="h5" className={this.props.classes.headline}>Anmeldung</Typography>
            <div className={this.props.classes.left}>
              <Typography variant="subtitle1">Legen Sie Einstellungen für Passwort und Kontozugriff fest.</Typography>
            </div>
            <Card className={this.props.classes.right}>
              <CardContent className={this.props.classes.cardContent}>
                <Typography variant="h5" className={this.props.classes.cardTitle}>Passwort & Anmeldeverfahren</Typography>
                <Typography>Ihr Konto wird durch Ihr Passwort geschützt. Sie können es zusätzlich mit der Bestätigung in zwei Schritten schützen. Dabei wird ein Einmalcode an Ihr Smartphone gesendet, den Sie bei der Anmeldung eingeben. Sollte Ihr Passwort gestohlen werden, kann ein Angreifer damit trotzdem nicht auf Ihr Konto zugreifen.</Typography>
                <List>
                  <ListItem button onClick={() => {this.setState({passwordDialogOpen: true})}}>
                    <ListItemText>
                      <Typography variant="subtitle1">Passwort</Typography>
                      <Typography>Letzte Änderung: {this.props.lastPasswordReset ? new Date(this.props.lastPasswordReset).toLocaleDateString('de-DE') : "unbekannt"}</Typography>
                    </ListItemText>
                    <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                  </ListItem>

                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1">Bestätigung in zwei Schritten</Typography>
                      <Typography>{this.props.useMFA ? "Aktiviert" : "Deaktiviert"}</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Switch
                        checked={this.props.useMFA}
                        color="primary"
                        onChange={(event, checked) => {this.setState({MFADialogOpen: true})}}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </div>

          <Dialog open={this.state.passwordDialogOpen}>
            <DialogTitle>Passwort ändern</DialogTitle>
            <DialogContent>
              <DialogContentText color="textPrimary">Nach Bestätigen dieses Dialogs werden Sie abgemeldet. Klicken Sie anschließend im Loginfenster auf "Passwort ändern" und geben Ihre E-Mail-Adresse ein, die Sie für dieses Dashboard verwenden. Sie werden dann eine E-Mail mit weiteren Anweisungen erhalten.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {this.setState({passwordDialogOpen: false})}}>Abbrechen</Button>
              <Button variant="contained" color="primary" autoFocus onClick={() => {this.props.dispatch({type: 'LOGOUT', relogin: true})}}>Abmelden</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={this.state.MFADialogOpen}>
            <DialogTitle>
              {this.props.useMFA ?
                "Zwei-Faktor-Authentifizierung deaktivieren"
              :
                "Zwei-Faktor-Authentifizierung aktivieren"
              }
            </DialogTitle>
            <DialogContent>
              <DialogContentText color="textPrimary" component="div">
                {this.props.useMFA ?
                    "Falls Sie in Zukunft die Zwei-Faktor-Authentifizierung wieder aktivieren sollten, so können Sie diese nicht erneut einrichten. Bewahren Sie deshalb unbedingt den Wiederherstellungscode auf!"
                :
                  this.props.usedMFA ?
                    <div>
                      Nach Bestätigen dieses Dialogs müssen Sie sich erneut anmelden. Die zweite Bestätigung erfolgt dann wieder auf die Art & Weise, wie Sie sie beim ersten Mal eingerichtet haben.
                      <br/>
                      <br/>
                      <div className={this.props.classes.dialogWarningContainer}>
                        <span><strong>Achtung:</strong></span>
                        <span>Sollten Sie Ihren Wiederherstellungscode verloren haben, so fahren Sie <u>nicht</u> fort, sondern kontaktieren bitte unseren Support.</span>
                      </div>
                    </div>
                  :
                  <div>
                    Nach Bestätigen dieses Dialogs müssen Sie sich erneut anmelden. Bitte folgen Sie anschließend den Anweisungen, um die Zwei-Faktor-Authentifizierung einzurichten.
                    <br/>
                    <br/>
                    <div className={this.props.classes.dialogWarningContainer}>
                      <span><strong>Hinweise:</strong></span>
                      <span>Stellen Sie sicher, dass Sie auch zukünftig Nachrichten mit der Telefonnummer empfangen können.</span>
                    </div>
                  </div>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {this.setState({MFADialogOpen: false})}} autoFocus={this.props.useMFA}>Abbrechen</Button>
              <StateButton label="OK" autoFocus={!this.props.useMFA} onClick={(cb) => {
                patchUserMetadata({useMFA: !this.props.useMFA, usedMFA: true}, cb);
              }} onSuccess={() => {
                if(this.props.useMFA) {
                  this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {useMFA: !this.props.useMFA, usedMFA: true}}}});
                  this.setState({MFADialogOpen: false});
                }
                else {
                  this.props.dispatch({type: 'LOGOUT', relogin: true});
                }
              }}
                errorMessage={"Bei der " + (this.props.useMFA ? "Dea" : "A") + "ktivierung der Zwei-Faktor-Authentifizierung ist ein Fehler aufgetreten!"}
                successMessage={"Die Zwei-Faktor-Authentifizierung wurde erfolgreich " + (this.props.useMFA ? "dea" : "a") + "ktiviert!"}
              />
            </DialogActions>
          </Dialog>
        </div>

        <div className={this.props.classes.topic}>
          <div className={this.props.classes.content}>
            <Typography variant="h5" className={this.props.classes.headline}>Persönlichen Angaben</Typography>
            <div className={this.props.classes.left}>
              <Typography variant="subtitle1">Diese Daten benötigen wir für Rechnungsstellung & Kommunikation, bitte kontrollieren sie Ihre Eingabe und auf halten Sie die Angaben auf dem aktuellsten Stand. Informationen über Datenverarbeitung finden Sie in der Datenschutzerklärung.</Typography>
            </div>
            <Card className={this.props.classes.right}>
              <CardContent className={this.props.classes.cardContent}>
                {this.state.isEditingAddress ?
                  <>
                    <div className={this.props.classes.addressList}>
                      <IconButton onClick={() => {this.setState({isEditingAddress: false})}}><ChevronLeftIcon/></IconButton>
                      <List>
                        <ListItemTextField
                          label="Straße & Hausnummer"
                          required
                          value={this.props.address.line1 || ""}
                          onChange={(value) => {
                            this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {address: {line1: value}}}}});
                          }}
                        />
                        <ListItemTextField
                          label="Stadt"
                          value={this.props.address.city || ""}
                          onChange={(value) => {
                            this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {address: {city: value}}}}});
                          }}
                        />
                        <ListItemTextField
                          label="Staat"
                          value={this.props.address.country || ""}
                          onChange={(value) => {
                            this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {address: {country: value}}}}});
                          }}
                        />
                      </List>
                    </div>
                    <StateButton
                      label="Speichern"
                      primary
                      disabled={!this.props.address.line1}
                      onClick={(cb) => {patchUserMetadata({address: this.props.address}, (error, result) => {cb(error)})}}
                      onSuccess={() => {this.setState({isEditingAddress: false})}}
                      style={{display: 'flex', justifyContent: 'flex-end'}}
                    />
                  </>
                :
                <List>
                  <ListItemTextField label="Gewerbename nach Handelsregister" value={this.props.businessName || ""} onSubmit={(value, cb) => {
                    if(value.length) {
                      patchUserMetadata({businessName: value}, (error, result) => {cb(error)});
                    }
                    else {
                      cb(true);
                    }
                  }} onSuccess={(value) => {
                    this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {businessName: value}}}});
                  }}/>
                  <ListItemTextField label="Nutzer Vor- & Nachname" value={this.props.name || ""} onSubmit={(value, cb) => {
                    patchUserMetadata({name: value}, (error, result) => {cb(error)});
                  }} onSuccess={(value) => {
                    this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {name: value}}}});
                  }}/>
                  <ListItem button onClick={() => {this.setState({isEditingAddress: true})}}>
                    <ListItemText>
                      <Typography variant="subtitle1">Gewerbliche Anschrift nach Handelsregister</Typography>
                    </ListItemText>
                    <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                  </ListItem>
                  <ListItemTextField label="E-Mail" value={this.props.email} onSubmit={(value, cb) => {
                    if(value.length) {
                      request('/email', 'PATCH', {body: {email: value}, json: true}, cb);
                    }
                    else {
                      cb(true);
                    }
                  }} onSuccess={(value) => {
                    this.props.dispatch({type: 'SET', data: {profile: {email: value, email_verified: false}}});
                  }}/>
                </List>}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* <div className={this.props.classes.topic}>
          <div className={this.props.classes.content}>
            <Typography variant="h5" className={this.props.classes.headline}>Kommunikation</Typography>
            <div className={this.props.classes.left}>
          <Typography variant="subtitle1">Teilen Sie uns Ihre Präferenzen hinsichtlich Kommunikation mit.</Typography>
            </div>
            <Card className={this.props.classes.right}>
          <CardContent className={this.props.classes.cardContent}>
          <List>
          <ListItem>
          <ListItemIcon><PaletteIcon/></ListItemIcon>
          <ListItemText>Dunkles Design</ListItemText>
          <ListItemSecondaryAction>
          <Switch
          color="primary"
          onChange={(event, value) => {
          this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {darkTheme: value}}}});
          patchUserMetadata({darkTheme: value}, () => {});
          }}
          checked={this.props.theme.palette.type === 'dark'}
          />
          </ListItemSecondaryAction>
          </ListItem>
          </List>
          </CardContent>
            </Card>
          </div>
        </div> */}

        <div className={this.props.classes.topic}>
          <div className={this.props.classes.content}>
            <Typography variant="h5" className={this.props.classes.headline}>Erscheinungsbild</Typography>
            <div className={this.props.classes.left}>
              <Typography variant="subtitle1">Invertiert das Farbschema der Benutzeroberfläche für eine bessere Benutzerfreundlichkeit in dunklen Umgebungen.</Typography>
            </div>
            <Card className={this.props.classes.right}>
              <CardContent className={this.props.classes.cardContent}>
                <List>
                  <ListItem>
                    <ListItemIcon><PaletteIcon/></ListItemIcon>
                    <ListItemText>Dunkles Design</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch
                        color="primary"
                        onChange={(event, value) => {
                          this.props.dispatch({type: 'SET', data: {profile: {user_metadata: {darkTheme: value}}}});
                          patchUserMetadata({darkTheme: value}, () => {});
                        }}
                        checked={this.props.theme.palette.type === 'dark'}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </div>
        </div>

        {this.props.referral && this.props.customer && this.props.customer.subscriptions.total_count ? (
          <div className={this.props.classes.topic}>
            <div className={this.props.classes.content}>
              <Typography variant="h5" className={this.props.classes.headline}>Referral Code</Typography>
              <div className={this.props.classes.left}>
                <Typography variant="subtitle1">Falls Sie als Blanford-Kunde einen Kollegen oder Bekannten einladen möchten, können Sie ihm diesen Code übermitteln. Wird er bei uns Kunde, so werden Sie mit zwei Monaten kostenlosem Service belohnt.</Typography>
              </div>
              <Card className={this.props.classes.right}>
                <CardContent className={this.props.classes.cardContent}>
                  <List>
                    <ListItem>
                      <ListItemIcon><PersonAddIcon/></ListItemIcon>
                      <ListItemText>{this.props.referral}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={this.copyReferral.bind(this)}><CopyIcon/></IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}


export default props => <Layout id="Settings"><Settings {...props}/></Layout>;
