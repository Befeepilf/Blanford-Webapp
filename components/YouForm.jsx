import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnGap: '49px',
    gridRowGap: '42px',
    paddingTop: 70,
    marginTop: 70,
    borderTop: '1px solid #8d8d8d',
    '&:first-of-type': {
      '&questionPart p:first-child': {
        height: 'auto'
      }
    },
    '&:last-of-type': {
      gridTemplateColumns: '1fr'
    },
    '& h3': {
      marginBottom: 28,
      fontFamily: '"Roboto", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1,
      color: theme.palette.text.primary,
      '& + p': {
        fontFamily: '"Open Sans", sans-serif'
      }
    },
    '@media (min-width: 576px)': {
      '&:first-of-type, &:nth-of-type(2)': {
        gridTemplateColumns: '1fr 2fr',
        gridTemplateRows: '1fr 1fr 1fr',
      },
      '& > :first-child': {
        gridRow: '1 / -1'
      },
      '& h3 + p': {
        maxWidth: '22ch'
      }
    },
    '@media (min-width: 768px)': {
      '&:nth-of-type(2)': {
        gridTemplateRows: '1fr',
        gridTemplateColumns: '2fr 3fr 3fr'
      },
      '&:last-of-type': {
        gridTemplateColumns: '6fr 7fr',
        gridTemplateRows: 'auto 1fr 1fr 1fr',
        '& h3': {
          gridColumn: '1 / span 2',
          gridRow: 1
        },
        '& > :last-child': {
          gridColumn: '1 / span 2'
        }
      }
    },
    '@media (min-width: 992px)': {
      '&:first-of-type': {
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 2fr 2fr'
      },
      '&:last-of-type': {
        gridTemplateColumns: '2fr 2fr 4fr',
        gridTemplateRows: 'auto 1fr 1fr',
        gridColumnGap: '70px',
        '& h3': {
          gridColumn: '1 / span 3'
        },
        '& > :nth-child(2)': {
          gridColumn: '1 / span 2'
        },
        '& > :last-child': {
          gridColumn: 3
        }
      }
    }
  },
  questionPart: {
    display: 'flex',
    flexDirection: 'column',
    '& > :nth-child(n+2):not($questionPartNote)': {
      marginTop: 14,
    },
    '& p:first-child': {
      minHeight: '2.92858em',
      marginBottom: 0,
      fontSize: '0.875rem',
      color: theme.palette.type === 'dark' ? null : '#000'
    },
    '& input, & textarea': {
      width: '100%',
      padding: 14,
      fontFamily: '"Roboto", sans-serif',
      fontSize: '0.87rem',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.5)' : 'rgba(80, 80, 80, 0.1)',
      border: 'none',
      transition: 'background-color 0.2s',
      '&:focus': {
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.4)' : 'rgba(80, 80, 80, 0.2)',
      },
      '&::placeholder': {
        color: theme.palette.text.secondary
      }
    },
    '& textarea': {
      flex: 1,
      resize: 'none',
      minHeight: 140,
      lineHeight: 1.5
    }
  },
  questionPartWithHorizontalNote: {
    position: 'relative',
    '& $questionPartNote': {
      position: 'absolute',
      maxWidth: '30ch',
      height: '100%',
      right: -98,
      paddingLeft: 7,
      marginTop: 0,
      marginLeft: 28,
      borderLeft: '1px solid #cbcbcb'
    }
  },
  questionPartNote: {
    marginTop: 28,
    fontFamily: '"helvetica neue light", sans-serif',
    fontSize: '0.825rem'
  },
  inputWithLabel: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 7,
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '100%',
    padding: [[7, 7, 7, 14]],
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.5)' : 'rgba(80, 80, 80, 0.1)'
  },
  selectInner: {
    width: '100%',
    height: 44
  }
}));

function YouForm(props) {
  const {data, answers} = props;
  const classes = useStyles();

  return(
    <div id="YouForm">
      <section className={classes.section}>
        <div>
          <Typography component="h3">Allgemein</Typography>
          <Typography>Geben Sie uns einen kurzen Einblick in was Sie tun.</Typography>
        </div>

        <div className={classes.questionPart}>
          <Typography>Rahmeninformationen</Typography>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <input type="text" placeholder="Vor- & Nachname" value={data.name.value || ""} onChange={data.name.onChange}/>
            </Grid>
            <Grid item xs={3}>
              <input type="text" placeholder="PLZ" value={data.plz.value || ""} onChange={data.plz.onChange}/>
            </Grid>
            <Grid item xs={6}>
              <input type="text" placeholder="Jobtitel" value={data.jobtitle.value || ""} onChange={data.jobtitle.onChange}/>
            </Grid>
            <Grid item xs={6}>
              <Select displayEmpty={true} variant="filled" value={answers['0'] ? answers['0'].value : ""} onChange={answers['0'].onChange} className={classes.selectInner} inputProps={{className: classes.select}}>
                <MenuItem value=""><em>Auswählen</em></MenuItem>
                <MenuItem value={1}>Selbstständig</MenuItem>
                <MenuItem value={2}>Angestellt</MenuItem>
                <MenuItem value={3}>einer Bank zugehörig</MenuItem>
                <MenuItem value={4}>Anderes</MenuItem>
              </Select>
            </Grid>

            {answers['0'].value === 2 ?
              <Grid item xs={6}>
                <input type="text" placeholder="Arbeitgeber" value={answers['1'] ? answers['1'].value : ""} onChange={answers['1'].onChange}/>
              </Grid>
            :
              answers['0'].value === 3 ?
              <Grid item xs={6}>
                <input type="text" placeholder="Name der Bank" value={answers['2'] ? answers['2'].value : ""} onChange={answers['2'].onChange}/>
              </Grid>
              :
            null}

            <Grid item xs={9}>
              <Select displayEmpty={true} variant="filled" value={answers['3'] ? answers['3'].value : ""} onChange={answers['3'].onChange} className={classes.selectInner} inputProps={{className: classes.select}}>
                <MenuItem value=""><em>Wie werden Ihre Dienste vergütet?</em></MenuItem>
                <MenuItem value={1}>Provision</MenuItem>
                <MenuItem value={2}>Gebühr</MenuItem>
                <MenuItem value={3}>Honorar</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <input type="text" placeholder="Ggf. Spezialisierung" value={answers['4'] ? answers['4'].value : ""} onChange={answers['4'].onChange}/>
          </Grid>
        </div>

        <div className={classes.questionPart}>
          <Typography>Was sind die häufigsten Angelegenheiten/Ziele, bei denen Sie Kunden helfen?</Typography>
          <textarea value={answers['5'] ? answers['5'].value : ""} onChange={answers['5'].onChange}/>
        </div>
      </section>

      <section className={classes.section}>
        <div>
          <Typography component="h3">Kundenakquise</Typography>
          <Typography>Nehmen Sie sich kurz Zeit, uns Ihre Herangehensweise an das Generieren von Leads (Marketing) zu schildern und was Sie zu diesem Zweck bereits versucht haben.</Typography>
        </div>

        <div className={classes.questionPart}>
          <Typography>Wie viel ist Ihnen ein Kunde wert?</Typography>
          {/*<div className={classes.inputWithLabel}>
            <input type="text" placeholder="Geschä. erlaubbarer Kostenaufwand" value={answers['6'] ? answers['6'].value : ""} onChange={answers['6'].onChange}/>
            <span>EUR</span>
          </div>*/}
          <div className={classes.inputWithLabel}>
            <input type="text" placeholder="Customer Lifetime Value" value={answers['7'] ? answers['7'].value : ""} onChange={answers['7'].onChange}/>
            <span>EUR</span>
          </div>
          <div className={classes.inputWithLabel}>
            <input type="text" placeholder="Momentane Kosten, einen Kunden zu gewinnen" value={answers['8'] ? answers['8'].value : ""} onChange={answers['8'].onChange}/>
            <span>EUR</span>
          </div>
        </div>
        {/*<div className={classes.questionPart}>
          <Typography>Auf welchem Wege finden Interessenten meist zu Ihnen?</Typography>
          <textarea value={answers['9'] ? answers['9'].value : ""} onChange={answers['9'].onChange}/>
        </div>*/}
        <div className={classes.questionPart}>
          <Typography>Welche Methoden des Marketings haben Sie in der Vergangenheit versucht und wie gut hat es jeweils funktioniert?</Typography>
          <textarea placeholder="Bitte teilen Sie auch mit, was am besten und was nicht funktioniert hat. Intentionen/Gedankengänge können ebenfalls hilfreich sein." value={answers['10'] ? answers['10'].value : ""} onChange={answers['10'].onChange}/>
        </div>
      </section>

      <section className={classes.section}>
        <Typography component="h3">Wie können wir helfen?</Typography>

        <div className={classes.questionPart}>
          <Typography>Kurze Beschreibung relevanten Problempunktes oder täglichen/allgemeinen Schwierigkeiten, die Sie beschäftigen</Typography>
          <textarea value={answers['11'] ? answers['11'].value : ""} onChange={answers['11'].onChange}/>
        </div>

        {props.appointments.length ?
          <div className={classNames(classes.questionPart, classes.questionPartWithHorizontalNote)} style={{paddingRight: 175}}>
            <Typography>Welches Ziel in Bezug auf Umsatzsteigerung haben Sie sich gesetzt?</Typography>
            <div className={classes.inputWithLabel}>
              <input type="text" placeholder="Umsätze momentan" value={answers['12'] ? answers['12'].value : ""} onChange={answers['12'].onChange}/>
              <span>EUR</span>
            </div>
            <div className={classes.inputWithLabel}>
              <input type="text" placeholder="Zielumsatz in 12 Monaten" value={answers['13'] ? answers['13'].value : ""} onChange={answers['13'].onChange}/>
              <span>EUR</span>
            </div>
            <div className={classes.inputWithLabel}>
              <input type="text" placeholder="Idealer Stand" value={answers['14'] ? answers['14'].value : ""} onChange={answers['14'].onChange}/>
              <span>EUR</span>
            </div>
            <Typography className={classes.questionPartNote}>Um sinnvolle Überlegungen anzustellen brauchen wir ein klares, konstantes, leicht bestimmbares Maß, mit dem Punkte in der Entwicklung Ihrer Rentabilität bestimmt werden können. Dies muss nicht unbedingt die Form von Umsatz in EUR nehmen, obgleich wir dies empfehlen. "Idealer Stand" Feld beschreibt maximalen Umsatz, der noch im Bereich des Denkbaren läge.
            </Typography>
          </div>
        : null}

        <div className={classes.questionPart}>
          <Typography>(In wenigen Worten) was wäre das ideale Auskommen für Sie nach Lösung genannter Schwierigkeiten?</Typography>
          <textarea value={answers['15'] ? answers['15'].value : ""} onChange={answers['15'].onChange}/>
        </div>


        <div className={classes.questionPart}>
          <Typography>Was ist die Höhe Ihres momentanen Werbebudgets bzw. wie hoch würden Sie Ihr Werbebudget maximal ansetzen?</Typography>
          <div className={classes.inputWithLabel} style={{maxWidth: '21ch'}}>
            <input type="text" value={answers['16'] ? answers['16'].value : ""} onChange={answers['16'].onChange}/>
            <span>EUR mtl.</span>
          </div>
          <Typography className={classes.questionPartNote}>Das Werbebudget sind die Ausgaben, die direkt von Ihrer Zahlungsmethode im Facebook Ad Manager oder LinkedIn für Anzeigen eingesetzt werden könnten. Es stellt einen Maximum dar: Wenn Ihr Budget bspw €1550 ist, werden die Ausgaben seitens aller Plattformen auf nicht mehr als diesen Betrag summieren.</Typography>
        </div>

        <div className={classes.questionPart}>
          <Typography>Wann wären Sie dazu bereit, anzufangen, Aufmerksamkeit in das Wachstum Ihres Gewerbes zu investieren?</Typography>
          <div className={classes.selectContainer}>
            <Select displayEmpty={true} variant="filled" value={answers['18'] ? answers['18'].value : ""} onChange={answers['18'].onChange} className={classes.selectInner} inputProps={{className: classes.select}}>
              <MenuItem value=""><em>Auswählen</em></MenuItem>
              <MenuItem value={1}>Unverzüglich</MenuItem>
              <MenuItem value={2}>In kommenden Wochen</MenuItem>
              <MenuItem value={3}>In kommenden Monaten</MenuItem>
              <MenuItem value={4}>In einigen Monaten</MenuItem>
            </Select>
          </div>
        </div>

        <div className={classes.questionPart}>
          <Typography>Zuletzt, was denken Sie differenziert Sie von den anderen Anmeldern, weshalb wir mit Ihnen zusammenarbeiten sollten? (optional)</Typography>
          <textarea value={answers['17'] ? answers['17'].value : ""} onChange={answers['17'].onChange}/>
        </div>
      </section>
    </div>
  );
}

export default connect(({appointments}) => ({
  appointments: appointments || []
}))(YouForm);
