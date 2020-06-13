import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import Router from 'next/router';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Zoom from '@material-ui/core/Zoom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Layout from '../../../components/Dashboard/Layout.jsx';
import Image from '../../../components/Image.jsx';
import BrandName from '../../../components/BrandName.jsx';
import StateButton from '../../../components/StateButton.jsx';
import {request} from '../../../API.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 0
  },
  header: {
    paddingRight: 56,
    borderBottom: '1px solid #dadce0'
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 7,
    borderBottom: '1px solid #dadce0',
    '& p': {
      fontFamily: "'Open Sans', sans-serif"
    },
    '& > :first-child': {
      display: 'flex',
      alignItems: 'baseline',
      fontSize: '1.125rem'
    },
    '& .BrandName': {
      margin: [[0, 5]]
    }
  },
  brandName: {
    margin: [[0, 5]]
  },
  tab: {
    padding: [[21, 35]],
    fontFamily: "'Gotham A', 'Gotham B', sans-serif",
    fontSize: '0.8125rem',
    letterSpacing: 0,
    textTransform: 'none'
  },
  tabIndicator: {
    height: 3
  },
  step: {
    flex: 1,
    display: 'flex',
    '& > :first-child': {
      flex: 1
    }
  },
  step0: {
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      opacity: 0.26
    },
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      padding: [[49, 56, 56, 35]]
    },
    '& h3, & h4, & p, & button': {
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
      letterSpacing: 0
    },
    '& h3': {
      fontSize: '1.25rem',
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000',
      '& + p': {
        marginBottom: 21,
        fontSize: '0.875rem'
      }
    },
    '& h4': {
      marginTop: 14,
      fontSize: '0.9375rem',
      fontWeight: 500
    },
    '& button': {
      display: 'block',
      width: '100%',
      padding: [[10, 21]],
      marginTop: 7,
      marginBottom: 21,
      fontWeight: 400,
      textAlign: 'left',
      textTransform: 'none',
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000',
      border: '2px solid ' + (theme.palette.type === 'dark' ? theme.palette.text.secondary: '#e7e7e7'),
      borderRadius: 28,
      '&.selected': {
        borderColor: theme.palette.primary.main
      }
    }
  },
  stepWithForm: {
    '& h3, & p, & label': {
      fontFamily: "'Gotham A', 'Gotham B', sans-serif"
    },
    '& h3': {
      marginBottom: 35,
      fontSize: '1.1875rem',
      fontWeight: 600
    },
    '& > :first-child': {
      padding: [[49, 70, 70, 35]],
      backgroundColor: '#f4f4f4'
    }
  },
  stepForm: {
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '21px',
    gridRowGap: '28px',
    '@media (min-width: 1200px)': {
      display: 'grid'
    }
  },
  stepInput: {
    padding: [[10, 21]],
    marginTop: 7,
    fontFamily: "'Gotham A', 'Gotham B', sans-serif",
    fontSize: '1rem',
    backgroundColor: '#fff',
    borderRadius: 28
  },
  stepLabel: {
    marginLeft: 14,
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    transform: 'scale(1)'
  },
  step1AddressContainer: {
    display: 'flex',
    '& > :first-child': {
      marginRight: 21
    },
    '& > :last-child': {
      maxWidth: 84
    }
  },
  step1WithNote: {
    gridColumn: '1 / span 2',
    display: 'flex',
    alignItems: 'flex-end',
    '& p': {
      maxWidth: 350,
      marginLeft: 42,
      fontSize: '0.8125rem',
      letterSpacing: 0,
      lineHeight: 1.3
    }
  },
  step2: {
    '& > :first-child': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        marginBottom: 14,
        fontSize: 56,
        color: 'green'
      }
    }
  },
  iframe: {
    height: '100%',
    padding: 0,
    border: 'none'
  },
  stepServiceImage: {
    padding: [[49, 56, 56, 35]],
    textAlign: 'center',
    '& > *': {
      margin: [0, 'auto']
    },
    '& > div': {
      position: 'relative',
      maxWidth: 238,
      height: 154,
      padding: [[14, 21]],
      marginBottom: 35,
      borderRadius: 18,
      '& p': {
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Gotham A', 'Gotham B', sans-serif",
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.0625rem',
        whiteSpace: 'nowrap',
        color: '#fff'
      }
    },
    '& h3, & p': {
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
    },
    '& h3': {
      marginBottom: 14,
      fontSize: '1.1875rem',
      fontWeight: 600
    },
    '& > p': {
      maxWidth: 280,
      fontSize: '0.875rem'
    },
    '& .brand': {
      position: 'absolute',
      bottom: 14,
      right: 21,
      fontFamily: "'cerapro medium', sans-serif",
      fontSize: '1.125rem',
      opacity: 0.6
    },
    '& img': {
      borderRadius: 14
    }
  },
  step4: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 35,
    '& h3, & p, & button': {
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
      letterSpacing: 0,
      textAlign: 'center'
    },
    '& h3': {
      maxWidth: 728,
      margin: [[35, 0]],
      fontSize: '1.5rem',
      fontWeight: 600
    },
    '& li p': {
      paddingLeft: 21,
      fontSize: '0.9375rem',
      textAlign: 'left',
      '&::before': {
        counterIncrement: 'step4-list',
        content: "'('counter(step4-list)')'",
        position: 'absolute',
        left: -14,
        fontWeight: 500
      }
    },
    '& img': {
      width: 112
    },
    '& ol': {
      counterReset: 'step4-list',
      listStyleType: 'none',
      position: 'relative',
      maxWidth: 630,
      padding: 0,
      margin: [[28, 0, 42, 0]]
    }
  },
  step4Button: {
    padding: [[7, 56]],
    margin: [[7, 0, 42, 0]],
    fontSize: '0.875rem',
    color: '#fff',
    backgroundColor: '#416fdf',
    borderRadius: 28,
    '&:hover': {
      color: '#303030'
    }
  },
  circularProgressContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    flex: 'unset !important',
    padding: [[21, 28]],
    marginTop: 0,
    backgroundColor: '#333333',
    '& p, & button': {
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
      fontSize: '0.875rem',
      letterSpacing: 0,
      color: '#fff'
    },
    '& > :nth-child(-n+2)': {
      '& :first-child': {
        fontSize: '1.25rem',
        letterSpacing: '-0.03125rem'
      }
    },
    '& > :nth-child(4)': {
      flex: 1,
      maxWidth: 280
    },
    '& button': {
      width: '100%',
      backgroundColor: '#416fdf',
      borderRadius: 28,
      '&.disabled': {
        backgroundColor: '#747474'
      }
    }
  }
}));

function Wizard(props) {
  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(getDefaultSelectedProduct());
  const [selectedPaymentSource, setSelectedPaymentSource] = useState(props.defaultPaymentSource);
  const [iframeDialogOpen, setIframeDialogOpen] = useState(true);
  const [embeddedSigningUrl, setEmbeddedSigningUrl] = useState();
  const [signedContract, setSignedContract] = useState(false);
  const [clientData, setClientData] = useState({
    firstname: props.name ? props.name.split(' ')[0] : null,
    surname: props.name ? props.name.split(' ')[1] : null,
    businessName: props.businessName,
    street: props.address.line1 ? props.address.line1.split(' ')[0] : null,
    houseNumber: props.address.line1 ? props.address.line1.split(' ')[1] : null,
    postcode: null,
    email: props.email
  });
  const [dialogError, setDialogError] = useState();

  useEffect(() => {
    setSelectedProduct(getDefaultSelectedProduct());
  }, [props.products]);

  useEffect(() => {
    if(!selectedPaymentSource) {
      setSelectedPaymentSource(props.defaultPaymentSource);
    }
  }, [props.defaultPaymentSource]);

  useEffect(() => {
    if(step === 2) {
      window.addEventListener('message', onWindowMessage);
    }

    return () => {
      window.removeEventListener('message', onWindowMessage);
    }
  }, [step]);


  const classes = useStyles();


  function getDefaultSelectedProduct() {
    if(props.products && props.products.length) {
      return props.products.find(product => product.active && !props.activeSubscriptions.some(subscription => subscription.plan.product.id === product.id)) || {};
    }
    return {};
  }

  function onWindowMessage(event) {
    const type = event.message || event.data;
    if(type === 'event_signed') {
      setSignedContract(true);
      setIframeDialogOpen(false);
    }
    else if(type === 'event_declined') {

    }
  }

  function changeStep(event, step) {
    setStep(step);
  }

  function onClientDataChange(key, value) {
    setClientData(Object.assign({}, clientData, {[key]: value}));
  }

  function getStepContent() {
    switch(step) {
      case 0:
        return(
          <div className={classNames(classes.step, classes.step0)}>
            <Image name="wizard-0.jpg"/>
            <div>
              <Typography component="h3">Service Program wählen</Typography>
              <Typography color="textSecondary">Neuanmeldung für Done-With-You Services</Typography>

              {props.products ?
                props.products.map((product) => {
                  let disabled;
                  let tooltipTitle;
                  if(!product.active) {
                    disabled = true;
                    tooltipTitle = "Dieser Service ist momentan nicht verfügbar.";
                  }
                  if(props.activeSubscriptions.some((subscription) => subscription.plan.product.id === product.id)) {
                    disabled = true;
                    tooltipTitle = "Diesen Service nutzen Sie bereits.";
                  }

                  const button = <Button disabled={disabled} className={classNames({selected: product.id === selectedProduct.id})} onClick={() => setSelectedProduct(product)}>{product.name}</Button>;

                  return(
                    <React.Fragment key={product.id}>
                      <Typography component="h4" color={disabled ? 'textSecondary' : 'textPrimary'}>{product.metadata.type}</Typography>
                      {disabled ? <Tooltip PopperProps={{style: {marginTop: -28}}} title={tooltipTitle}><span>{button}</span></Tooltip> : button}
                    </React.Fragment>
                  );
                })
              :
              <div className={classes.circularProgressContainer}>
                <CircularProgress/>
              </div>
              }

              {/* <Typography>Merkmale:</Typography>
                <ul>
                <li><Typography></Typography></li>
                <li><Typography></Typography></li>
                <li><Typography></Typography></li>
              </ul> */}
            </div>
          </div>
        );

      case 1:
        return(
          <div className={classNames(classes.step, classes.stepWithForm)}>
            <div>
              <Typography component="h3">Ihre Daten (Auftraggeber)</Typography>
              <div className={classes.stepForm}>
                <TextField disabled={Boolean(embeddedSigningUrl)} label="Vorname" onChange={({target}) => onClientDataChange('firstname', target.value)} defaultValue={props.name ? props.name.split(' ')[0] : null} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                  <TextField disabled={Boolean(embeddedSigningUrl)} label="Nachname" onChange={({target}) => onClientDataChange('surname', target.value)} defaultValue={props.name ? props.name.split(' ')[1] : null} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                    <TextField disabled={Boolean(embeddedSigningUrl)} label="Gewerbename nach Handelsregister" inputProps={{style: {marginTop: 23}}} onChange={({target}) => onClientDataChange('businessName', target.value)} defaultValue={props.businessName} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                    <div className={classes.step1AddressContainer}>
                      <TextField disabled={Boolean(embeddedSigningUrl)} label="Straße" inputProps={{style: {marginTop: 23}}} onChange={({target}) => onClientDataChange('street', target.value)} defaultValue={props.address.line1 ? props.address.line1.split(' ')[0] : null} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                        <TextField disabled={Boolean(embeddedSigningUrl)} label="Haus-Nr." inputProps={{style: {paddingLeft: 14, paddingRight: 14, marginTop: 23}}} onChange={({target}) => onClientDataChange('houseNumber', target.value)} defaultValue={props.address.line1 ? props.address.line1.split(' ')[1] : null} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                        </div>
                          <div className={classes.step1WithNote}>
                            <TextField disabled={Boolean(embeddedSigningUrl)} style={{maxWidth: 182}} label="Postleitzahl" onChange={({target}) => onClientDataChange('postcode', target.value)} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                            <Typography color="textSecondary">Momentan können wir noch keine Leistungen außerhalb Deutschland anbieten.</Typography>
                          </div>
                          <div className={classes.step1WithNote}>
                            <TextField disabled={Boolean(embeddedSigningUrl)} style={{width: '100%', maxWidth: 308, marginTop: 56}} label="E-Mail-Adresse" onChange={({target}) => onClientDataChange('email', target.value)} defaultValue={props.email} InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}} InputLabelProps={{shrink: true, className: classes.stepLabel}}/>
                              <Typography color="textSecondary">Nutzen Sie bitte ein E-Mail-Konto, auf welches Sie schnellen Zugriff haben, da Sie via E-Mail die vertraglichen Konditionen bestätigen müssen.</Typography>
                            </div>
                          </div>
                        </div>

                        <div className={classes.stepServiceImage}>
                          <div>
                            <p>{selectedProduct.name.toUpperCase()}</p>
                            <p className="brand">BLANFORD</p>
                            <Image name="services-leadgen.jpg" className="bg"/>
                          </div>
                          <Typography component="h3">{selectedProduct.name}</Typography>
                          <Typography>{selectedProduct.metadata.description}</Typography>


                          {/* <Typography>Merkmale:</Typography>
                            <ul>
                            <li><Typography></Typography></li>
                            <li><Typography></Typography></li>
                            <li><Typography></Typography></li>
                          </ul> */}
                        </div>
                      </div>
        );

      case 2:
        return(
          <div className={classNames(classes.step, classes.step2)}>
            <div>
              <CheckCircleOutlineIcon/>
              <Typography variant="h6">Dokument unterschrieben!</Typography>
            </div>
            <div className={classes.stepServiceImage}>
              <div>
                <p>{selectedProduct.name.toUpperCase()}</p>
                <p className="brand">BLANFORD</p>
                <Image name="services-leadgen.jpg" className="bg"/>
              </div>
              <Typography component="h3">{selectedProduct.name}</Typography>
              <Typography>{selectedProduct.metadata.description}</Typography>


              {/* <Typography>Merkmale:</Typography>
                <ul>
                <li><Typography></Typography></li>
                <li><Typography></Typography></li>
                <li><Typography></Typography></li>
              </ul> */}
            </div>
            <Dialog open={iframeDialogOpen} fullScreen disableBackdropClick disableEscapeKeyDown>
              <iframe className={classes.iframe} src={embeddedSigningUrl}></iframe>
            </Dialog>
          </div>
        );

      case 3:
        return(
          <div className={classNames(classes.step, classes.stepWithForm, classes.step3)}>
            <div>
              <Typography component="h3">Zahlungsmethode bestätigen</Typography>
              <div className={classes.stepForm}>
                <FormControl className={classes.formControl} style={{gridColumn: '1 / span 2', maxWidth: '50%', marginBottom: 14}}>
                  <InputLabel htmlFor="source-select">Zahlungsmethode</InputLabel>
                  <Select
                    value={selectedPaymentSource.id}
                    onChange={({target}) => setSelectedPaymentSource(props.paymentSources.find(({id}) => id === target.value))}
                    inputProps={{
                      id: 'source-select',
                    }}
                  >
                    {props.paymentSources.map(source => (
                      <MenuItem key={source.id} value={source.id} style={{dislay: 'flex', alignItems: 'baseline'}}>
                        <Typography style={{marginLeft: 7}}>{source.card.brand}</Typography>
                        <Typography variant="caption" color="textSecondary" style={{marginLeft: 7}}>endet mit {source.card.last4}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Kartennummer"
                  disabled
                  defaultValue={Object.keys(selectedPaymentSource).length ? '**** **** **** ' + selectedPaymentSource.card.last4 : null}
                  InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}}
                  InputLabelProps={{shrink: true, className: classes.stepLabel}}
                />
                <TextField
                  label="Verfallsdatum"
                  disabled
                  defaultValue={Object.keys(selectedPaymentSource).length ? selectedPaymentSource.card.exp_month + '/' + selectedPaymentSource.card.exp_year : null}
                  InputProps={{disableUnderline: true, classes: {input: classes.stepInput}}}
                  InputLabelProps={{shrink: true, className: classes.stepLabel}}
                />
              </div>
            </div>

            <div className={classes.stepServiceImage}>
              <div>
                <p>{selectedProduct.name.toUpperCase()}</p>
                <p className="brand">BLANFORD</p>
                <Image name="services-leadgen.jpg" className="bg"/>
              </div>
              <Typography component="h3">{selectedProduct.name}</Typography>
              <Typography>{selectedProduct.metadata.description}</Typography>


              {/* <Typography>Merkmale:</Typography>
                <ul>
                <li><Typography></Typography></li>
                <li><Typography></Typography></li>
                <li><Typography></Typography></li>
              </ul> */}
            </div>
          </div>
        );

      case 4:
        return(
          <div className={classes.step4}>
            <Zoom in><Image name="balloons.png"/></Zoom>
            <Typography component="h3">Das hat geklappt - wir freuen uns auf die Zusammenarbeit mit Ihnen! :)</Typography>
            <Typography>Wir möchten zügig beginnen. Hierzu sind dies die nächsten Schritte:</Typography>
            <ol>
              <li><Typography>Facebook Business Manager konfigurieren:<br/>Wenn schon bestehend, autorisieren Sie Blanford mit Agentur-Level-Zugriff durch folgenden Code: <em></em> sowohl für relevanten Ad Account als auch Fan Page.</Typography></li>
              <li><Typography>Wenn Sie eine Kundenliste haben, laden Sie sie im Tab "Hochladen" hoch oder importieren Sie diese im relevanten Ad Account.</Typography></li>
              <li><Typography>Laden Sie hochauflösende Bilder hoch zum Testen & Verwenden in Anzeigen.</Typography></li>
            </ol>
            <Button onClick={() => {Router.replace('/d/payment')}} className={classes.step4Button}>Setup schließen</Button>
            <Typography color="textSecondary">Sie finden Ihre Rechnungen unter <Link href="/d/payment"><a>Zahlungen & Abonnements > Rechnungen</a></Link></Typography>
          </div>
        );
    }
  }

  function getStepAction() {
    switch(step) {
      case 1:
        return (cb) => {
          if(embeddedSigningUrl) {
            cb();
          }
          else {
            request('/contract', 'POST', {json: true, body: Object.assign({}, clientData, {productId: selectedProduct.id})}, (error, result) => {
              if(result) {
                setEmbeddedSigningUrl(result);
              }
              cb(error);
            });
          }
        };
      case 3:
        return (cb) => {
          props.stripe.createSubscription(selectedProduct.id, (error, subscription) => {
            if(error) {
              setDialogError(error.message);
            }
            cb(error);
          });
        };
      default:
        return cb => cb();
    }
  }

  function getStepChangeAction() {
    switch(step) {
      default:
        return () => {
          setStep(step + 1);
        };
    }
  }

  function isReadyForNextStep() {
    switch(step) {
      case 0:
        return Object.keys(selectedProduct).length;
      case 1:
        return clientData.firstname && clientData.firstname.length && clientData.surname && clientData.surname.length && clientData.businessName && clientData.businessName.length && clientData.street && clientData.street.length && clientData.houseNumber && clientData.houseNumber.length && clientData.postcode && clientData.postcode.length && clientData.email && clientData.email.length;
      case 2:
        return signedContract;
      case 3:
        return Object.keys(selectedPaymentSource).length > 0;
      default:
        return false;
    }
  }


  return(
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.headerTop}>
          <Typography component="h2">Werden Sie ein <BrandName inline className={classes.brandName}/> Kunde</Typography>
          <Typography color="textSecondary">Hilfestellung beim Anmelden: 0175 7342 1254</Typography>
        </div>
        <Tabs centered value={step} onChange={changeStep} classes={{indicator: classes.tabIndicator}}>
          {[
            "1. Service",
            "2. Rechnungsdaten",
            "3. Konditionen",
            "4. Zahlungsmethode",
            "5. Bestätigen"
            ].map((label, index) => <Tab key={index} disabled={index > step && (index === step + 1 ? !isReadyForNextStep() : true)} className={classes.tab} label={label}/>)}
        </Tabs>
      </header>

      {getStepContent()}

      {step < 4 ?
        <Grid container alignItems="flex-end" justify="space-between" spacing={1} className={classes.footer}>
          <Grid item>
            <Typography>{Object.keys(selectedProduct).length ? `€ ${selectedProduct.plans.find(plan => props.defaultPlans[selectedProduct.id] ? plan.id === props.defaultPlans[selectedProduct.id] : plan.nickname === selectedProduct.metadata.defaultPlan).amount / 100} mtl.` : "-"}</Typography>
            <Typography>Service Gebühr</Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary">{Object.keys(selectedProduct).length && selectedProduct.metadata.additionalCosts ? `€ ${selectedProduct.metadata.additionalCosts} mtl.` : "-"}</Typography>
            <Typography color="textSecondary">Selbst-getragenes Werbebudget</Typography>
          </Grid>
          <Grid item>
            <Typography>Monatlich kündbar</Typography>
          </Grid>
          <Grid item>
            <Typography>{Object.keys(selectedProduct).length ? selectedProduct.metadata.note : null}</Typography>
          </Grid>

          <Grid item>
            <StateButton
              label="Weiter"
              disabled={!isReadyForNextStep()}
              hideSuccessIndicator
              onClick={getStepAction()}
              onSuccess={getStepChangeAction()}
              contrainerStyle={{flex: 1, maxWidth: 238}}
              classes={{disabled: 'disabled'}}
            />
          </Grid>
        </Grid>
      : null}

      <Dialog open={Boolean(dialogError)}>
        <DialogTitle>{dialogError}</DialogTitle>
        <DialogActions><Button onClick={() => setDialogError(null)} color="primary">Ok</Button></DialogActions>
      </Dialog>
    </div>
  );
}


export default connect(state => ({
  stripe: state.stripe,
  products: state.products ? state.products.sort((a, b) => a.metadata.orderOfAppearance < b.metadata.orderOfAppearance ? -1 : 1) : null,
  name: state.profile.user_metadata.name,
  email: state.profile.email,
  address: state.profile.user_metadata.address || {},
  businessName: state.profile.user_metadata.businessName,
  defaultPlans: state.profile.app_metadata.defaultPlans || {},
  activeSubscriptions: state.stripeCustomer ? state.stripeCustomer.subscriptions.data : [],
  paymentSources: state.stripeCustomer ? state.stripeCustomer.sources.data : [],
  defaultPaymentSource: state.stripeCustomer ? state.stripeCustomer.sources.data.find((source) => source.id === state.stripeCustomer.default_source) : null,
}))(props => <Layout id="Wizard"><Wizard {...props}/></Layout>);
