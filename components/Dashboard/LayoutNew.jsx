import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ThemeProvider, makeStyles} from '@material-ui/styles';
import Router, {useRouter} from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';

import MenuIcon from '@material-ui/icons/Menu';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import BugReportIcon from '@material-ui/icons/BugReport';
import FeedbackIcon from '@material-ui/icons/FeedbackOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/de';

import getMuiTheme from '../../styles/getMuiTheme.js';

import BrandName from '../BrandName.jsx';
import Image from '../Image.jsx';


const useDrawerStyles = makeStyles(theme => ({
  ul: {
    padding: 0,
    marginBottom: 35,
    '& > *': {
      paddingLeft: 21,
      paddingTop: 2,
      paddingBottom: 2
    },
    [theme.breakpoints.between('md', 'md')]: {
      '& > *': {
        paddingLeft: 32
      }
    }
  },
  subheader: {
    fontSize: '0.8125rem',
    textTransform: 'uppercase'
  },
  navLinkActive: {
    backgroundColor: '#eee',
    '& $navLinkText': {
      fontWeight: 600,
      color: '#0c60f6',
    }
  },
  navLinkText: {
    fontFamily: ['Open Sans', 'sans-serif'],
    color: '#444444'
  }
}));

function DrawerContent(props) {
  const router = useRouter();
  const classes = useDrawerStyles();
  return(
    <List>
      <li>
        <ul className={classes.ul}>
          <ListSubheader disableSticky className={classes.subheader}>Einsehen</ListSubheader>
          {[
            ["Überblick", '/'],
            ["To-Do", '/todos'],
            ["Statistiken", '/statistics'],
            ["Chats", '/threads']
          ].map(([title, href]) => (
            <ListItem key={href} button className={classNames({[classes.navLinkActive]: router.pathname === `/d${href}`})} onClick={() => Router.push(`/d${href}`)}>
              <ListItemText primary={title} classes={{primary: classes.navLinkText}}/>
            </ListItem>
          ))}
        </ul>
      </li>

      <li>
        <ul className={classes.ul}>
          <ListSubheader disableSticky className={classes.subheader}>Bereitstellen</ListSubheader>
          {[
            ["Fragebogen", '/you'],
            ["Hochladen", '/upload']
          ].map(([title, href]) => (
            <ListItem key={href} button className={classNames({[classes.navLinkActive]: router.pathname === `/d${href}`})} onClick={() => Router.push(`/d${href}`)}>
              <ListItemText primary={title} classes={{primary: classes.navLinkText}}/>
            </ListItem>
          ))}
        </ul>
      </li>

      <li>
        <ul className={classes.ul}>
          <ListSubheader disableSticky className={classes.subheader}>Verwaltung</ListSubheader>
          {[
            ["Zahlung & Abonnement", '/payment'],
            ["Einstellung", '/settings']
          ].map(([title, href]) => (
            <ListItem key={href} button className={classNames({[classes.navLinkActive]: router.pathname === `/d${href}`})} onClick={() => Router.push(`/d${href}`)}>
              <ListItemText primary={title} classes={{primary: classes.navLinkText}}/>
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  appBar: {
    background: 'none',
    boxShadow: 'none'
  },
  toolbar: {
    padding: 0
  },
  drawerButton: {
    marginLeft: -12
  },
  subheader: {
    position: 'relative',
    padding: [[28, 0]],
    backgroundColor: '#000',
    transition: 'padding 0.3s',
    '& > :not(picture)': {
      position: 'relative',
      zIndex: 1
    },
    '& .bg': {
      opacity: 0.7
    }
  },
  subheaderShrink: {
    padding: [[14, 0]],
    '& $subheaderText:first-child': {
      fontSize: '1.75rem'
    }
  },
  subheaderText: {
    color: '#fff',
    transition: 'font-size 0.3s',
    '&:first-child': {
      fontFamily: ['ITC Cheltenham W03 Book', 'serif'],
      fontSize: '2.25rem'
    }
  },
  navContentContainer: {
    overflowY: 'auto'
  },
  navContainer: {
    position: 'sticky',
    minHeight: '100%',
    top: 0,
    paddingTop: 5.5,
    [theme.breakpoints.up('md')]: {
      borderRight: '1px solid #dbdbdd'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: `calc((100vw - ${theme.breakpoints.values.lg}px) / 2 + 11px)`
    }
  },
  contentContainer: {
    // position: 'sticky',
    // minHeight: '100%',
    // top: 'calc(100vh - 100% - 155px)',
    // paddingTop: 28,
    paddingTop: 33,
    paddingLeft: 24,
    paddingRight: 24,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 32
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: `calc((100vw - ${theme.breakpoints.values.lg}px) / 2 + 32px)`
    }
  },
  footer: {
    padding: [[28, 24, 28, 24]],
    marginTop: 280,
    zIndex: 1,
    fontSize: '0.875rem',
    color: '#fff',
    backgroundColor: '#0a2a66',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: `calc((100vw - ${theme.breakpoints.values.lg}px) / 2 + 22px)`,
      paddingRight: `calc((100vw - ${theme.breakpoints.values.lg}px) / 2 + 32px)`
    }
  },
  footerBrandName: {
    color: 'grey'
  }
}));

function Layout(props) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState();
  const [bugReportOpen, setBugReportOpen] = useState(false);

  React.useEffect(() => {
    if(!props.auth.isAuthenticated()) {
      props.auth.login();
    }
  }, []);

  function closeAccountMenu() {
    setAccountMenuAnchor(null);
  }

  const maxWidth = 'lg';
  const router = useRouter();
  const classes = useStyles();
  return(
    <React.Fragment>
      <Grid container direction="column" wrap="nowrap" id="Dashboard" className={classes.root}>
        <Grid item>
          <AppBar position="relative" className={classes.appBar}>
          <Container maxWidth={maxWidth}>
            <Toolbar className={classes.toolbar}>
              <Grid container justify="space-between" alignItems="center">
                <Hidden mdUp implementation="css">
                  <IconButton className={classes.drawerButton} onClick={() => setMobileDrawerOpen(true)}><MenuIcon/></IconButton>
                </Hidden>
                <Hidden smDown implementation="css"><span></span></Hidden> {/* placeholder to center BrandName */}

                <BrandName wide showBeta={false}/>

                <Button aria-controls="account-menu" aria-haspopup="true" style={{textTransform: 'none'}} onClick={({currentTarget}) => setAccountMenuAnchor(currentTarget)}>
                  <Typography variant="subtitle1">{props.profile.user_metadata.name || "Account"}</Typography>
                  {accountMenuAnchor ?
                    <ExpandLessIcon/>
                    :
                    <ExpandMoreIcon/>}
                </Button>
                <Menu
                  id="account-menu"
                  anchorEl={accountMenuAnchor}
                  keepMounted
                  open={Boolean(accountMenuAnchor)}
                  onClose={closeAccountMenu}
                  >
                  <MenuItem onClick={() => Router.push('/d/settings')}>
                    <ListItemIcon><SettingsIcon/></ListItemIcon>
                    <ListItemText>Einstellungen</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => {closeAccountMenu(); setBugReportOpen(true)}}>
                    <ListItemIcon><BugReportIcon/></ListItemIcon>
                    <ListItemText>Fehler melden</ListItemText>
                  </MenuItem>
                  <MenuItem component="a" href="mailto:contact@blanford.de" onClick={closeAccountMenu}>
                    <ListItemIcon><FeedbackIcon/></ListItemIcon>
                    <ListItemText>Feedback geben</ListItemText>
                  </MenuItem>
                  <Divider/>
                  <MenuItem onClick={() => props.dispatch({type: 'LOGOUT', relogin: true})}>
                    <ListItemIcon><PowerSettingsNewIcon style={{fill: red[500]}}/></ListItemIcon>
                    <ListItemText>Abmelden</ListItemText>
                  </MenuItem>
                </Menu>
              </Grid>
            </Toolbar>
          </Container>

          <div className={classNames(classes.subheader, {[classes.subheaderShrink]: router.pathname.split('/').length > 2 && router.pathname.split('/')[2].length})}>
            <Image name="dashboard-header.jpg" retina className="bg"/>
            <Container maxWidth={maxWidth}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography className={classes.subheaderText}>{props.profile.user_metadata.name}{props.profile.user_metadata.companyName ? `, ${props.profile.user_metadata.companyName}` : ''}</Typography>
                  <Typography className={classes.subheaderText}></Typography>
                  {/*<Typography className={classes.subheaderText}>Leadgen ROI Score: 4.12x</Typography>*/}
                </Grid>
                <Grid item>
                  <div className={classes.card}></div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </AppBar>
        </Grid>

        <Grid item container className={classes.navContentContainer}>
          <Grid item xs={false} md="auto" className={classes.navContainer}>
            <nav aria-label="">
              <Hidden mdUp implementation="css">
                <Drawer
                  variant="temporary"
                  open={mobileDrawerOpen}
                  onClose={() => setMobileDrawerOpen(false)}
                  ModalProps={{keepMounted: true}}
                  >
                  <DrawerContent/>
                </Drawer>
              </Hidden>
              <Hidden smDown implementation="css">
                <DrawerContent/>
              </Hidden>
            </nav>
          </Grid>

          <Grid item xs={12} md className={classes.contentContainer}>
            {props.children}
          </Grid>

          <Grid item container xs={12} spacing={4} className={classes.footer}>
            <Grid item xs={4}>
              Sie sind momentant mit Ihrem kostenlosen, unverbindlichen Nutzeraccount angemeldet.
            </Grid>
            <Grid item xs={4}>
              Wenn Sie Ihren Account und dessen Daten doch wieder löschen möchten, können Sie dies hier tun.
            </Grid>
            <Grid container item spacing={3} xs={12} style={{marginTop: 35, borderTop: '1px solid grey'}}>
              <Grid item xs>
                <BrandName showBeta={false} wide className={classes.footerBrandName}/>
              </Grid>
              <Grid item>
                <Link href="/privacy"><a style={{marginRight: 14, color: 'grey'}}>Datenschutz</a></Link>
                <Link href="/sitenotice"><a style={{color: 'grey'}}>Impressum</a></Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={Boolean(props.notification)}
        message={props.notification ? typeof props.notification === 'string' ? props.notification : props.notification.message || "" : ""}
        anchorOrigin={(props.notification ? props.notification.anchorOrigin : null) || {horizontal: 'center', vertical: 'bottom'}}
        autoHideDuration={(props.notification ? props.notification.duration : null) || 5000}
        onClose={() => {props.dispatch({type: 'SET', data: {notification: undefined}})}}
      />
    </React.Fragment>
  );
}

Layout = connect(({auth, profile, notification}) => ({auth, profile, notification}))(Layout);


export default connect(({profile}) => ({darkTheme: profile.user_metadata.darkTheme}))(props => (
  <ThemeProvider theme={getMuiTheme('dashboard', props.darkTheme)}>
    <CssBaseline/>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
      <Layout>{props.children}</Layout>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
));
