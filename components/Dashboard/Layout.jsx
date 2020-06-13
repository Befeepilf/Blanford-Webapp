import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/styles';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Router, {useRouter} from 'next/router';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/de';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import addHours from 'date-fns/addHours';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';

/* ICONS */
import MenuIcon from '@material-ui/icons/Menu';
import BugReportIcon from '@material-ui/icons/BugReport';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import SecurityIcon from '@material-ui/icons/Security';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FeedbackIcon from '@material-ui/icons/FeedbackOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import ChatIcon from '@material-ui/icons/Chat';
import PaymentIcon from '@material-ui/icons/Payment';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import BackupIcon from '@material-ui/icons/Backup';
import FunctionsIcon from '@material-ui/icons/Functions';

import getMuiTheme from '../../styles/getMuiTheme.js';

// import BetaDialog from './components/BetaDialog.jsx';
import WelcomeDialog from './WelcomeDialog.jsx';
import BrandName from '../BrandName.jsx';
import CustomNavBar from '../CustomNavBar.jsx';
import {LoadableLoading} from '../Loading';
import BugReport from './BugReport.jsx';
import QueueIcon from './icons/QueueIcon.jsx';
import '../../styles/Dashboard/Dashboard.scss';

const NavLinkWithRef = React.forwardRef((props, ref) => <Link href={props.href}><a {...Object.assign({}, props, {href: undefined})}/></Link>);

const useStyles = makeStyles(theme => ({
  dashboard: {
    height: '100%',
    overflow: 'hidden',
    color: theme.palette.text.primary,
    backgroundColor: (theme.palette.type === 'dark' ? theme.palette.background.primary : '#fff'),
    [theme.breakpoints.up('md')]: {
      '&.bgImage': {
        backgroundImage: 'url("https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=38348a3f06ad1aac3c30d26af26040e1&auto=format&fit=crop&w=1355&q=80")',
        backgroundSize: 'cover',
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backgroundBlendMode: theme.palette.type === 'dark' ? 'multiply' : 'lighten'
      }
    }
  },
  fullscreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    padding: 105,
    color: '#FFF',
    transform: 'scale(0)',
    opacity: 0,
    transition: 'transform 0.1s ease, background-color 0.5s ease, opacity 0.3s ease',
    '&.active': {
      zIndex: 2000,
      transform: 'scale(1)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 1,
      '& img': {
        objectFit: 'cover'
      }
    },
    '& .fullscreenElement': {
      maxWidth: '100%',
      maxHeight: '100%'
    },
    '& button': {
      alignSelf: 'flex-end',
      marginBottom: -48 - 14,
      marginRight: 14
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    margin: [[0, 'auto']],
    opacity: 0.85,
    [theme.breakpoints.up('md')]: {
      margin: [[0, 0, 0, 14]]
    }
  },
  alertContainer: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    //overflowX: 'auto',
    '& .alert': {
      margin: [[0, 14]],
      whiteSpace: 'nowrap',
      '&.hidden': {
        display: 'none'
      }
    },
    '& .alert-danger': {
      color: theme.palette.type === 'dark' ? red[400] : undefined,
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(114, 28, 36, 0.1)' : undefined,
      borderColor: theme.palette.type === 'dark' ? 'rgba(114, 28, 36, 0.6)' : undefined
    },
    '& .alert-warning': {
      color: theme.palette.type === 'dark' ? 'rgba(253, 216, 53, 0.9)' : undefined,
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(249, 168, 37, 0.03)' : undefined,
      borderColor: theme.palette.type === 'dark' ? 'rgba(253, 216, 53, 0.55)' : undefined
    }
  },
  menuIcon: {
    marginLeft: -7,
    marginRight: 21
  },
  profileIndicator: {
    padding: [[4, 7]],
    marginLeft: 'auto',
    textTransform: 'none'
  },
  profileMenuPaper: {
    marginLeft: -16 // profile indicator is Button & has padding of 16px horizontally -> make menu align with button text
  },
  drawer: {
    justifyContent: 'space-between',
    width: 280,
    height: 'calc(100% + 14px)',
    padding: [[28, 28, 28, 0]],
    marginTop: -14
  },
  drawerFade: {
    paddingRight: 0,
    backgroundColor: theme.palette.background.paper,
    border: 'none'
  },
  drawerNav: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  drawerListItem: {
    paddingLeft: 24,
    paddingRight: 14,
    margin: [[4, 0]],
    opacity: theme.palette.type === 'dark' ? 0.8 : 1,
    transition: 'all 0.3s',
    '&.active': {
      borderLeft: '2px solid #1b7ffc',
      backgroundColor: `rgba(27, 127, 252, ${theme.palette.type === 'dark' ? 0.02 : 0.04})`,
      opacity: 1,
      animationName: 'none',
      '& $drawerListItemText': {
        color: theme.palette.text.primary
      },
      '& $drawerIcon': {
        color: theme.palette.text.primary
      },
      '& > span': {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
      }
    }
  },
  drawerListItemSub: {
    display: 'block',
    fontSize: '0.6875rem'
  },
  '@keyframes drawerUnreadPulse': {
    from: {backgroundColor: 'transparent'},
    to: {backgroundColor: `rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.3)`}
  },
  drawerUnread: {
    animationName: 'drawerUnreadPulse',
    animationDuration: '1.5s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    '&::after': {
      content: "''",
      position: 'absolute',
      width: 7,
      height: 7,
      right: 21,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main
    }
  },
  drawerIcon: {
    minWidth: 'unset',
    marginRight: 14,
    color: theme.palette.text.secondary,
    '& svg': {
      color: 'inherit'
    }
  },
  drawerListItemText: {
    fontFamily: ['Gotham A', 'Gotham B', 'sans-serif'],
    color: theme.palette.text.secondary
  },
  drawerDivider: {
    margin: [[14, 0]]
  },
  drawerFooter: {
    paddingLeft: 24,
    opacity: theme.palette.type === 'dark' ? 0.6 : 0.9,
    '& a:first-child': {
      marginRight: 24
    }
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 56px)',
    bottom: 0,
    paddingTop: ({customNavBar}) => customNavBar ? 0 : 14,
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '& > :last-child': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: ({customNavBar}) => customNavBar ? 'calc(100% - 40px)' : '100%',
      padding: 14,
      paddingTop: 0,
      boxSizing: 'border-box',
      '& > :last-child': {
        flex: 1
      }
    },
    [theme.breakpoints.up('sm')]: {
      '& > :last-child': {
        padding: 28
      }
    },
    [theme.breakpoints.up('md')]: {
      // minHeight: '100%',
      paddingTop: 28
    }
  },
  '@media (min-width: 950px)': {
    content: {
      '& > *': {
        paddingBottom: 70
      }
    }
  },
  '@media (min-width: 1600px)': {
    alertContainer: {
      flex: 1,
      display: 'flex'
    }
  },
  '@media (-webkit-min-devie-pixel-ratio: 2), (min-resolution: 192dpi)': {
    title: {
      fontSize: '1.25rem'
    },
    drawerListItem: {
      padding: [[8, 16]]
    },
    drawerListItemText: {
      marginTop: 2,
      fontSize: '0.84rem'
    },
    drawerIcon: {
      '& svg': {
        fontSize: 22
      }
    }
  },
  contentShift: {
    width: 'calc(100% - 280px)',
    paddingLeft: 28,
    paddingRight: 70,
    marginLeft: 280,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

function Layout(props) {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpenMobile, setDrawerOpenMobile] = React.useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
  const [bugReportOpen, setBugReportOpen] = React.useState(false);


  // React.useEffect(() => {
  //   if(!prevProps.fullscreenElement && props.fullscreenElement) {
  //     const fullscreenContainer = document.getElementById('fullscreen');
  //     const fullscreenElement = fullscreenContainer.querySelector('.fullscreenElement');
  //
  //     if(prevProps.fullscreenOrigin && fullscreenElement) {
  //       fullscreenContainer.replaceChild(props.fullscreenElement, fullscreenElement);
  //     }
  //     else {
  //       fullscreenContainer.appendChild(props.fullscreenElement.cloneNode());
  //     }
  //   }
  // }, [props.fullscreenElement]);

  function toggleMobileDrawer() {
    setDrawerOpenMobile(!drawerOpenMobile);
  }

  const classes = useStyles({customNavBar: props.customNavBar && props.customNavBar.tabs});
  const router = useRouter();

  if(props.auth.isAuthenticated()) {
    if(props.profile.app_metadata.admin) {
      Router.replace('/admin');
    }
    else {
      const routes = [
        {
          title: "Home",
          href: '/d',
          icon: <HomeIcon/>
        },
        {
          title: "Workflow Überblick",
          href: '/d/workflow',
          icon: <ExploreIcon/>
        },
        {
          title: "To-Do Board",
          href: '/d/todos',
          icon: <ListAltIcon/>
        },
        {
          title: "Statistiken",
          href: '/d/statistics',
          icon: <DashboardIcon/>
        },
        {
          title: "Warteschlange",
          href: '/d/queue',
          icon: <QueueIcon/>
        },
        {
          title: "Aktuelles",
          href: '/d/events',
          icon: <EventIcon/>
        },
        {
          title: "Kontakt",
          href: '/d/threads',
          icon: <ChatIcon/>
        },
        {
          title: "Zahlungen & Abos",
          href: '/d/payment',
          icon: <PaymentIcon/>
        },
        {
          title: "Fragebogen",
          subtitle: props.answers ? `${Math.round(props.answers.filter(a => a.answer && a.answer.length).length / 19 * 100)}% ausgefüllt` : undefined,
          order: props.appointments && props.appointments.length ? 8 : undefined,
          href: '/d/you',
          icon: <StoreMallDirectoryIcon/>
        },
        'divider',
        {
          title: "Hochladen",
          href: '/d/upload',
          icon: <BackupIcon/>
        },
        'divider',
        {
          title: "Rechner",
          href: '/d/calculator',
          icon: <FunctionsIcon/>
        },
      ];

      let order = 0;
      const customOrders = [];
      const navItems = routes.map((route, index) => {
        let order = index + 1;
        if(route.order) {
          customOrders.push(route.order);
          order = route.order;
        }
        else if(customOrders.indexOf(index + 1) !== -1) {
          order += 1;
        }

        if(route === 'divider') {
          return <Divider key={route + order} style={{order}} className={classes.drawerDivider}/>;
        }

        return(
          <ListItem key={route.href} style={{order}} button component={NavLinkWithRef} href={route.href} className={classNames(classes.drawerListItem, {[classes.drawerUnread]: route.unread})}>
            <ListItemIcon className={classes.drawerIcon}>{route.icon}</ListItemIcon>
            <ListItemText classes={{primary: classes.drawerListItemText}}>{route.title}{route.subtitle ? <span className={classes.drawerListItemSub}>{route.subtitle}</span> : null}</ListItemText>
          </ListItem>
        )
      });

      navItems.push(
        <ListItem key={-1} style={{order: routes.length}} button component="a" href="https://de-de.facebook.com/business/tools/ads-manager" target="_blank" rel="noopener noreferrer" className={classes.drawerListItem}>
          <ListItemIcon className={classes.drawerIcon}><OpenInNewIcon/></ListItemIcon>
          <ListItemText classes={{primary: classes.drawerListItemText}}>Zu FB Ads Manager</ListItemText>
        </ListItem>
      );

      return(
        <main id="Dashboard" className={classNames(classes.dashboard, 'app', {bgImage:
          router.pathname.includes('/d/calendar') ?
            theme.palette.type === 'dark' ? true : false
          : !router.pathname.includes('/wizard')})} role="main">
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Hidden mdUp implementation="css">
                <IconButton onClick={toggleMobileDrawer} className={classes.menuIcon}><MenuIcon/></IconButton>
              </Hidden>

              <BrandName header wide showBeta={isUpMd} className={classes.title} linkProps={{target: '_blank'}}/>

              {isUpMd ?
                props.customNavBar && props.customNavBar.tabs ?
                  <CustomNavBar mobile={!isUpMd}/>
                  :
                  <div className={classes.alertContainer}>
                  {
                    props.profile.app_metadata.reversal ?
                      <div className="alert alert-danger">
                        <Typography color="inherit">Sie haben eine Stornierung beantragt. Ihr Konto und die damit verknüpften Daten werden {props.profile.app_metadata.reversal.deletionIn ? 'in ' + props.profile.app_metadata.reversal.deletionIn.replace('ein', 'einem') : 'bald '} gelöscht!</Typography>
                      </div>
                    :
                    null
                  }
                  {
                    props.profile.email_verified ?
                      null
                    :
                    <div className={classNames('alert', 'alert-warning')}>
                      <Typography color="inherit">Bitte bestätigen Sie Ihre E-Mail-Adresse.</Typography>
                    </div>
                  }
                </div>
              : null}

              <Button onClick={event => {setProfileMenuAnchor(event.currentTarget)}} className={classes.profileIndicator}>
                <Typography variant="subtitle1" className={classes.profileIndicator}>{props.profile.user_metadata.name || "Account"}</Typography>
                {props.profileMenuAnchor ?
                  <ExpandLessIcon/>
                :
                <ExpandMoreIcon/>
                }
              </Button>
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                classes={{paper: classes.profileMenuPaper}}
                className={classes.appBarMenu}
                onClose={() => {setProfileMenuAnchor(null)}}
              >
                <MenuItem onClick={() => {setProfileMenuAnchor(null); Router.push('/d/settings')}}>
                  <ListItemIcon><SettingsIcon/></ListItemIcon>
                  <ListItemText>Einstellungen</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {setProfileMenuAnchor(null); setBugReportOpen(true)}}>
                  <ListItemIcon><BugReportIcon/></ListItemIcon>
                  <ListItemText>Bug berichten</ListItemText>
                </MenuItem>
                <MenuItem component="a" href="mailto:contact@blanford.de" onClick={() => {setProfileMenuAnchor(null)}}>
                  <ListItemIcon><FeedbackIcon/></ListItemIcon>
                  <ListItemText>Feedback senden</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() => {props.dispatch({type: 'LOGOUT', relogin: true})}}>
                  <ListItemIcon><PowerSettingsNewIcon style={{fill: red[500]}}/></ListItemIcon>
                  <ListItemText>Abmelden</ListItemText>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          <Hidden smUp implementation="css">
            <SwipeableDrawer
              open={drawerOpenMobile}
              onOpen={() => {setDrawerOpenMobile(true)}}
              onClose={() => {setDrawerOpenMobile(false)}}
              classes={{paper: classes.drawer}}
            >
              <div onClick={() => {setDrawerOpenMobile(false)}}>
                <List component="nav" className={classes.drawerNav}>{navItems}</List>
              </div>
              <footer className={classes.drawerFooter}>
                <Typography variant="caption"><Link href="/privacy"><a target="_blank">Datenschutz</a></Link></Typography>
                <Typography variant="caption"><Link href="/sitenotice"><a target="_blank">Impressum</a></Link></Typography>
              </footer>
            </SwipeableDrawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer variant="persistent" anchor="left" open={isUpMd} classes={{paper: classNames(classes.drawer, classes.drawerFade)}}>
              <List component="nav" className={classes.drawerNav}>{navItems}</List>
              <footer className={classes.drawerFooter}>
                <Typography variant="caption"><Link href="/privacy"><a target="_blank">Datenschutz</a></Link></Typography>
                <Typography variant="caption"><Link href="/sitenotice"><a target="_blank">Impressum</a></Link></Typography>
              </footer>
            </Drawer>
          </Hidden>

          <div className={classNames(classes.content, {[classes.contentShift]: isUpMd})}>
            {!isUpMd && props.customNavBar && props.customNavBar.tabs ? <CustomNavBar mobile={!isUpMd}/> : null}
            <div id={props.id}>{props.children}</div>
          </div>

          <div id="fullscreen" className={classNames(classes.fullscreen, {active: Boolean(props.fullscreenElement)})} style={{transformOrigin: props.fullscreenOrigin}}>
            <IconButton color="inherit" onClick={() => {props.dispatch({type: 'FULLSCREEN', element: null})}}>
              <CloseIcon/>
            </IconButton>
          </div>

          {/* <BetaDialog open={betaDialogOpen}/> */}
          <WelcomeDialog/>
          <BugReport open={bugReportOpen} onClose={() => {setBugReportOpen(false)}}/>
          <Snackbar
            open={Boolean(props.notification)}
            message={props.notification ? typeof props.notification === 'string' ? props.notification : props.notification.message || "" : ""}
            anchorOrigin={(props.notification ? props.notification.anchorOrigin : null) || {horizontal: 'center', vertical: 'bottom'}}
            autoHideDuration={(props.notification ? props.notification.duration : null) || 5000}
            onClose={() => {props.dispatch({type: 'SET', data: {notification: undefined}})}}
          />
        </main>
      );
    }
  }
  else {
    props.dispatch({type: 'LOGOUT', relogin: true}); // make sure expired tokens get deleted (especially firebase_access_token to prevent duplicate creation of firebase app)
  }

  return null;
}


Layout = connect(({isBrowser, useragent, auth, notification, fullscreenElement, fullscreenOrigin, profile, ui, answers, appointments}) => ({
  isBrowser,
  useragent,
  auth,
  notification,
  fullscreenElement,
  fullscreenOrigin,
  customNavBar: ui.customNavBar,
  profile,
  answers,
  appointments
}))(Layout);


export default connect(({profile}) => ({darkTheme: profile.user_metadata.darkTheme}))(props => (
  <ThemeProvider theme={getMuiTheme('dashboard', props.darkTheme)}>
    <CssBaseline/>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
      <Layout id={props.id}>{props.children}</Layout>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
));
