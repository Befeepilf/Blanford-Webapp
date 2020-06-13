import React from 'react';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import red from '@material-ui/core/colors/red';
import Image from './Image.jsx';
import '../styles/CalcSection.scss';

const useStyles = makeStyles(theme => ({
  h3: {
    marginBottom: 28,
    fontFamily: "'Gotham A', 'Gotham B', sans-serif",
    fontSize: '2rem',
    fontWeight: 400,
    textAlign: 'center'
  },
  note: {
    maxWidth: 350,
    margin: [[0, 'auto']],
    fontFamily: '"helvetica neue light", sans-serif',
    fontSize: '1.25rem',
    textAlign: 'center',
    '@media (min-width: 576px)': {
      fontSize: '1rem'
    },
    '@media (min-width: 768px)': {
      maxWidth: 910,
      marginBottom: 105
    }
  },
  h4: {
    marginBottom: 14,
    fontFamily: 'helvetica neue regular',
    fontSize: '1rem',
    textAlign: 'center',
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#303030'
  },
  content: {
    display: 'flex',
    flexDirection: 'column-reverse',
    '&.reverse': {
      '& $footer': {
        margin: [[0, 0, 70, 0]],
        backgroundColor: 'transparent'
      }
    },
    '@media (min-width: 768px)': {
      '&:not(.reverse)': {
        flexDirection: 'column'
      }
    }
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:not($summary)': {
      width: '100%',
      maxWidth: 350,
      margin: [0, 'auto'],
      '&:first-child': {
        flex: 1,
        order: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 140,
        '& > p:last-child': {
          marginTop: 0
        },
        '@media (min-width: 768px)': {
          order: 1,
          display: 'block',
          marginBottom: 0,
          '& strong': {
            minWidth: 119
          },
          '& > p:last-child': {
            maxWidth: '30ch',
            marginTop: 42
          }
        }
      },
      '&:nth-child(2)': {
        flex: 3,
        order: 1,
        zIndex: 1,
        marginBottom: 35,
        '@media (min-width: 768px)': {
          order: 2,
          margin: [[0, 56, 56, 56]],
          '& strong': {
            minWidth: 161
          }
        },
        '@media (min-width: 1079px)': {
          marginBottom: 0
        }
      },
      '@media (min-width: 768px)': {
        width: 'auto',
        maxWidth: 'none'
      }
    },
    '& > *': {
      paddingLeft: 14,
      paddingRight: 14
    },
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  },
  bigNumbers: {
    display: 'flex',
    width: '100%',
    marginBottom: 28,
    '& strong': {
      display: 'block',
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: '1',
      '&::before': {
        content: 'attr(data-before)',
        fontFamily: "'Roboto', sans-serif"
      },
      '&::after': {
        content: 'attr(data-unit)',
        fontSize: '1.5rem'
      }
    },
    '& > span': {
      width: '50%',
      '& span': {
        display: 'block',
        marginTop: 7,
        fontSize: '1rem',
        fontWeight: 600,
        '@media (min-width: 576px)': {
          fontSize: '0.8125rem'
        }
      },
      '&:first-child': {
        '& strong, & span': {
          textAlign: 'right'
        }
      },
      '&:last-child': {
        '& strong, & span': {
          textAlign: 'left'
        }
      },
      '@media (min-width: 768px)': {
        width: 'auto',
        '&:first-child strong': {
          textAlign: 'center'
        },
        '&:last-child strong': {
          textAlign: 'center'
        }
      }
    },
    '& > :first-child': {
      paddingRight: 21,
      marginRight: 21,
      borderRight: '1px solid ' + theme.palette.grey[300],
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#303030'
    },
    '& > :last-child': {
      color: theme.palette.type === 'dark' ? theme.palette.text.secondary : '#ababab'
    }
  },
  textLeft: {
    marginTop: 42,
    fontFamily: "'helvetica neue light', sans-serif",
    fontSize: '1.125rem',
    color: theme.palette.type === 'dark' ? theme.palette.text.primary: '#000',
    '@media (min-width: 576px)': {
      fontSize: '0.875rem'
    }
  },
  warning: {
    fontFamily: '"Gotham A", "Gotham B", sans-serif',
    fontWeight: 500,
    color: red[600]
  },
  summary: {
    flex: 3,
    order: 3,
    paddingTop: 14,
    paddingBottom: 56,
    marginTop: -35,
    fontFamily: "'helvetica neue light', sans-serif",
    fontSize: '0.8125rem',
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000',
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(23, 23, 23, 0.7)' : '#fafafa',
    '& > *': {
      maxWidth: 350,
      margin: [[0, 'auto']]
    },
    '& h4': {
      marginBottom: 14
    },
    '& > p:not(:nth-of-type(5)), & strong': {
      fontSize: '1.125rem'
    },
    '& > p': {
      lineHeight: 2,
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#282828',
      '&:not(:first-of-type)': {
        marginTop: 14
      },
      '&:nth-of-type(5)': {
        marginTop: 28,
        lineHeight: 1.3,
        color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#545454'
      }
    },
    '& strong': {
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#323232'
    },
    '@media (max-width: 767px)': {
      '& h4': {
        marginTop: -42,
        marginBottom: 42,
        fontFamily: '"Gotham A", "Gotham B", sans-serif',
        fontSize: '1.375rem',
        fontWeight: 500,
        textAlign: 'left'
      }
    },
    '@media (min-width: 576px)': {
      '& > p:not(:nth-of-type(5)), & strong': {
        fontSize: '0.8125rem'
      }
    },
    '@media (min-width: 768px)': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(6, auto)',
      gridRowGap: '7px',
      maxWidth: 532,
      paddingBottom: 14,
      marginLeft: 28,
      border: '2px solid #dfdfdf',
      borderRadius: 7,
      '& > p': {
        lineHeight: 1.6,
        '&:not(:first-of-type)': {
          marginTop: 0
        },
        '&:nth-of-type(-n+4)': {
          paddingLeft: 28,
          marginLeft: 14,
          '&:not(:nth-of-type(4))': {
            borderBottom: '1px solid #ccc'
          }
        },
        '&:nth-of-type(5)': {
          padding: [[0, 28, 0, 14]],
          marginTop: '0 !important',
          marginLeft: 14,
          borderLeft: '1px solid #cbcbcb'
        }
      }
    }
  },
  nextSteps: {
    gridColumn: '1 / span 2',
    padding: [[14, 25, 0, 25]],
    marginTop: 14,
    textAlign: 'center',
    borderTop: '1px solid ' + theme.palette.grey[300]
  },
  footer: {
    position: 'relative',
    padding: [[28, 14, 7, 14]],
    margin: [[56, 0]],
    border: '1px solid ' + (theme.palette.type === 'dark' ? 'rgba(23, 23, 23, 0.7)' : theme.palette.grey[200]),
    borderLeft: 'none',
    borderRight: 'none',
    '&.normalPadding': {
      padding: 35
    },
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > *': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 350,
        width: '100%',
        marginBottom: 28,
        '&:first-child': {
          marginBottom: 56
        }
      }
    },
    '& label': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 14,
      fontSize: '1.125rem',
      fontWeight: 500,
      '&#conversionRateLabel': {
        marginBottom: 7
      },
      '& svg': {
        display: 'none',
        marginLeft: 7,
        fontSize: 20,
        color: theme.palette.text.secondary
      }
    },
    '@media (min-width: 576px)': {
      '& label': {
        fontSize: '1rem'
      }
    },
    '@media (min-width: 768px)': {
      padding: [[28, 14]],
      marginBottom: 0,
      '& > div': {
        flexDirection: 'row',
        '& > *': {
          alignItems: 'center',
          width: 'unset',
          maxWidth: 217,
          marginBottom: 0
        }
      },
      '& label': {
        marginBottom: 35,
        '&#conversionRateLabel': {
          marginBottom: 42
        },
        '& svg': {
          display: 'block !important'
        }
      }
    }
  },
  inputWrapper: {
    '& input': {
      maxWidth: '16ch',
      padding: [[6, 14]],
      marginRight: 4,
      textAlign: 'center',
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000',
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(23, 23, 23, 0.2)' : '#fff',
      border: '1px solid ' + (theme.palette.type === 'dark' ? theme.palette.grey[600] : '#dfdfdf'),
      borderRadius: 3,
      transition: 'border 0.2s',
      '&:focus': {
        borderColor: theme.palette.type === 'dark' ? theme.palette.grey[200] : null
      },
      '& + span': {
        verticalAlign: 'middle',
        fontSize: '1.125rem',
        lineHeight: '29px',
        color: theme.palette.type === 'dark' ? theme.palette.text.secondary : '#575757',
        '@media (min-width: 576px)': {
          fontSize: '0.875rem'
        }
      }
    }
  },
  slider: {
    position: 'relative',
    marginTop: 14,
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 3,
      height: 14,
      top: 5,
      left: 0,
      backgroundColor: theme.palette.primary.main
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 2,
      height: 14,
      top: 5,
      right: 0,
      backgroundColor: '#a7a7a9'
    }
  },
  sliderRail: {
    backgroundColor: '#a7a7a9',
    opacity: 1
  },
  sliderTrack: {
    height: 3
  },
  sliderThumb: {
    width: 21,
    height: 21,
    zIndex: 1,
    marginTop: -8,
    marginLeft: -10,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[200] : '#fff',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.3)'
  },
  sliderValue: {
    top: 35,
    left: -3,
    '& *': {
      fontSize: '0.875rem',
      color: theme.palette.type === 'dark' ? theme.palette.text.secondary : '#686868',
      backgroundColor: 'transparent'
    }
  },
  tooltip: {
    backgroundColor: theme.palette.type === 'dark' ? null : theme.palette.grey[400],
    boxShadow: theme.shadows[4]
  },
  tooltipPopper: {
    opacity: 0.98
  }
}));

export default function CalcSection(props) {
  const [conversionRate, setConversionRate] = React.useState(50);
  const [inputValues, setInputValues] = React.useState({lcv: '', budget: ''});

  function setConversionRateWrapper(event, value) {
    setConversionRate(value);
  }

  function setInputValue(event, name) {
    setInputValues(Object.assign({}, inputValues, {[name]: event.target.value.replace(',', '.').replace(/[^\d\.]/g, '').match(/\d+\.?\d*|/g)[0]}));
  }


  const {lcv, budget} = inputValues;
  const parsedLcv = parseFloat(lcv) || 0;
  const parsedBudget = parseFloat(budget) || 0;

  const leads = Math.round(200 / (1 + Math.exp(-0.00035 * parsedBudget)) - 100) || 0;

  const lcvRound = Math.round(parsedLcv);

  const customers = leads * conversionRate / 100;
  const addedValue = customers * parsedLcv;
  const fee = Math.min(Math.max(addedValue / 4, 1300), 6000);
  const percentage = Math.round(Math.round(addedValue) / Math.round(fee) * 100) || 0;

  const warn = percentage > 500;

  const classes = useStyles();
  return(
    <section id="CalcSection">
      {props.dashboard ? null :
      <h3 className={classes.h3}>Rentabilität abschätzen</h3>
      }

      {props.dashboard ? null : <p className={classes.note}>Der entscheidende Messwert für unsere Leistungen ist, in welchem Verhältnis Ihr Kostenaufwand zu generiertem Mehrwert steht.<span className="desktop"><br/>Die Gebührenberechnung ist individualisiert aus selbigem Grund. Folgende Rechnung würden wir durchführen:</span></p>}

      <div className={classNames(classes.content, {reverse: props.dashboard})} style={props.dashboard ? {flex: 'none'} : {}}>
        <div className={classNames(classes.topSection, {container1: props.padding})}>
          <div>
            <p className={classes.bigNumbers}>
              <span>
                <strong data-unit="%">{percentage}</strong>
                <span>Rendite auf Gebühr</span>
              </span>
              <span>
                <strong data-before="~">{Math.round(percentage / 100)}:1</strong>
              </span>
            </p>
            <p className={classes.textLeft}>Bei Realisierung von {leads} Leads würde jeder ausgegebene Euro von Blanford-Gebühr Ihnen im Gegenzug {((addedValue / fee) || 0).toFixed(2)} Euro einbringen.</p>
          </div>

          <div>
            <p className={classes.bigNumbers}>
              <span>
                <strong data-before="~" data-unit="€">{(parsedBudget / customers).toFixed(1)}</strong>
                <span>Kosten pro Kundenakquise</span>
              </span>
              <span>
                <strong data-before="+" data-unit="€">{addedValue.toFixed(0)}</strong>
                <span>zusätzlicher Umsatz pro Monat über Kundenleben</span>
              </span>
            </p>
            <p className={classes.textLeft}>
              Bitte geben Sie für den "Litetime Customer Value" den Geldwert eines durchschnittlichen Kunden nach dem Zeitraum von einem Monaten ein, d.h., wie viel Umsatz Sie von einem durchschnittlichen Kunden mithin einem Monaten generieren.
              <br/>
              <br/>
              Hinweis: Wir sind kontinuierlich bestrebt, unsere Rechnung zu vergenauern. Momentan ist dies eine <em>sehr</em> grobe Schätzung.
              <br/>
              <br/>
              <br/>
              {warn ? <span className={classes.warning}>Sind Sie sicher, dass Ihre Angaben korrekt sind?</span> : null}
            </p>
          </div>

          <div className={classes.summary}>
            <h4 className={classes.h4} style={{gridColumn: '1 / span 2'}}><span className="desktop">Überblick über Rechnung</span><span className="mobile">Schätzung</span></h4>
            <p>
              <strong>ca. €{Math.round(fee) + Math.round(parsedBudget)} mtl. Ausgaben</strong>
              <br/>
              für ca. {leads} Leads
              <br/>
              bei {Math.round(conversionRate)}% Konversionsrate
            </p>
            <p>
              <strong>{Math.round(customers)}</strong> Neukunden pro Monat
              <br/>
              bei €{lcvRound} Lifetime Value
            </p>
            <p>
              <strong>€{Math.round(12 * addedValue)}</strong> jährlicher Mehrwert
              <br/>
              <strong>€{Math.round(12 * (fee + parsedBudget))}</strong> jährliche Ausgaben
            </p>
            <p>
              <strong>€{Math.round(addedValue - fee)}</strong> mtl. Rendite
              <br/>
              <strong>{((addedValue / fee * 100) || 0).toFixed(2)}%</strong> ROI
            </p>
            <p style={{gridColumn: 2, gridRow: '2 / span 4'}}>Dies sind offengelegte Schätzungen für die Evaluation von Potential in Ihrer Situation; es stellt keine Garantie oder Marketing-Botschaft dar. Genaue Inputs wünschenswert. Die Bezeichnung "Gebühr" beschreibt lediglich das Management von Blanford, nicht das Werbebudget, wogegen "Ausgaben" in diesem Fenster auch Werbebudget einbezieht.</p>
            <div className={classNames('desktop', classes.nextSteps)}>
              <h4 className={classes.h4}>Was nun?</h4>
              <p>Erstellen Sie einen kostenlosen Account, wenn Sie unseren unverbindlichen Rat wünschen.</p>
            </div>
          </div>
        </div>

        <div className={classNames(classes.footer, {normalPadding: !props.padding})}>
          <div className={classNames({container2: props.padding})}>
            <div style={{position: 'relative'}}>
              <label id="conversionRateLabel">
                Konversionsrate
                <Tooltip classes={{popper: classes.tooltipPopper, tooltip: classes.tooltip}} interactive title={
                  <Typography>
                    Anteil der <i>Leads</i>, welche voraussichtlich zu Ihrem Kunden werden. Als <i>Lead</i> betrachten wir bspw das Einlösen eines Discounts in einem Facebook Offer, das Weiterleiten eines Anrufs an Sie oder das auf andere Weise ausdrückliche Bekunden der Intention ein Angebot von Ihnen wahrzunehmen, von einer Person welche jeder Indikation nach nicht bereits Ihr Kunde ist.
                  </Typography>
                }>
                  <HelpIcon/>
                </Tooltip>
              </label>
              <Slider
                valueLabelDisplay="on"
                valueLabelFormat={value => value + '%'}
                aria-labelledby="conversionRateLabel"
                classes={{root: classes.slider, track: classes.sliderTrack, rail: classes.sliderRail, thumb: classes.sliderThumb, valueLabel: classes.sliderValue}}
                value={conversionRate}
                onChange={setConversionRateWrapper}
              />
            </div>
            <div>
              <label htmlFor="lcv">
                Lifetime Customer Value
                <Tooltip classes={{popper: classes.tooltipPopper, tooltip: classes.tooltip}} interactive title={
                  <Typography>
                    Der <i>“Lifetime Value of a Customer”</i> (auch: <i>“Customer Lifetime Value”</i>) beschreibt den durchschnittlichen Betrag, den ein Kunde bei Ihnen während des gesamten Zeitraums ausgibt, der er Ihr Kunde ist. Zum Beispiel: Durchschnittlich kauft ein Kunde für fünf Jahre bei Ihnen und gibt während dieses Zeitraums 1250 Euro aus.
                    <br/>
                    <br/>
                    Der LTV ist also der Wert, den ein Kunde im Laufe der Jahre für ein Gewerbe hat bzw. in der Zukunft haben wird. Für seine Berechnung werden daher neben den historischen Erlösen auch die zukünftig erwarteten Umsätze berücksichtigt (Kundenpotenzial).
                  </Typography>
                }>
                  <HelpIcon/>
                </Tooltip>
              </label>
              <div className={classes.inputWrapper}>
                <input type="text" id="lcv" placeholder="000.00" value={lcv} onChange={event => {setInputValues(event, 'lcv')}}/>
                <span>EUR / Monat</span>
              </div>
            </div>
            <div>
              <label htmlFor="budget">
                Werbebudget
                <Tooltip classes={{popper: classes.tooltipPopper, tooltip: classes.tooltip}} interactive title={
                  <Typography>
                    Maximaler monatlicher Betrag, welcher als Budget für Facebook Anzeigen verwendet werden kann. Empfehlung: €750+.
                  </Typography>
                }>
                  <HelpIcon/>
                </Tooltip>
              </label>
              <div className={classes.inputWrapper}>
                <input type="text" id="budget" placeholder="000.00" value={budget} onChange={event => {setInputValues(event, 'budget')}}/>
                <span>EUR / Monat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
