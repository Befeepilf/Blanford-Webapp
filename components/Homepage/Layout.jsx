import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {ThemeProvider, makeStyles, useTheme} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PlaceOutlined from '@material-ui/icons/PlaceOutlined';
import CallIcon from '@material-ui/icons/Call';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import smoothscroll from 'smoothscroll-polyfill';

import getMuiTheme from '../../styles/getMuiTheme.js';

import Image from '../Image.jsx';
import BrandName from '../BrandName.jsx';
import {LoadableLoading} from '../Loading';
import Collapsable from '../Collapsable.jsx';
import FacebookIcon from './icons/Facebook.svg';
import Facebook2Icon from './icons/Facebook2.svg';
import LinkedinIcon from './icons/Linkedin.svg';
import Linkedin2Icon from './icons/Linkedin2.svg';
import TwitterIcon from './icons/Twitter.svg';
import Twitter2Icon from './icons/Twitter2.svg';
import '../../styles/Homepage/Homepage.scss';


function FooterCollapsable(props) {
  const theme = useTheme();
  return(
    <Collapsable
      title={props.title}
      alwaysExpanded={useMediaQuery(theme.breakpoints.up('sm'))}
      customClasses={{root: 'collapsable', summary: 'summary', summaryContent: 'summaryContent', summaryExpanded: 'summaryExpanded', expandIcon: 'expandIcon', details: 'details'}}
    >
      {props.children}
    </Collapsable>
  );
}


const useStyles = makeStyles(theme => ({
  bg: {
    backgroundColor: theme.palette.background.primary,
    transition: 'background-color 0.7s ease'
  },
  color: {
    color: theme.palette.text.primary
  }
}));

function Layout(props) {
  const [headerOpen, setHeaderOpen] = React.useState(false);
  const [expandedNav, setExpandedNav] = React.useState();

  React.useEffect(() => {
    smoothscroll.polyfill();

    window.fbAsyncInit = () => {
      FB.init({
        appId: '653514088408646',
        xfbml: true,
        version: 'v4.0'
      });
    };
  }, []);

  // React.useEffect(() => {
  //   setHeaderOpen(false);
  // }, [router.pathname]);

  function scrollToSignupSection() {
    const signup = document.querySelector('.signup');
    if(signup) {
      if(headerOpen) {
        setHeaderOpen(false);
        signup.scrollIntoView({behavior: 'smooth'});
      }
      else {
        signup.scrollIntoView({behavior: 'smooth'});
      }
    }
  }

  function toggleHeader() {
    setHeaderOpen(!headerOpen);
  }

  function login() {
    props.auth.login();
  }

  const isAuthenticated = props.auth.isAuthenticated();
  const router = useRouter();
  const classes = useStyles();
  const hideSignupButton = false;
  return(
    <main id="Homepage" className={classNames('app', classes.bg, classes.color)} role="main" style={{overflowY: headerOpen ? 'hidden' : 'auto'}}>
      <Head>
        <script id="facebook-jssdk" src="https://connect.facebook.net/de_DE/sdk/xfbml.customerchat.js" async></script>
      </Head>

      <div id="fb-root"></div>

      <div className="fb-customerchat"
        attribution="setup_tool"
        page_id="330315040928448"
        theme_color="#0084ff"
        logged_in_greeting="Hey! Wie können wir Ihnen helfen?"
        logged_out_greeting="Hey! Wie können wir Ihnen helfen?"
        greeting_dialog_display="hide">
      </div>

      <header className={classNames(classes.bg, {active: headerOpen, narrow: !hideSignupButton})}>
        <div className="container">
          <BrandName header wide/>
          <Button className="mobile signupButton" onClick={scrollToSignupSection}>Account erstellen</Button>
          <IconButton className="mobile" onClick={toggleHeader}>{headerOpen ? <CloseIcon/> : <MenuIcon/>}</IconButton>
          <nav>
            <p className="mobile">
              Schön Sie zu sehen! {isAuthenticated ? [<Link key={0} href="/d"><a>Dashboard</a></Link>, " öffnen"] : ["Bitte ", <span key={1} role="button" onClick={login}>loggen Sie sich ein</span>, "."]}
              <br/>
              Alternativ: <span role="button" onClick={scrollToSignupSection}>Neuen Account erstellen</span>
            </p>

            <Link href="/"><a><span>AUM Acquisition Program</span></a></Link>
            {/*<ClickAwayListener onClickAway={() => {setExpandedNav(null)}}>*}
              {/* important to wrap Collapsable to make ref forwardable */}
              {/*<div className="collapsable">
                <Collapsable
                  title="Wie es funktioniert"
                  expanded={expandedNav === 1}
                  onChange={() => {setExpandedNav(1)}}
                  customClasses={{
                    root: 'collapsable',
                    expanded: 'expanded',
                    summary: 'summary',
                    summaryExpanded: 'summaryExpanded',
                    summaryContent: classNames('summaryContent', {'active': router.pathname.match(/overview|faq|kpi/)}),
                    expandIcon: 'expandIcon',
                    details: 'details'
                  }}
                >
                  <Link href="/overview"><a>Überblick</a></Link>
                  <Link href="/faq"><a>FAQs</a></Link>
                  <Link href="/kpi"><a>KPIs</a></Link>
                </Collapsable>
              </div>
            </ClickAwayListener>*/}
            <Link href="/about"><a><span>Über Uns</span></a></Link>
            <Link href="/blog"><a><span>Blog</span></a></Link>
            <Link href="/beta"><a><span>Beta Program</span></a></Link>
          </nav>
          <div className="desktop account-container">
            {isAuthenticated ?
              <Link href="/d"><a>Dashboard</a></Link>
              :
              <button onClick={login}>Log In</button>}

            {hideSignupButton || isAuthenticated ? null : <span className="separator"> / </span>}

            {hideSignupButton || isAuthenticated ? null : <button className="create" onClick={scrollToSignupSection}>Registrieren</button>}
          </div>
        </div>
      </header>

      <div className="pageContent">
        <div id={props.id} className={props.className}>{props.children}</div>
      </div>

      <footer className={classNames({dark: false})}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 bottom">
              <div className="left">
                <BrandName showRegisteredTrademark/>
                <p className="description">Digitale Prozesse & Systeme für Finanzberater, Finanzplaner, Versicherungsmakler & Vermögensverwalter</p>
              </div>
              <div className="right desktop">
                <Link href="/sitenotice"><a>Impressum</a></Link>
                <Link href="/icons"><a>Icon Bibliography</a></Link>
                <IconButton href="https://twitter.com/BlanfordDigital" target="_blank" rel="noopener noreferrer"><Twitter2Icon/></IconButton>
                <IconButton href="https://www.linkedin.com/company/35658113/admin/" target="_blank" rel="noopener noreferrer"><Linkedin2Icon/></IconButton>
                <IconButton href="https://www.facebook.com/pg/Blanford-Team-330315040928448" target="_blank" rel="noopener noreferrer"><Facebook2Icon/></IconButton>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-12">
              <FooterCollapsable title="Programme">
                <ul>
                  <li>
                    <Link href="/"><a>AUM Acqusition Program</a></Link>
                  </li>
                  <li>
                    <Link href="/beta"><a>Beta Program (unentgeltlich)</a></Link>
                  </li>
                  <li>
                    <Link href="/referral"><a>Referrals</a></Link>
                  </li>
                </ul>
              </FooterCollapsable>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <FooterCollapsable title="Unternehmen">
                <ul>
                  <li className="dekstop">
                    <Link href="/privacy"><a>Datenschutz</a></Link>
                  </li>
                  <li>
                    <Link href="/about"><a>Über Blanford</a></Link>
                  </li>
                  <li className="location">
                    <PlaceOutlined/>
                    <p>Oldenburg (Oldb), NI</p>
                  </li>
                </ul>
              </FooterCollapsable>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <FooterCollapsable title="Fragen & Kontakt">
                <ul>
                  <li>
                    <a href="mailto:contact@blanford.de">contact@blanford.de</a>
                  </li>
                  <li>
                    <a href="mailto:support@blanford.de">support@blanford.de</a>
                  </li>
                  <li>
                    <Link href="/faq"><a>Häufig gestellte Fragen (FAQ)</a></Link>
                  </li>
                </ul>
              </FooterCollapsable>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <FooterCollapsable title="Account">
                <ul>
                  <li>
                    {props.auth.isAuthenticated() ?
                      <Link href="/d"><a>Zum Dashboard</a></Link>
                    :
                    <a role="button" onClick={login} style={{cursor: 'pointer'}}>Einloggen</a>
                    }
                  </li>
                </ul>
              </FooterCollapsable>
            </div>
          </div>

          <Button className="mobile cta" onClick={scrollToSignupSection}>
            <CallIcon/>
            Anruf vereinbaren
          </Button>

          <div className="mobile social">
            <IconButton href="https://www.facebook.com/pg/Blanford-Team-330315040928448" target="_blank" rel="noopener noreferrer" aria-label="Blanfords Facebook-Seite"><FacebookIcon/></IconButton>
            <IconButton href="https://www.linkedin.com/company/35658113/admin/" target="_blank" rel="noopener noreferrer" aria-label="Blanfords LinkedIn-Seite"><LinkedinIcon/></IconButton>
            <IconButton href="https://twitter.com/BlanfordDigital" target="_blank" rel="noopener noreferrer" aria-label="Blanfords Twitter-Seite"><TwitterIcon/></IconButton>
          </div>

          <div className="mobile legal">
            <Link href="/privacy"><a>Datenschutz</a></Link>
            <Link href="/sitenotice"><a>Impressum</a></Link>
          </div>

          <small>
            <p className="copyright">2019, Blue Logan UG (haftungsbeschränkt)</p>
            <p>
              Diese Webseite ist kein Teil von Facebook oder Facebook Inc. Auch ist Facebook kein Befürworter dieser Seite in irgend einer Weise.
              <br/>
              FACEBOOK ist ein Markenzeichen von FACEBOOK Inc.
            </p>
          </small>
        </div>
      </footer>

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

Layout = connect(({routes, auth, firebase, homepageVariant, notification}) => ({routes, auth, firebase, homepageVariant, notification}))(Layout);

export default props => {
  const {pathname} = useRouter();
  return(
    <ThemeProvider theme={getMuiTheme('homepage', pathname.includes('beta') && false)}>
      <CssBaseline/>
      <Layout {...props}/>
    </ThemeProvider>
  );
}
