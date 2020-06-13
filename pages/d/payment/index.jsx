import React, {useState} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Router from 'next/router';
import classNames from 'classnames';

import {StripeProvider, Elements} from 'react-stripe-elements';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MaskedInput from 'react-text-mask';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Delete from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutline from '../../../components/Dashboard/icons/DeleteOutline.svg';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import VisaCard from 'payment-icons/min/flat/visa.svg';
import Visa from 'payment-icons/min/single/visa.svg';
import MastercardCard from 'payment-icons/min/flat/mastercard-old.svg';
import Mastercard from 'payment-icons/min/single/mastercard.svg';
import AmexCard from 'payment-icons/min/flat/amex.svg';
import Amex from 'payment-icons/min/single/amex.svg';

import deLocale from 'date-fns/locale/de';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

import Layout from '../../../components/Dashboard/Layout.jsx';
import StateButton from '../../../components/StateButton.jsx';
import ListItemTextField from '../../../components/Dashboard/ListItemTextField.jsx';
import AddPaymentMethodForm from '../../../components/Dashboard/AddPaymentMethodForm.jsx';
import Info from '../../../components/Dashboard/Info.jsx';

import '../../../styles/Dashboard/PaymentOverview.scss';


function ExpiryMask(props) {
  const {inputRef, ...other} = props;
  return(
    <MaskedInput
      {...other}
      ref={ref => inputRef(ref ? ref.inputElement : null)}
      placeholderChar={'\u2000'}
      guide={false}
      showMask={false}
      mask={value => value.length ? [/[0-1]/, parseInt(value[0]) > 0 ? /[0-2]/ : /[1-9]/, ' ', '/', ' ', /\d/, /\d/] : [/[0-1]/]}
    />
  );
};


const useStyles = makeStyles(theme => ({
  reversalButtonLabel: {
    color: theme.palette.error.main
  },
  paymentMethodsItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
    background: theme.palette.type === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'none',
    border: '1px solid #' + (theme.palette.type === 'dark' ? '646464': 'dbe2f0'),
    borderRadius: 6,
    transition: 'all 0.3s',
    '&.default': {
      border: '2px solid #4a8af5'
    },
    '&.add': {
      '& svg': {
        fontSize: '1.75rem',
        color: '#4a8af5',
        filter: 'grayscale(0%)'
      }
    },
    '&.small': {
      filter: 'grayscale(100%)',
      borderWidth: 1,
      opacity: 0.7,
      transform: 'scale(0.7)'
    },
    '&.config': {
      borderWidth: 2,
      transform: 'scale(0.9)',
      '& svg, &:hover svg': {
        filter: 'grayscale(0%)' + (theme.palette.type === 'dark' ? ' brightness(200%)' : '')
      }
    },
    '&:hover svg': {
      filter: 'grayscale(40%)' + (theme.palette.type === 'dark' ? ' brightness(300%)' : '')
    },
    '& svg': {
      width: '1em',
      height: 'auto',
      fontSize: '3rem',
      filter: 'grayscale(100%)' + (theme.palette.type === 'dark' ? ' brightness(400%)' : ''),
      opacity: 0.8,
      transition: 'filter 0.2s'
    }
  },
  paymentMethodStateIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 14
  },
  backButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: 14,
    zIndex: 1,
    transform: 'translateY(-50%)',
    '& svg': {
      transform: 'translateX(4px)'
    }
  },
  trueCheckedIcon: {
    fill: theme.palette.primary.main
  },
  dialogPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // maxWidth: 364,
    borderRadius: 8,
    transition: 'min-height 0.8s'
  },
  cardIcon: {
    width: '2.5em',
    height: '100%'
  },
  bankAccountIcon: {
    width: '1.75em'
  },
  selectedIcon: {
    transition: 'opacity 0.2s ease-in-out'
  },
  addTitle: {
    transition: 'padding 0.2s ease-in-out'
  },
  addItem: {
    padding: [[18, 105, 18, 35]],
    '& + *': {
      right: 28
    }
  },
  addItemContainer: {
    transitionTimingFunction: 'cubic-bezier(0.84, 0, 0.78, 0.36) !important'
  },
  addText: {
    padding: [[0, 24]]
  },
  addNext: {
    width: '100%',
    padding: [[19, 0]],
    textAlign: 'center',
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[600] : '#4e90ea'
  },
  addNextDisabled: {
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300]
  },
  addStepper: {
    width: '100vw',
    maxWidth: 560
  },
  invoicesMoreButton: {
    display: 'block',
    padding: [[16, 0, 16, 28]],
    textAlign: 'left',
    textTransform: 'none',
    borderTop: '1px solid ' + theme.palette.grey[300],
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
  avatar: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : '#e8f0fe',
    '& svg': {
      color: '#4a8af5',
      opacity: 0.8
    }
  },
  expansionPanel: {
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
    boxShadow: 'none',
    borderBottom: '1px solid ' + (theme.palette.type === 'dark' ? theme.palette.type[700] : theme.palette.grey[300]),
    borderRadius: 0
  },
  expansionPanelSummary: {
    alignItems: 'center',
    '& > :first-child': {
      flex: 2,
      fontWeight: 400,
      fontSize: '1rem',
      letterSpacing: 'normal'
    },
    '& > :nth-child(2)': {
      flex: 3
    }
  },
  expansionPanelDetails: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridColumnGap: '35px',
    gridRowGap: '14px',
    paddingLeft: 70,
    paddingRight: 70,
    '& > *': {
      display: 'grid',
      gridTemplateColumns: '2fr 3fr'
    }
  }
}));

function PaymentOverview(props) {
  const [stripe, setStripe] = useState(null); // initial value must be null
  const [configTargetNode, setConfigTargetNode] = useState();
  const [configLoading, setConfigLoading] = useState(false);
  const [configExpiry, setConfigExpiry] = useState();
  const [configMakeDefault, setConfigMakeDefault] = useState();
  const [configPaymentMethod, setConfigPaymentMethod] = useState();
  const [confirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [launchWizardAfterAdding, setLaunchWizardAfterAdding] = useState();

  React.useEffect(() => {
    if(window.Stripe) {
      initStripe();
    }
    else {
      document.getElementById('stripe-js').addEventListener('load', initStripe);
    }

    return () => {
      document.getElementById('stripe-js').removeEventListener('load', initStripe);
    }
  }, []);

  React.useEffect(() => {
    if(configTargetNode) {
      document.querySelectorAll('#PaymentOverview section:first-of-type > div:last-child > *').forEach((node, index) => {
        if(index < 2) {
          node.style.transform = `translateX(-${configTargetNode.parentNode.offsetLeft - 56}px)`;
        }
        else {
          node.style.transform = 'translateX(0px)';
        }
      });
    }
  }, [configTargetNode]);


  function endAdding() {
    if(launchWizardAfterAdding && props.customer.sources.data.length) {
      Router.push('/d/payment/wizard');
    }
    else {
      setIsAdding(false);
    }
  }

  function endConfiguring() {
    document.querySelectorAll('#PaymentOverview section:first-of-type > div:last-child > *').forEach((node, index) => {
      if(index < 2) {
        node.style.transform = null;
      }
      else {
        node.style.transform = 'translateX(100%)';
      }
    });

    // wait for animation to complete
    setTimeout(() => {
      setConfigTargetNode(null);
      setConfigLoading(false);
      setConfigExpiry(null);
      setConfigMakeDefault(null);
      setConfirmDeletionOpen(false);
    }, 300);
  }

  function getIconByIssuer(issuer) {
    switch(issuer) {
      case 'American Express':
        return <Amex viewBox="0 0 482.51 374"/>;
      case 'MasterCard':
        return <Mastercard viewBox="0 0 482.51 374"/>;
      case 'Visa':
        return <Visa viewBox="0 0 482.51 374"/>;
    }
  }

  function intervalToGerman(interval, count) {
    let interval_german = "";
    if(interval === 'day') {
      interval_german = "Tag";
    }
    else if(interval === 'month') {
      interval_german = "Monat";
    }
    else if(interval === 'year') {
      interval_german = "Jahr";
    }

    if(count > 1) {
      interval_german += 'e';
    }

    return count + ' ' + interval_german;
  }

  function initStripe() {
    setStripe(window.Stripe(props.stripe.apiKey));
  }

  function onAddSubscriptionClick() {
    if(props.customer.sources.data.length) {
      Router.push('/d/payment/wizard');
    }
    else {
      setIsAdding(true);
      setLaunchWizardAfterAdding(true);
    }
  }


  const now = new Date();
  const classes = useStyles();
  return(
    <StripeProvider stripe={stripe}>
      <div id="PaymentOverview">
        <section className={classNames({isConfiguring: configTargetNode})}>
          <div className={classes.backButtonContainer}>
            <Zoom in={Boolean(configTargetNode)}>
              <IconButton onClick={endConfiguring}><ArrowBackIos/></IconButton>
            </Zoom>
          </div>
          <div>
            <div>
              <Typography variant="h6" component="h3">Zahlungsmethoden</Typography>
              <Typography>
                Hier können Kreditkarten und Bankverbindungen hinzugefügt werden. Anstehende Kosten werden monatlich automatisch abgebucht.
                <br/>
                <br/>
                Zum Verwalten einer Zahlungsmethode auf entsprechendes Icon klicken. "+"-Karte klicken, um hinzuzufügen.
              </Typography>
            </div>

            {props.customer === undefined ?
              <div className="indicator">
                <CircularProgress/>
              </div>
            :
              props.customer === null || !props.customer.sources ?
                <div className="indicator">
                  <Info title="Daten konnten nicht geladen werden" icon={<ErrorIcon/>} compact/>
                </div>
              :
              [
              <div key={0} className={classNames({
                  grid: props.customer.sources && props.customer.sources.data.length > 0,
                  center: props.customer.sources && props.customer.sources.data.length < 2,
                  flex: props.customer.sources && !props.customer.sources.data.length})}>
                {props.customer.sources && props.customer.sources.data.slice(0, 4).map((method, index) => {
                  const isDefaultSource = method.id === props.customer.default_source;
                  return(
                    <ButtonBase
                      key={index}
                      className={classNames(classes.paymentMethodsItem, {
                        default: isDefaultSource,
                        config: configTargetNode && configPaymentMethod.id === method.id,
                        small: configTargetNode && configPaymentMethod.id !== method.id
                      })}
                      disabled={method.type !== 'card'}
                      onClick={({currentTarget}) => {
                        setConfigTargetNode(currentTarget);
                        setConfigPaymentMethod(method);
                        setConfigMakeDefault(null);
                        setConfigExpiry(null);
                      }}
                    >
                      {method.type === 'card' ? getIconByIssuer(method.card.brand) : <AccountBalanceIcon/>}
                      {isDefaultSource ? <Typography variant="overline" className={classes.paymentMethodStateIndicator}>DEFAULT</Typography> : null}
                    </ButtonBase>
                  );
                })}

                {props.customer.sources && props.customer.sources.data.length < 4 ?
                  <ButtonBase key={0} className={classNames('add', classes.paymentMethodsItem, {small: configTargetNode})} onClick={() => {setIsAdding(true)}}>
                    <AddIcon/>
                  </ButtonBase>
                :
                  null
                }
              </div>,

              configTargetNode ?
                <div key={1} style={{transform: 'translateX(100%)'}}>
                  <List disablePadding>
                    <ListItem dense>
                      <ListItemText>
                        <Typography variant="subtitle1" component="h4">Kartennummer</Typography>
                        <Typography>**** **** **** {configPaymentMethod.card.last4}</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItemTextField
                      label="Verfallsdatum"
                      value={configExpiry || `${configPaymentMethod.card.exp_month.toString().length > 1 ? '' : '0'}${configPaymentMethod.card.exp_month} / ${configPaymentMethod.card.exp_year.toString().slice(-2)}`}
                      dense
                      InputProps={{inputComponent: ExpiryMask}}
                      labelProps={{component: 'h4'}}
                      onChange={value => setConfigExpiry(value)}
                    />
                    <ListItem disabled={props.customer.sources.data.length === 1}>
                      <ListItemText primaryTypographyProps={{variant: 'subtitle1'}}>Als Standard-Zahlungsmethode verwenden</ListItemText>
                      <ListItemSecondaryAction>
                        <Switch disabled={props.customer.sources.data.length === 1} onChange={(event, value) => setConfigMakeDefault(value)} checked={typeof configMakeDefault === 'boolean' ? configMakeDefault : configPaymentMethod.id === props.customer.default_source}/>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <div className="actions">
                    <div>
                      <IconButton disabled={props.customer.sources.data.length === 1 && props.customer.subscriptions.total_count > 0} onClick={() => setConfirmDeletionOpen(true)}><DeleteOutline style={{fill: 'currentColor'}}/></IconButton>
                    </div>
                    <StateButton label="Speichern" variant="contained" primary disabled={configLoading || !(
                      (configMakeDefault !== null && configMakeDefault !== (configPaymentMethod.id === props.customer.default_source)) ||
                      (configExpiry !== null && (parseInt(configExpiry.slice(0, 2)) !== configPaymentMethod.card.exp_month || configExpiry.slice(-2) !== configPaymentMethod.card.exp_year.toString().slice(-2)))
                    )} onClick={(cb) => {
                      const cardUpdate = {card: {}};
                      if(typeof configMakeDefault === 'boolean') {
                        cardUpdate.makeDefault = configMakeDefault;
                      }
                      if(typeof configExpiry === 'string') {
                        const exp_month = configExpiry.slice(0, 2);
                        const exp_year = parseInt(configExpiry.slice(-2));
                        if(parseInt(exp_month) !== configPaymentMethod.card.exp_month) {
                          cardUpdate.payload.exp_month = exp_month;
                        }
                        if(exp_year !== configPaymentMethod.card.exp_year.toString().slice(-2)) {
                          cardUpdate.payload.exp_year = parseInt(configPaymentMethod.card.exp_year.toString().slice(0, 2) + exp_year);
                        }
                      }

                      props.stripe.updateCard(configPaymentMethod.id, cardUpdate, (error, result) => {
                        cb(error);
                      });
                    }} onSuccess={endConfiguring}/>
                  </div>
                </div>
              : null
              ]
            }
          </div>
        </section>

        <section>
          <Typography variant="h6" component="h3">Abonnements</Typography>
          <div>
            {props.customer === undefined ?
              <CircularProgress/>
            :
              props.customer === null ?
                <Info title="Abonnements konnten nicht geladen werden" icon={<ErrorIcon/>} compact/>
              :
              props.customer !== null && props.subscriptions.length ?
                <div style={{flex: 1}}>
                  {props.subscriptions.map((subscription, index) => (
                    <ExpansionPanel key={index} className={classes.expansionPanel}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} classes={{content: classes.expansionPanelSummary}}>
                        <Typography variant="h6">{subscription.plan.product.name}</Typography>
                        {now.getTime() >= subscription.trial_start * 1000 && now.getTime() <= subscription.trial_end * 1000 ?
                          <Typography>Testphase (noch {formatDistance(now, new Date(subscription.trial_end * 1000), {locale: deLocale})})</Typography>
                        :
                        <Typography>nächste Abrechnung: {format(new Date(1000 * subscription.current_period_end), 'dd MMMM yyyy', {locale: deLocale})}</Typography>
                        }
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <div>
                          <Typography>Erstellt am:</Typography>
                          <Typography>{format(new Date(1000 * subscription.created), 'dd MMM. yyyy', {locale: deLocale})}</Typography>
                        </div>
                        <div>
                          <Typography>Zeitraum:</Typography>
                          <Typography>{format(new Date(1000 * subscription.current_period_start), 'dd MMM. yyyy', {locale: deLocale})} bis {format(new Date(1000 * subscription.current_period_end), 'dd MMM. yyyy', {locale: deLocale})}</Typography>
                        </div>
                        <div>
                          <Typography>Laufzeit:</Typography>
                          <Typography>{intervalToGerman(subscription.plan.interval, subscription.plan.interval_count)}</Typography>
                        </div>
                        <div>
                          <Typography>Verlängerung:</Typography>
                          <Typography>wird automatisch verlängert, falls nicht anders besprochen</Typography>
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))}
                </div>
              :
              props.products.some((product) => product.active && !props.subscriptions.some((subscription) => subscription.plan.product.id === product.id)) ?
                <ButtonBase
                  style={{width: '100%', maxWidth: 165, height: 104, maxHeight: '100%'}}
                  className={classNames('add', classes.paymentMethodsItem)}
                  onClick={onAddSubscriptionClick}
                >
                  <AddIcon/>
                </ButtonBase>
              :
              <Typography color="textSecondary" variant="h6" component="p">Sie haben keine Abonnements abgeschlossen.</Typography>
            }
          </div>
        </section>

        <section>
          <div>
            <Typography variant="h6" component="h3">Rechnungen</Typography>
            <Typography>Bisher in Rechnung gestellte Leistungen. Auf Element klicken um Details zu sehen.</Typography>
            <div>
              {props.invoices === undefined ?
                <CircularProgress/>
              :
                props.invoices === null ?
                  <Info title="Rechnungen konnten nicht geladen werden" icon={<ErrorIcon/>} compact/>
                :
                props.invoices.data.length ?
                  <List>
                    {props.invoices.data.map((invoice, index) => invoice.lines.data.map((line, index2) => (
                      <ListItem key={index + index2 / 10} button disableGutters divider={index2 === invoice.lines.total_count - 1 && !(index === props.invoices.data.length - 1 && index2 === invoice.lines.total_count - 1)} onClick={() => {
                        Router.push('/d/payment/invoice/' + invoice.id)
                      }}>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}><ShoppingCartOutlined fontSize="small"/></Avatar>
                        </ListItemAvatar>
                        <ListItemText>{line.plan ? line.plan.product ? line.plan.product.name : "Unbekannt" : line.description}{line.subscription ? ` (${format(new Date(1000 * invoice.created), 'LLLL yyyy', {locale: deLocale})})` : ''}</ListItemText>
                      </ListItem>
                    )))}
                  </List>
                :
                <Typography color="textSecondary" variant="h6" component="p">Es sind keine Rechnungen vorhanden.</Typography>
              }
            </div>
          </div>
          <Button className={classes.invoicesMoreButton} size="large" color="primary" fullWidth disabled={!props.invoices || !props.invoices.hasMore}>Vollständige Auflistung ansehen</Button>
        </section>


        <Dialog
          open={isAdding}
          classes={{paper: classes.dialogPaper}}
          onClose={endAdding}
        >
          <DialogTitle align="center" className={classes.addTitle}>Zahlungsmethode hinzufügen</DialogTitle>
          <Elements>
            <AddPaymentMethodForm onClose={endAdding}/>
          </Elements>
          {/* <List disablePadding style={this.state.addStep > 1 ? {position: 'unset', height: 0} : {position: 'unset'}}>
            {[
              ["Mastercard", <MastercardCard viewBox="0 0 750 471" className={classes.cardIcon}/>],
              ["Visacard", <VisaCard viewBox="0 0 750 471" className={classes.cardIcon}/>],
              ["American Express", <AmexCard viewBox="0 0 750 471" className={classes.cardIcon}/>],
              // ["Bank Account", <AccountBalanceIcon className={classes.bankAccountIcon}/>]
              ].map((item, index) => this.state.addStep === 2 && this.state.addSelectedIssuer !== item[0] ? null : (
            <Slide
            key={index}
            direction="right"
            in={this.state.addStep === 0 || this.state.addSelectedIssuer === item[0]}
            timeout={{enter: 0, exit: 150 + Math.floor(Math.random() * 600)}} mountOnEnter
            >
            <ListItem
            button={!(this.state.addStep > 0 && this.state.addSelectedIssuer === item[0])}
            disabled={index === 3}
            divider={index < 3}
            selected={this.state.addSelectedIssuer === item[0]}
            classes={{root: classes.addItem, container: this.state.addSelectedIssuer === index ? null : classes.addItemContainer}}
            ContainerProps={{'data-selected': this.state.addSelectedIssuer === item[0] && this.state.addStep > 0}}
            onClick={() => {this.setState({addSelectedIssuer: item[0]})}}
            >
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText className={classes.addText}>{item[0]}</ListItemText>
            <ListItemSecondaryAction>
            {this.state.addSelectedIssuer === item[0] ?
            <CheckIcon className={classes.selectedIcon}/>
            :
            null
            }
            </ListItemSecondaryAction>
            </ListItem>
            </Slide>
              ))}
          </List> */}
        </Dialog>

        <Dialog open={confirmDeletionOpen} onClose={() => {setConfirmDeletionOpen(false)}}>
          <DialogTitle>Zahlungsmethode entfernen?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.customer && configTargetNode && configPaymentMethod.id === props.customer.default_source && props.subscriptions.length > 0 ? "Diese Zahlungsmethode wird momentan für Abbuchungen verwendet. Wenn Sie diese entfernen, wird automatisch eine andere Zahlungsmethode für zukünftige Rechnungen verwendet." : ""}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus disabled={configLoading} onClick={() => {setConfirmDeletionOpen(false)}}>Abbrechen</Button>
            <Button disabled={configLoading} color="primary" onClick={() => {
              setConfigLoading(true);
              props.stripe.removeCard(configPaymentMethod.id, (error, result) => {endConfiguring()});
            }}>Entfernen</Button>
          </DialogActions>
        </Dialog>
      </div>
    </StripeProvider>
  );
}


export default connect(state => ({
  auth: state.auth,
  stripe: state.stripe,
  customer: state.stripeCustomer,
  invoices: state.invoices,
  subscriptions: state.stripeCustomer && state.stripeCustomer.subscriptions ? state.stripeCustomer.subscriptions.data : [],
  products: state.products || [],
  agreedOnSubscriptionNickname: state.profile.app_metadata.agreedOnSubscriptionNickname,
  reversal: state.profile.app_metadata.reversal
}))(props => <Layout><PaymentOverview {...props}/></Layout>);
