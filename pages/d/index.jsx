import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import Router from 'next/router';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {ChatBubbleOutline, AlternateEmail} from '@material-ui/icons';
import Layout from '../../components/Dashboard/Layout.jsx';
import Hint from '../../components/Dashboard/Hint.jsx';

const NavLinkWithRef = React.forwardRef((props, ref) => <div><Link href={props.href}><a {...Object.assign({}, props, {href: undefined})}/></Link></div>);

function ChatIcon() {
  return(
    <svg viewBox="0 0 24 24" aria-hidden="true" role="presentation" style={{width: '1em', height: '1em', fontSize: 'inherit'}}>
      <defs>
        <clipPath id="clip">
          <polygon points="0,0 24,0 24,20"/>
        </clipPath>
        <linearGradient id="gradient" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ab5e4" />
          <stop offset="50%" stopColor="#2a77ea" />
          <stop offset="75%" stopColor="#0ab5e4" />
        </linearGradient>
      </defs>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="currentColor"></path>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="url(#gradient)" clipPath="url(#clip)"></path>
    </svg>
  );
}



const useStyles = makeStyles(theme => ({
  columns: {
    columnCount: 1,
    maxWidth: 420,
    margin: [[28, 'auto', 0, 'auto']],
    [theme.breakpoints.up('lg')]: {
      columnCount: 2,
      maxWidth: 854
    }
  },
  title: {
    marginBottom: 14,
    fontSize: '1.85rem',
    fontWeight: 300
  },
  text: {
    margin: [[0, 'auto']],
    fontSize: '0.9375rem',
    color: theme.palette.type === 'dark' ? null : '#5f6368'
  },
  list: {
    listStyleType: 'none',
    margin: [14, 0, 0, 0]
  },
  orderedList: {
    counterReset: 'ordered-list-counter',
    '& li': {
      position: 'relative',
      margin: [21, 0],
      '&:before': {
        content: 'counter(ordered-list-counter)',
        counterIncrement: 'ordered-list-counter',
        position: 'absolute',
        left: -35,
        fontSize: '0.9375rem',
        fontWeight: 'bold'
      },
      '&:first-child': {
        marginTop: 0
      },
      '&:last-child': {
        marginBottom: 0
      },
      '&:hover > *': {
        color: theme.palette.type === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900]
      },
      '& > *': {
        fontSize: '0.85rem',
        color: theme.palette.type === 'dark' ? null : '#555656'
      }
    }
  },
  listItem: {
    paddingLeft: 4
  },
  listPrimaryText: {
    marginBottom: 4,
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600
  },
  listIcon: {
    marginRight: 4,
    fontSize: 36,
    color: theme.palette.type === 'dark' ? null : '#b2b4b7'
  }
}))

function Hints(props) {
  React.useEffect(() => {
    props.dispatch({type: 'SET', data: {ui: {hintsPageMountedAgain: true}}}); //hintsPageMountedAgain to only show enter animation of hint cards once
  }, []);

  const classes = useStyles();
  return(
    <Grid container direction="column">
      <div>
        <Typography align="center" variant="h4" component="h2" className={classes.title}>Willkommen!</Typography>
        <Typography align="center" className={classes.text}>Vielen Dank für das Erstellen eines Accounts!<br/>Ihre Accountdaten sind vertraulich und werden verschlüsselt behandelt.</Typography>
      </div>

      <div className={classes.columns}>
        <Hint title="Stets verfügbar für Unterstützung" contentProps={{style: {paddingBottom: 7}}}>
          <Typography className={classes.text}>Als Blanford-Kunde erhalten Sie unbegrenzten Support via Chat & E-Mail.</Typography>
          <List disablePadding style={{paddingTop: 14, paddingRight: 0}}>
            <ListItem button divider className={classes.listItem} component={NavLinkWithRef} href="/d/threads">
              <ListItemIcon className={classes.listIcon}><ChatIcon/></ListItemIcon>
              <ListItemText classes={{primary: classes.listPrimaryText}} primary="Chat" secondary={`Via "Threads" Tab in linker Seitenleiste`}/>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.listIcon}><AlternateEmail fontSize="inherit"/></ListItemIcon>
              <ListItemText classes={{primary: classes.listPrimaryText}} primary="E-Mail" secondary="contact@blanford.de"/>
            </ListItem>
          </List>
        </Hint>

        <Hint title="Haben Sie eine geschäftliche Anfrage?">
          <Typography className={classes.text}>
            Sie können auch dafür die <Link href="/d/threads"><a>Chat-Funktion</a></Link> nutzen oder über E-Mail Kontakt aufnehmen, unter <a href="mailto:contact@blanford.de"><u>contact@blanford.de</u></a>.
          </Typography>
        </Hint>

        <Hint title="Arbeitsablauf & Schritte zum Beginnen" actionLabel="Details zu Workflow auf Website nachlesen" actionProps={{href: '/overview#process', target: '_blank'}}>
          <Typography className={classes.text}>Quick Start Guide:</Typography>
          <ol className={classNames(classes.list, classes.orderedList)}>
            <li style={{cursor: 'pointer'}} onClick={() => {Router.push('/you');}}>
              <Typography>Navigieren Sie zum Tab "Ihr Unternehmen" und nehmen Sie sich ein wenig Zeit, die Informationen zu vervollständigen.</Typography>
            </li>
            <li style={{cursor: 'pointer'}} onClick={() => {Router.push('/d/threads');}}>
              <Typography>Navigieren Sie zum Tab "Threads" und besprechen Sie sich mit uns. Wir werden uns über Ihren Fall beraten, um Ihnen dann hilfreiche Hinweise zu geben.</Typography>
            </li>
          </ol>
        </Hint>
      </div>
    </Grid>
  );
}


export default connect(({firestore, profile}) => ({firestore, userId: profile.user_id}))(props => <Layout id="Index"><Hints {...props}/></Layout>);
