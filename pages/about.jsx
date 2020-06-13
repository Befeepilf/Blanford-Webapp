import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckIcon from '@material-ui/icons/Check';
import {virtualize, bindKeyboard} from 'react-swipeable-views-utils';
import {mod} from 'react-swipeable-views-core';
import Layout from '../components/Homepage/Layout.jsx';
import Image from '../components/Image.jsx';
import SignUp from '../components/Homepage/SignUp.jsx';
import BoatBg from '../components/Homepage/icons/BoatBg.svg';
import PaperPlanesBg from '../components/Homepage/icons/PaperPlanesBg.svg';
import RocketBg from '../components/Homepage/icons/RocketBg.svg';
import '../styles/Homepage/About.scss';

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));
function swipeables0Renderer(params) {
  const {index, key} = params;
  let slide;
  switch (mod(index, 8)) {
    case 0:
      slide = {
        imgName: 'ppc-group0.png',
        title: "High-ROI, Finanzberater-spezielle Sales Funnels",
        text: "Unsere hauptsächliche Beschäftigung ist das Etablieren und Verbessern eines verlässlichen Sales Funnels, welcher Interessenten selbst mittels möglichst geringen Ausgaben und wenigen Zwischenschritten zu einer Terminabsprache mit Ihnen motiviert. Dieser Prozess wird kontinuierlich betrieben und ist damit unendlich wiederholbar."
      };
      break;

    case 1:
      slide = {
        imgName: 'ppc-group1.png',
        title: "#LinkedIn",
        text: "Steigern der Anzahl an Leads generiert durch Ihr Nutzen von LinkedIn durch bessere Strategie und persönliche Tipps"
      };
      break;


    case 2:
      slide = {
        imgName: 'about-slide-2.jpg',
        title: "Bessere Kenntnis des Kundens",
        text: "Kenntnis über Gedanken und die Situation des Kunden ist das wichtigste Element für rentables Marketing, da andernfalls das Ansprechen der Zielgruppe nicht gut genug funktioniert. Durch mehrere Fragebögen und besseres Beobachten des Kunden tragen wir Wissen zusammen, stellen Hypothesen auf und testen diese."
      };
      break;

    case 3:
      slide = {
        imgName: 'about-slide-3.jpg',
        title: "Genaues Bewusstsein über Ihre Marketing-Effizienz",
        text: "Schnelle, unkomplizierte Einsicht auf die Rendite Ihres Werbeaufwands durch Statistiken, welchen Sie die relevantesten Key Performance Indicators (“KPIs”) hinsichtlich Ad Performance und letztendlicher Profitabilität entnehmen können."
      };
      break;

    case 4:
      slide = {
        imgName: 'ppc-group2.png',
        title: "60x bessere Praktiken für Anzeigen",
        text: "Durch Vertrautheit mit algorithmischen Eigenschaften und Eigenheiten, Kenntnis über Performance-beeinflussende Umgebung und Schaffen der optimalen Anzahl an Variationen, bestem Einsetzen von Facebooks Auto-Optimization Prozess und bereits bewährten Formaten für Anzeigentext und Positionierung lassen sich die bestmöglichen Resultate für geringere Kosten erzielen."
      };
      break;

    case 5:
      slide = {
        imgName: 'about-slide-5.jpg',
        title: "Back-End & Re-Marketing",
        text: "Effektive E-Mail Sequenzen, Einsetzen von Facebook Re-Targeting und Lookalike Retargeting sowie der optimalen Kombination aus Ad Networks außerhalb Social Media."
      };
      break;

    case 6:
      slide = {
        imgName: 'about-slide-6.jpg',
        title: "Natürliche Selektion Targeting Ansatz",
        text: "Ansatz, bei dem sich Interessenten selbst identifizieren, anstatt dass Interessenten vom Werbetreibenden aktiv selbst identifiziert werden müssen."
      };
      break;

    case 7:
      slide = {
        imgName: 'psychology.jpg',
        title: "Image & Consumer Psychology",
        text: "Einzigartige, herausstechende Positionierung und Individualisierung des Online Sales Ablaufs für Ihre Ziele."
      };
      break;
  }

  return(
    <div key={index}>
      <Image name={slide.imgName} style={mod(index, 8) === 0 || mod(index, 8) === 1 || mod(index, 8) === 4 ? {objectFit: 'scale-down'} : {}}/>
      <h4>{slide.title}</h4>
      <p>{slide.text}</p>
    </div>
  );
}
function swipeables1Renderer(params) {
  const {index, key} = params;
  let slide;
  switch (mod(index, 6)) {
    case 0:
      slide = {
        title: "Kontinuierliche Resultate mit großartigem ROI",
        text: (
          <p>
            Zielpunkt: Variabilität der Anzahl an Leads in einem gegebenen Monat reduzieren, während Anzahl der Leads selbst und die Qualität dieser hoch ist in Verhältnis zur Höhe der Werbeausgaben.
            <br/>
            Unser Fortschritt: Dieses Ziel zu erreichen ist von Anfang an unverzichtbar, zugleich gibt es in Theorie keine Begrenzung, bis zu welchem Punkt Verbesserungen möglich wären.
          </p>
        )
      };
      break;

    case 1:
      slide = {
        title: "Weniger Arbeitsaufwand für den Berater",
        text: (
          <p>
            Zielpunkt: Die Arbeitsbeteiligung unseres Kunden gänzlich senken.
            <br/>
            Unser Fortschritt: Wir übernehmen bereits meiste Aufgaben – 85% davon. Für die verbleibenden 15% ist eine Stellvertretung schwierig, da spezifisches Fachwissen, das Urteil des Beraters selbst oder Ihre Entscheidungskraft gefragt ist.
          </p>
        )
      };
      break;

    case 2:
      slide = {
        title: "Sofortige Resultate",
        text: (
          <p>
            Zielpunkt: Resultate mithin wenigen Stunden.
            <br/>
            Unser Fortschritt: Dies ist einer der kniffligeren Zielpunkte. Momentan braucht es noch mindestens ein einige Wochen, um klare Erträge zu vermerken, jedoch erdenklich dieses Problem zukünftig mit einem einzelnen Lösungsansatz zu überwinden.
          </p>
        )
      };
      break;

    case 3:
      slide = {
        title: "Entfliehen des Wettbewerbs",
        text: (
          <p>
            Zielpunkt: Beratern erfolgreich helfen, durch das Wählen der geeignetsten Marktnische Konkurrenz zu reduzieren und sich besser positionieren zu können.
            <br/>
            Unser Fortschritt: Bisher entwickeln wir noch Ansätze, dies für jeden Berater effektiv und verlässlich durchführen zu können.
          </p>
        )
      };
      break;

    case 4:
      slide = {
        title: "Sofortig verfügbarer, unmittelbar hilfreicher, 24/7/365 Support",
        text: (
          <p>
            Zielpunkt: Hilfestellung für den Kunden, welche sofort und nachhaltig das Problem löst oder die Frage beantwortet.
            <br/>
            Unser Fortschritt: Bisher bieten wir eine 18-Stunden-Antwort-Garantie für Chat Anfragen und Sie können jederzeit über unseren Anrufkalender eine Besprechung eintragen. Unser Chat hat den Vorteil, Sie direkt mit dem relevanten Teammitglied zu verbinden.
          </p>
        )
      };
      break;

    case 5:
      slide = {
        title: "Müheloser Überblick",
        text: (
          <p>
            Zielpunkt: Einen einfachen Überblick über alle Schritte in Ihrem Marketing-Ablauf bekommen, die Effizienz einzelner Schritte verstehen und die ganzheitlich Profitabilität Ihres Marketings schnell ablesen.
            <br/>
            Unser Fortschritt: Wir hoffen dies bereits erreicht zu haben, sind jedoch bemüht die Darstellung und Aufschlüsselung im Dashboard so zu gestalten, dass sie noch schneller verstanden wird.
          </p>
        )
      };
      break;
  }

  return(
    <div key={index}>
      <h4>{slide.title}</h4>
      {slide.text}
    </div>
  );
}

const useStyles = makeStyles({
  withStandardTitle: {
    '& h3': {
      marginBottom: 21,
      fontSize: '1rem',
      fontWeight: 400
    },
    '& h4': {
      marginBottom: 49,
      fontSize: '1.625rem',
      fontWeight: 400,
      lineHeight: 1.5
    }
  },
  swipeables2Section: {
    '&.mobile': {
      backgroundColor: '#000'
    },
    '&.mobile $swipeables2Indicator': {
      marginTop: 500
    },
    '&.mobile $swipeables2Toggles': {
      marginTop: 556
    },
    '&.mobile::after': {
      display: 'none'
    }
  },
  swipeables2Desktop: {
    position: 'absolute',
    width: 482,
    height: 272,
    top: 187,
    left: '50%',
    zIndex: 1,
    transform: 'translate(calc(-50% - 5px), 115px)',
    '@media (min-width: 1323px)': {
      // width: '36.53vw',
      width: '37%',
      height: '20.56vw',
      left: 'unset',
      marginTop: 'calc(77px - 6.5vw)',
      transform: 'translate(calc(83.5% + 5px), calc(230px - 39%))'
    }
  },
  swipeables2Mobile: {
    height: 470,
    padding: [[0, 512]],
    backgroundColor: '#000',
    overflowX: 'visible !important',
    transform: 'translateY(383px)',
    '@media (min-width: 1286px)': {
      padding: [[0, '40%']]
    },
    '& $swipeables2Slide': {
      '&:nth-child(2)': {
        zIndex: 1,
        padding: [[25, 0, 25, 59]],
        marginLeft: 42,
        opacity: 0.5
      },
      '&:nth-child(3)': {
        zIndex: 2,
        padding: [[8, 40, 8, 0]],
        boxShadow: '0 0 28px #000',
        opacity: 0.8
      },
      '&:nth-child(4)': {
        zIndex: 3,
        padding: [[0, 14]],
        marginLeft: -42
      },
      '&:nth-child(5)': {
        zIndex: 2,
        padding: [[8, 0, 8, 40]],
        marginLeft: -42,
        boxShadow: '0 0 28px #000',
        opacity: 0.8
      },
      '&:nth-child(6)': {
        zIndex: 1,
        padding: [[25, 58, 25, 0]],
        opacity: 0.5
      }
    }
  },
  swipeables2Slide: {
    overflow: 'hidden !important'
  },
  swipeables2Image: {
    objectFit: 'cover',
    objectPosition: 'top left',
    width: '100%',
    height: '100%'
  },
  swipeables2Button: {
    position: 'absolute',
    bottom: 119,
    right: 'calc(50% - 62px)',
    zIndex: 1,
    '@media (min-width: 992px)': {
      top: 341,
      bottom: 'unset',
      right: '10vw'
    },
    '@media (min-width: 1323px)': {
      top: 'calc(418px - 6vw)',
      right: 210
    },
    '& svg': {
      width: 100,
      height: 100,
      opacity: 0.55
    }
  },
  swipeables2Indicator: {
    display: 'inline-block',
    position: 'absolute',
    left: '50%',
    zIndex: 1,
    padding: [[1, 21, 0, 21]],
    marginTop: 686,
    fontFamily: ['Gotham A', 'Gotham B', 'sans-serif'],
    fontSize: '0.9375rem',
    lineHeight: 1.4,
    color: '#fff',
    backgroundColor: '#bdbdbd',
    borderRadius: 14,
    transform: 'translateX(-50%)'
  },
  swipeables2Toggles: {
    position: 'absolute',
    left: '50%',
    zIndex: 1,
    marginTop: 742,
    transform: 'translateX(-50%)'
  },
  swipeables2SelectedToggle: {
    height: 35,
    fontFamily: ['Gotham A', 'Gotham B', 'sans-serif'],
    fontWeight: 400,
    textTransform: 'none',
    color: '#000',
    transition: 'all 0.2s',
    '&:first-child, &:last-child': {
      borderRadius: 7
    },
    '&:last-child': {
      marginLeft: -4
    },
    '&:first-child:not(.selected)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    '&:last-child:not(.selected)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    '&.selected': {
      color: '#fff',
      '&, &:hover': {
        backgroundColor: '#0a7bff'
      }
    }
  },
  mobileStepper: {
    justifyContent: 'flex-start',
    padding: 0,
    marginLeft: -4,
    marginTop: 14,
    background: 'none'
  },
  mobileStepperDot: {
    width: 6,
    height: 6,
    margin: [[0, 7]],
    backgroundColor: '#b9b9b9',
    transition: 'all 0.3s'
  },
  mobileStepperDotActive: {
    background: 'linear-gradient(#72d5fe, #0553ff)'
  }
});


export default function About(props) {
  const [swipeables0Index, setSwipeables0Index] = React.useState(2);
  const [swipeables1Index, setSwipeables1Index] = React.useState(0);
  const [swipeables2Index, setSwipeables2Index] = React.useState(0);
  const [swipeables2ShowMobile, setSwipeables2ShowMobile] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeProgramDetails, setActiveProgramDetails] = React.useState('aum');

  function onActiveTabChange(event, index) {
    setActiveTab(index);
  }

  function onSwipeables0Change(index, indexLatest, meta) {
    setSwipeables0Index(index);
  }

  function incrementSwipeables0Index() {
    setSwipeables0Index(swipeables0Index + 1);
  }

  function decrementSwipeables0Index() {
    setSwipeables0Index(swipeables0Index - 1);
  }

  function onSwipeables1Change(index, indexLatest, meta) {
    setSwipeables1Index(index);
  }

  function incrementSwipeables1Index() {
    setSwipeables1Index(swipeables1Index + 1);
  }

  function onSwipeables2Change(index, indexLatest, meta) {
    setSwipeables2Index(index);
  }

  function incrementSwipeables2Index() {
    setSwipeables2Index(swipeables2Index + 1);
  }

  function swipeables2Renderer(params) {
    const {index, key} = params;
    const imageNames = ['threads.png', 'todo.png', 'stats.png', 'upload.png'];
    const titles = ["Chat-Support erhalten", "Wissen, was zu tun ist", "Metriken verstehen", "Material hochladen"];
    return <Image key={index} name={imageNames[mod(index, imageNames.length)]} className={classes.swipeables2Image}/>;
  }

  function onSwipeables2ToggleChange(event, value) {
    if(value !== null) {
      setSwipeables2ShowMobile(value)
    }
  }

  function scrollToSignupSection() {
    document.querySelector('section:last-child').scrollIntoView({behavior: 'smooth'});
  }

  function getProgramDetails() {
    switch(activeProgramDetails) {
      case 'aum':
        return(
          <React.Fragment>
            <h3>Mission, A - B</h3>
            <div>
              <div className="graphics"><span className="arrow"></span></div>
              <div>
                <div>
                  <strong>Sie sind ein Finanzberater / Versicherungsmakler / Verwalter, welcher...</strong>
                  <ul>
                    <li>Erfahrung mit Kunden hat, deren Profil recht gut kennt und bereits darin erfahren ist, einen geeigneten Interessenten zur Zusammenarbeit zu überzeugen.</li>
                    <li>Kunden seit mindestens zwei Jahren hochqualitative Leistungen liefert.</li>
                    <li>seinen Unterhalt nicht hauptsächlich provisions-basiert erzielt.</li>
                    <li>noch keine Methode der Leadgenerierung gefunden hat, welche Ihren Zweck optimal erfüllt.</li>
                  </ul>
                </div>
                <div>
                  ... im Stande ist, neue Kunden auf wiederholbare Weise und zu vorhersehbaren Preisen zu gewinnen, was Ihnen Stabilität, erhöhte Rentabilität und Skalierbarkeit einbringt.
                </div>
              </div>
            </div>
          </React.Fragment>
        );

      default:
        return null;
    }
  }


  const classes = useStyles();
  return(
    <Layout id="About">
      <section>
        <Image name="coffee.png" className="bg"/>

        <div className="container">
          <h2>Machen Sie sich Ihr<br/>Geschäftsleben einfacher,<br/>mit ein bischen Hilfe von uns.</h2>
          <p>Wir helfen Ihnen als Finanzberater (-planer) oder Vermögensverwalter, neue exklusive Leads mit mehr Verlässlichkeit, Kosteneffektivität und geringerer Wartezeit auf Resultate zu verzeichnen. Unser Fokus liegt auf der Bereitstellung von White-Label Lösungen und wiederholbar effektiven Schritten bis zum Erstgespräch mit dem Interessenten (New AUM).</p>
        </div>
      </section>

      <section>
        <h3>U.A. involviert</h3>
        <div className="swipeableContainer">
          <div className="iconButtonContainer">
            <IconButton onClick={decrementSwipeables0Index}><ChevronLeftIcon/></IconButton>
          </div>
          <VirtualizeSwipeableViews
            className="swipeable"
            index={swipeables0Index}
            onChangeIndex={onSwipeables0Change}
            slideRenderer={swipeables0Renderer}
            enableMouseEvents
            slideClassName="slide"
          />
          <div className="iconButtonContainer">
            <IconButton onClick={incrementSwipeables0Index}><ChevronRightIcon/></IconButton>
          </div>
        </div>
      </section>

      <section className="container">
        <h3>Lösungen für verschiedene Situationen</h3>

        <div className="cards">
          <div>
            <BoatBg/>

            <p>Finden Ihrer Spezialisierung, Positionierung, in Verbindung mit Interessenten bringen, lernen Interessenten zu verkaufen</p>
            <h4>NEW ADVISOR</h4>
            <Button className="disabled" disabled>IN ENTWICKLUNG</Button>
            <ul>
              <li>
                <CheckIcon/>
                <p>Zügig Fuß fassen durch richtigen Ansatz an Kontaktaufnahme online</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Beschleunigtes Aufbauen eines Repertoires ans Testimonials</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Sales Training & spezialisiertes Script</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Für eine vorteilhafte Positionierung entscheiden</p>
              </li>
            </ul>
          </div>

          <div>
            <PaperPlanesBg/>

            <p>Organisches Erzielen von Leads für Gesprächstermine, Aufspüren Ihrer besten Kunden</p>
            <h4>NEW AUM</h4>
            <Button onClick={() => {setActiveProgramDetails('aum')}}>DETAILS</Button>
            <ul>
              <li>
                <CheckIcon/>
                <p>Online Leadgen in tägliche Aktivität integrieren & Zeit sinnvoll nutzen</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Effektive LinkedIn-Kommunikation</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Aktive & direkte LinkedIn-Kampagnen</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Auf LinkedIn aufbauendes Retargeting</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Kundenverständnis verfeinern (ggf.) sowie Back-End-Marketing</p>
              </li>
            </ul>
          </div>

          <div>
            <RocketBg/>

            <p>Gesundes Skalieren Ihres Unternehmens durch Systematisierung und stabile Leadgenerierung</p>
            <h4>EXECUTIVE</h4>
            <Button className="disabled" disabled>IN ENTWICKLUNG</Button>
            <ul>
              <li>
                <CheckIcon/>
                <p>Verlässlichste Angebot-Botschaft-Kombination ermitteln</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Werbeausgaben stabil erhöhen während Conversion-Dynamik hält</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Kontaktpunkte, Onboarding und Leistungserbringung systematisieren</p>
              </li>
              <li>
                <CheckIcon/>
                <p>Verbleibquote und Kundenservice verbessern</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="details">{getProgramDetails()}</div>
      </section>

      <section className="container">
        <div>
          <Image name="about-stats2.png"/>
          <div>
            <h3>Das AAP – Überblick</h3>
            <ul>
              <li>
                <ChevronRightIcon/>
                <p>Durch weitreichende Verwendung organischer Methoden (30-55% organisch, ansonsten Paid Advertising) wird wesentlich bessere Leadgen-Profitabilität erreicht.</p>
              </li>
              <li>
                <ChevronRightIcon/>
                <p>Kontinuierliches Verhelfen Ihrer Ad Kampagnen & Sales Funnels zu maximaler Profitabilität, einfache Step-by-Step Instruktionen für verbleibenden Aufwand, wie etwa das persönliche Kontaktieren oder das Teilen auf LinkedIn.</p>
              </li>
              <li>
                <ChevronRightIcon/>
                <p>Preise orientiert an durchschnittlichem Lifetime Value, Rentabilität einsehbar in Dashboard</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={classNames(classes.swipeables2Section, {mobile: swipeables2ShowMobile})}>
        {swipeables2ShowMobile ?
          <React.Fragment>
            <Image name="mobile-mockup.png" retina className="bg" style={{zIndex: 1}}/>

            <div className={classes.swipeables2MobileLabels}>

            </div>

            <VirtualizeSwipeableViews
              index={swipeables2Index}
              onChangeIndex={onSwipeables2Change}
              slideRenderer={swipeables2Renderer}
              resistance
              enableMouseEvents
              className={classes.swipeables2Mobile}
              slideClassName={classes.swipeables2Slide}
              containerStyle={{
                height: '100%',
              }}
            />
          </React.Fragment>
          :
          <React.Fragment>
            <Image name="industrial-mockup.jpg" retina className="bg"/>

            <div className="container">
              <h3>SERVICE DISTRIBUTION</h3>
              <h4>Erhalt von Leistungen & Informationen auf direktestem Wege</h4>
              <p>In Ihrem Nutzerkonto können Sie einfacher als je zuvor Informationen bereitstellen, auslesen und verstehen. Dies erlaubt uns, Leistungen mit mehr Einsicht in Ihre Situation und minimaler Verzögerung zu erbringen.</p>
            </div>

            <VirtualizeSwipeableViews
              index={swipeables2Index}
              onChangeIndex={onSwipeables2Change}
              slideRenderer={swipeables2Renderer}
              resistance
              enableMouseEvents
              className={classes.swipeables2Desktop}
              slideClassName={classes.swipeables2Slide}
              containerStyle={{
                height: '100%',
              }}
            />

            <IconButton className={classes.swipeables2Button} onClick={incrementSwipeables2Index}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 20">
                <path d="M1 1l8 9M1 19l8-9" stroke="#000" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconButton>
          </React.Fragment>
        }


        <p className={classes.swipeables2Indicator}>{mod(swipeables2Index, 4) + 1} von 4</p>

        {/*<ToggleButtonGroup exclusive value={swipeables2ShowMobile} onChange={onSwipeables2ToggleChange} className={classes.swipeables2Toggles}>
          <ToggleButton value={false} classes={{root: classes.swipeables2SelectedToggle, selected: 'selected'}}>Desktop</ToggleButton>
          <ToggleButton value={true} classes={{root: classes.swipeables2SelectedToggle, selected: 'selected'}}>Mobile</ToggleButton>
        </ToggleButtonGroup>*/}
      </section>

      <section className={classNames('container', classes.withStandardTitle)}>
        <div>
          <h3>AMBITIONEN</h3>
          <VirtualizeSwipeableViews
            index={swipeables1Index}
            onChangeIndex={onSwipeables1Change}
            slideRenderer={swipeables1Renderer}
            enableMouseEvents
          />
          <MobileStepper
            steps={6}
            position="static"
            activeStep={mod(swipeables1Index, 6)}
            classes={{root: classes.mobileStepper, dot: classes.mobileStepperDot, dotActive: classes.mobileStepperDotActive}}
            nextButton={<IconButton onClick={incrementSwipeables1Index}><ChevronRightIcon/></IconButton>}
          />
        <p className="slideIndicator">{mod(swipeables1Index, 6) + 1} von 6</p>
        </div>
        {[
          <Image key={0} name="about-slides1-0.jpg"/>,
          <Image key={1} name="about-slides1-1.jpg"/>,
          <Image key={2} name="about-slides1-2.jpg"/>,
          <Image key={3} name="about-slides1-3.jpg"/>,
          <Image key={4} name="about-slides1-4.jpg"/>,
          <Image key={5} name="about-slides1-5.jpg"/>
        ][mod(swipeables1Index, 6)]}

      </section>

      <section className={classNames('container', classes.withStandardTitle)}>
        <div>
          <h3>SCIENTIFIC ADVERTISING</h3>
          <h4>Gefechts-bewährte Methodologien</h4>
          <p>Wir beschäftigen uns mit der Synthetisierung eines wiederholbaren Ablaufs, welcher die Aufmerksamkeit der richtigen Personen zu Ihnen lenkt. Die Leistung, die Sie von uns erhalten, sollte zum höchst möglichen Grade aus gefechts-getesteten, bereits in anderen Fällen erfolgreichen Ansätzen und Prinzipien bestehen.</p>
        </div>
        <div>
          <Image name="fire.jpg" className="bg"/>
          <h3>MAN + MACHINE</h3>
          <h4>Digitale Technologie ist aufregend, weil sie uns erlaubt, mehr mit weniger zu tun.</h4>
          <p>Freiheit ist realisiert durch das neue Strukturieren und Automatisieren Ihrer Anstrengungen, sodass Erfolg von existierenden Ressourcen, Systemen und Kunden kommt; nicht ein System, welches menschlichen Aufwand direkt als  Profit einfängt. Wenn Sie einem System die Arbeit überlassen, ist Ihr Output überproportional größer als Ihr Input.</p>
        </div>
      </section>

      <section>
        <Image name="about-bottom.jpg" className="bg"/>
        <div className="container">
          <h3>Leitfaden</h3>

          <h4>ROI-zentrisch</h4>
          <p>Der primäre Augenpunkt für unsere Sales Funnels & Advertising ist Ihr ROI (Return on Investment). Wir rechnen mit Ihnen die Schwelle aus, bei Unterschreitung welcher sich Ihre Werbeausgaben nicht ausreichend lohnen. Für den Fall, dass die Rendite unter Ihren Profitabilitäts-Schwellenwert fällt, verwenden wir einen Mechanismus, welcher Ihre Ausgaben strategisch stoppt, sodass jedes Verlustrisiko gemindert wird. Professionelle Fotos und elegante Events können großartig sein, jedoch sollten die Methodologien für Leadgenerierung bei Finanzberatern und Vermögensverwaltung kosteneffizienter sein, als sie es gewöhnlich sind.</p>

          <h4>Berücksichtigung von Menschlichkeit & “Consumer Psychology”</h4>
          <p>Wir verstehen, dass das authentische Aufbauen eines kompetenten Rufs und Vertrauen von höchster Bedeutung ist.</p>

          <h4>Datengetrieben</h4>
          <p>Ein gutes Verständnis der relevanten Metriken und Dynamiken zwischen diesen Metriken ist wichtig, um Sales Prozesse zu entwickeln, welche sich längerfristig bewähren.</p>

          <h4>Spezialisiert</h4>
          <p>Tatsächlich ist die Übertragbarkeit von Erfahrung in Advertising & Marketing für andere Brachen wie E-Commerce oder Buchhaltung auf das Marketing für Finanzberater nur zu einem gewissen Grad möglich. Wir arbeiten speziell an den Methoden, welche am meisten Kosteneffektivität und Verlässlichkeit für Finanzberater bieten. Hierzu braucht es uns vor allem viel Testen, sowie das korrekte Identifizieren von besten Praktiken in Finanzberater-Marketing.</p>
        </div>
      </section>

      <section>
        <Image name="horses.jpg" className="bg"/>
        <div className="container">
          <p>— ohne risiko loslegen.</p>
          <h3>Entdecken Sie, ob Blanford Ihrer Situation hilft. Kein Wagnis nötig.</h3>

          <div>
            Mit einem speziellen Arrangement, welches wir 'Start-Out Program' nennen, bieten wir Ihnen in einem Zeitraum von 1-3 Monate eine spektakulär ermäßigte Zusammenarbeit (-75%) zwecks Entwicklung unserer Methodologien.
            <br/>
            Nachdem Erstellen eines Accounts werden Sie zu unserem Fragebogen geführt, außerdem stehen wir im Chat zur Verfügung.
          </div>

          <SignUp>
            <input type="email" autoComplete="email" placeholder="E-Mail" name="email" required/>
            <input type="password" autoComplete="new-password" placeholder="Passwort wählen" name="password" required/>
            <Button type="submit">Unverbindlich Account anlegen</Button>
          </SignUp>

          <small>Mit dem Absenden dieses Formulars erklären Sie sich damit einverstanden, dass wir die von Ihnen bereitgestellten Daten verwenden dürfen, um Sie bezüglich Ihrer Anfrage/Einreichung und des entsprechenden Produkts zu kontaktieren. Weitere Informationen finden Sie in der <Link href="/privacy"><a><u>Datenschutzrichtlinie</u></a></Link> von BLANFORD.</small>
        </div>
      </section>
    </Layout>
  );
}
