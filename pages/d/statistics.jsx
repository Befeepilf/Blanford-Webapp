import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Popover from '@material-ui/core/Popover';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import {DatePicker} from '@material-ui/pickers';
import green from '@material-ui/core/colors/green';
import deLocale from 'date-fns/locale/de';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import isSameMonth from 'date-fns/isSameMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfQuarter from 'date-fns/startOfQuarter';
import endOfQuarter from 'date-fns/endOfQuarter';
import differenceInDays from 'date-fns/differenceInDays';
import Layout from '../../components/Dashboard/Layout.jsx';
import LoadingContainer from '../../components/Dashboard/LoadingContainer.jsx';
import FunnelTable from '../../components/FunnelTable.jsx';
import {formatPercent} from '../../Util.js';


const useStyles = makeStyles(theme => ({
  overview: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 14,
    borderBottom: '1px solid ' + (theme.palette.type === 'dark' ? 'grey' : '#747474'),
    '& > *': {
      flex: 1,
      minWidth: 179,
      textAlign: 'center'
    },
    '& p': {
      fontFamily: '"Gotham A", "Gotham B", sans-serif',
      '&:first-child': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.6em',
        fontSize: '0.75rem',
        lineHeight: 1.3,
        textTransform: 'uppercase'
      },
      '&:last-child': {
        fontSize: '2.25rem'
      }
    },
    '& strong': {
      fontWeight: 500
    }
  },
  canvasContainer: {
    margin: [[28, 0, 56, 0]]
  },
  canvas: {
    width: '100%',
    marginBottom: 7
  },
  canvasTextFields: {
    position: 'relative'
  },
  canvasTextFieldContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    '& button': {
      padding: 0,
      marginTop: -4,
      fontSize: '0.6875rem',
      textTransform: 'none',
      color: theme.palette.text.secondary,
      '& svg': {
        marginRight: 4,
        fontSize: 21,
        color: 'inherit'
      }
    }
  },
  canvasTextField: {
    width: '3.7em',
    padding: [[4, 0]],
    fontFamily: ['Gotham A', 'Gotham B', 'sans-serif'],
    fontSize: '1.125rem',
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: 'none',
    border: '1px solid transparent',
    borderRadius: 4,
    transition: 'all 0.2s',
    '&:focus': {
      borderColor: theme.palette.text.secondary
    }
  },
  canvasTextFieldPrognosisIndicator: {
    maxWidth: '13em',
    marginLeft: 'calc(-50% + 1.5em)',
    marginTop: 21,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid ' + theme.palette.text.primary,
    borderRadius: 10,
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 33,
      left: 25,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderBottom: '9px solid ' + theme.palette.text.primary
    },
    '& > *': {
      fontFamily: ['Gotham A', 'Gotham B', 'sans-serif'],
      fontSize: '0.75rem'
    },
    '& > :first-child': {
      fontWeight: 500,
      letterSpacing: 3,
      color: theme.palette.type === 'dark' ? '#000' : '#fff',
      backgroundColor: theme.palette.text.primary
    },
    '& > :last-child': {
      margin: [[7, 0]],
      lineHeight: 1.4
    }
  },
  period: {
    alignSelf: 'flex-start',
    margin: [[14, 0, 56, 0]],
    border: '1px solid #747474',
    borderRadius: 10,
    overflow: 'hidden',
    '& button': {
      height: 42,
      color: theme.palette.text.primary,
      transition: 'background 0.3s'
    },
    '& .selected': {
      background: 'linear-gradient(#1e0ee8, #0492e3)'
    },
    '& svg': {
      marginLeft: 7,
      fontSize: 18,
      opacity: 0.7
    }
  },
  customPeriodContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: 14,
    '& input': {
      width: 105,
      textAlign: 'center'
    },
    '& label': {
      width: '133%',
      textAlign: 'center'
    }
  },
  infoContainer: {
    marginBottom: 56,
    '& h3, & p, & button': {
      fontFamily: '"Gotham A", "Gotham B", sans-serif',
      color: theme.palette.type === 'dark' ? '#fff' : '#000'
    },
    '& h3': {
      marginBottom: 14,
      fontSize: '0.9375rem',
      fontWeight: 500
    },
    '& p': {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      opacity: 0.85,
      '&:last-of-type': {
        marginTop: 14
      }
    },
    '& button': {
      margin: [7, 0, 0, -8]
    }
  },
  prognosis: {
    color: theme.palette.type === 'dark' ? green[400] : green[800]
  }
}));

let stopCanvas = false;
let canvas;
let canvasFunnel;
let periodButtonAnchor;
let timeout;


function Statistics(props) {
  // funnel: [
  //   {name: "Ad", crt: 0.51, xIndex: 0, yIndex: 0, freePlaces: []},
  //   {name: "LP", crt: 0.27, xIndex: 0, yIndex: 0, freePlaces: []},
  //   {name: "Sign-Up", crt: 0.26, xIndex: 0, yIndex: 0, freePlaces: []},
  //   {name: "Offer", crt: 0.9, xIndex: 0, yIndex: 0, freePlaces: []},
  //   {name: "Termin", crt: 0.3, xIndex: 0, yIndex: 0, freePlaces: []}
  // ]

  const [periodButtonsValue, setPeriodButtonsValue] = useState(1);
  const [periodButtonsShowCustom, setPeriodButtonsShowCustom] = useState(false);
  const [period, setPeriod] = useState({start: addMonths(new Date(), -1), end: new Date()});
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [funnel, setFunnel] = useState();


  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if(event.key === 'p') {
        if(stopCanvas) {
          stopCanvas = false;
          window.requestAnimationFrame(animate);
        }
        else {
          stopCanvas = true;
        }
      }
    });

    return () => {
      clearTimeout(timeout);
      stopCanvas = true;
    };
  }, []);

  useEffect(() => {
    stopCanvas = true; // important to do this as early as possible to stop canvas animation before a new one is crated
    setFunnel(getProcessedFunnel());
  }, [props.funnel, period.start, period.end]);

  useEffect(() => {
    if(funnel) {
      createCanvasFunnel();
      initCanvas();
    }
  }, [funnel]);


  function getProcessedFunnel() {
    function getFilteredLeadsLength(leads) {
      return leads ? leads.filter(lead => lead >= period.start.getTime() && lead <= period.end.getTime()).length : NaN;
    }

    return props.funnel ? props.funnel.map((step, index) => Object.assign({}, step, {
      leadsBefore: step.leadsBefore || [],
      kpi: Object.assign({}, step.kpi, {value: index < props.funnel.length - 1 ? getFilteredLeadsLength(props.funnel[index + 1].leadsBefore) / getFilteredLeadsLength(step.leadsBefore) : step.kpi.value})
    })) : null;
  }

  function createCanvasFunnel() {
    canvasFunnel = funnel.map(step => {
      step.nextX = 0;
      step.nextY = 0;
      step.freePlaces = [];
      step.points = [];
      return step;
    });
  }

  function initCanvas() {
    canvas = document.querySelector('canvas');
    if(canvas) {
      const width = canvas.clientWidth;
      const height = width / 4;
      canvas.width = width;
      canvas.height = height;
      canvas = {width, height, ctx: canvas.getContext('2d'), time: 0};

      const radius = 3;
      const pointSize = 2 * radius + 2;
      canvas.yOffset = 28 + radius;
      canvas.maxYIndex = (height - canvas.yOffset) / pointSize;

      let x = 0;
      let y = 0;

      const numRows = Math.floor(((height - canvas.yOffset) / pointSize + 2) / 2) - 3;
      let numPoints = 0;
      for(let r = 0; r < numRows; r++) {
        numPoints += Math.floor(((height - canvas.yOffset) / pointSize + 2)) - 2 * r;
      }
      for(let i = 0; i < numPoints; i++) {
        if(canvas.yOffset + y * pointSize > (height - x * pointSize)) {
          x++;
          y = x;
        }
        canvasFunnel[0].points.push({r: radius, x, y, step: 0});
        y++
      }

      stopCanvas = false;
      setShowCanvas(true);
      window.requestAnimationFrame(animate);
    }
  }

  function animate() {
    const {width, height, ctx} = canvas;

    ctx.clearRect(0, 0, width, height);

    let noDataIndicator;
    canvasFunnel.forEach((step, stepIndex) => {
      const stepX = width / canvasFunnel.length * (stepIndex + 0.5);
      ctx.fillStyle = '#000';
      ctx.moveTo(stepX, 28);
      ctx.lineTo(stepX, height);
      ctx.stroke();

      ctx.fillStyle = '#747474';
      ctx.font = '1rem "Gotham A", "Gotham B", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(step.name, stepX, 14);


      let nextStep = canvasFunnel[stepIndex === canvasFunnel.length - 1 ? 0 : stepIndex + 1];
      // if nextStep hasn't got any KPI data yet don't keep dots stuck to it it but instead give impression that they fly into nowhere
      if(typeof nextStep.kpi.value !== 'number' || isNaN(nextStep.kpi.value)) {
        nextStep = canvasFunnel[0];
        if(!noDataIndicator && stepIndex + 1 < canvasFunnel.length) {
          // if first step (stepIndex = 0) wouldn't have KPI data the canvas wouldn't be visible so this case can be ignored
          noDataIndicator = {startGradient: stepX, endGradient: width / canvasFunnel.length * (stepIndex + 1.5)};
        }
      }

      const pointsToAddToStep = [];
      step.points = step.points.filter((point, pointIndex) => {
        ctx.save();

        let deleteFromPoints = false;

        let px;
        let py;
        if(point.isChangingStep) {
          const velocityX = 3;
          const nextStepX = stepX / (stepIndex + 0.5) * (stepIndex + 1.5);
          const startX = stepX - 6 - (2 * point.x * (point.r + 1));
          const endX = nextStepX - 6 - (2 * point.nextX * (point.r + 1));
          const distanceX = endX - startX;
          const timeX = distanceX / velocityX;
          const t = canvas.time - point.startTimeOfChangingStep;


          // x(t) = 0.5 * a * t^2 + startX
          // x(timeX) = endX
          const accelerationX = 2 * distanceX / Math.pow(timeX, 2)
          px = 0.5 * accelerationX * Math.pow(t, 2) + startX;


          // point.y stays initial y
          // y(t) = 0.5 * a * t^2 + startY
          // y(timeX) = endY
          const startY = canvas.yOffset + point.y * (2 * point.r + 2);
          const endY = canvas.yOffset + point.nextY * (2 * point.r + 2);
          const accelerationY = 2 * (endY - startY) / Math.pow(timeX, 2);
          const ef = Math.exp((step.points.length - 1) / 2 - point.initialIndex);
          const angularFrequency = (0.15 - 0.05) / 2 * (Math.sin(point.initialIndex) + 1) + 0.05;
          py = 0.5 * accelerationY * Math.pow(t, 2) + startY + 2 / angularFrequency * Math.sin(angularFrequency * (t - timeX));

          if(t >= timeX) {
            point.isChangingStep = false;
            point.x = point.nextX;
            point.y = point.nextY;
            nextStep.points.push(point);
            deleteFromPoints = true;
          }
        }
        else {
          px = stepX - 6 - (2 * point.x * (point.r + 1))
          py = Math.max(Math.min(canvas.yOffset + point.y * (2 * point.r + 2), height - point.r), canvas.yOffset);
        }

        const gradient = ctx.createLinearGradient(px, py - point.r, px, py + point.r);
        let startColor = '(27, 86, 221';
        let endColor = '(3, 164, 226';
        if(stepIndex === 0 && !point.isChangingStep) {
          startColor = `rgba${startColor}, ${Math.exp(-(point.x > 2 ? point.x - 3 : 0))})`;
          endColor = `rgba${endColor}, ${Math.exp(-(point.x > 2 ? point.x - 3 : 0))})`;
        }
        else {
          startColor = `rgb${startColor})`;
          endColor = `rgb${endColor})`;
        }
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, point.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        const probability = 0.001 / Math.pow(point.x + 1, 2) * step.kpi.value;
        const random = Math.random();
        if(random <= probability && !point.isChangingStep) {
          point.isChangingStep = true;
          point.startTimeOfChangingStep = canvas.time + 1;
          point.initialIndex = pointIndex; // must be constant for pseudo randomness in motion

          // don't add freePlace to first step because a new point gets instantly added at free place
          // to make it look like points don't get removed at first step
          if(stepIndex > 0) {
            let freeX = point.x;
            step.points.forEach((p) => {
              if(!p.isChangingStep && p.y === point.y) {
                if(p.x > point.x) {
                  // move up points in same row
                  p.x--;
                }
                if(p.x >= freeX) {
                  freeX++;
                }
              }
            });
            step.freePlaces.push({
              x: freeX,
              y: point.y
            });
          }
          else {
            pointsToAddToStep.push(Object.assign({}, point, {isChangingStep: false}));
          }

          // remove point if it is at last step
          if(stepIndex === canvasFunnel.length - 1) {
            point.isChangingStep = false;
            deleteFromPoints = true;
          }
          else {
            if(nextStep.freePlaces.length) {
              let lowestX;
              let lowestY;
              let lowestFreePlaceIndex
              nextStep.freePlaces.forEach((freePlace, freePlaceIndex) => {
                if(!lowestFreePlaceIndex || freePlace.x < lowestX || (freePlace.x === lowestX && freePlace.x < lowestY)) {
                  lowestX = freePlace.x;
                  lowestY = freePlace.y
                  lowestFreePlaceIndex = freePlaceIndex;
                }
              });

              point.nextX = lowestX;
              point.nextY = lowestY;

              point.nextX = lowestX;
              point.nextY = lowestY;
              nextStep.freePlaces.splice(lowestFreePlaceIndex, 1);
            }
            else {
              point.nextX = nextStep.nextX;
              point.nextY = nextStep.nextY;

              nextStep.nextY++;

              // if nextY exceeds canvas height reset nextY and increment nextX
              // 4 * stepIndex is the number of places being substracted from maxY
              if(canvas.yOffset + nextStep.nextY * (2 * point.r + 2) >= canvas.height - (4 * stepIndex + (nextStep.nextX + 1)) * (2 * point.r + 2)) {
                nextStep.nextX++;
                nextStep.nextY = 0;
              }
            }
          }

        }

        return !deleteFromPoints;
      });

      step.points = step.points.concat(pointsToAddToStep);
    });

    if(noDataIndicator) {
      const x = noDataIndicator.startGradient;
      const y = 28;
      const gradient = ctx.createLinearGradient(x, y + (height - y) / 2, width, y + (height - y) / 2);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop((noDataIndicator.endGradient - x) / (width - x), 'rgba(0, 0, 0, 0.5)');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, width - x, height - y);

      ctx.fillStyle = '#eee';
      ctx.font = '1rem "Gotham A", "Gotham B", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("Noch nicht genügend Daten", x + (width - x) / 2, (y + height - y) / 2);
    }

    if(!stopCanvas) {
      canvas.time += 1;
      window.requestAnimationFrame(animate);
    }
  }

  function toggleInfoExpanded() {
    setInfoExpanded(!infoExpanded);
  }

  function changePeriod(event, periodButtonsValue) {
    if(periodButtonsValue) {
      setPeriodButtonsValue(periodButtonsValue);

      if(typeof periodButtonsValue === 'number') {
        setPeriod({start: addMonths(new Date(), -periodButtonsValue), end: new Date()});
      }
      else {
        setPeriodButtonsShowCustom(true);
      }
    }
    else if(periodButtonsValue === 'custom') {
      setPeriodButtonsShowCustom(!periodButtonsShowCustom);
    }
  }

  function changeStepCRT(stepName, event) {
    setFunnel(funnel.map(step => {
      if(step.name === stepName) {
        if(typeof step.kpi.originalValue === 'undefined') {
          step.kpi.originalValue = step.kpi.value;
        }
        let value = event.target.value.replace(/[^0-9\.,]/, '');
        step.kpi.lastWasDot = value[value.length - 1] === '.' || value[value.length - 1] === ',';
        value = value.length ? Math.max(Math.min(parseFloat(value) / 100, 1), 0) : 0;
        step.kpi.isPrognosis = value !== step.kpi.originalValue;
        step.kpi.value = value;
      }
      return step;
    }));
  }

  function resetStepCRT(stepName) {
    setFunnel(funnel.map(step => {
      if(step.name === stepName) {
        step.kpi.value = step.kpi.originalValue;
        step.kpi.isPrognosis = false;
      }
      return step;
    }));
  }

  function setPeriodWrapper(data) {
    setPeriod(Object.assign({}, period, data));
    if(data.end) {
      setPeriodButtonsShowCustom(false);
    }
  }

  function getContent() {
    const isStartToday = !differenceInDays(period.start, new Date());
    const isEndToday = !differenceInDays(period.end, new Date());

    return(
      <React.Fragment>
        <div className={classes.overview}>
          {[
            [<span><strong>{format(period.start, 'MMM dd') + (isStartToday ? ' (Heute)' : '') + ' - ' + format(period.end, 'MMM dd') + (isEndToday ? ' (Heute)' : '')}</strong></span>, `${funnel[0].leadsBefore.filter(lead => isWithinInterval(new Date(lead), {start: period.start, end: period.end})).length} Leads`],
            [<span><strong>{format(period.end, 'QQQ uuuu')}</strong></span>, `${funnel[0].leadsBefore.filter(lead => isWithinInterval(new Date(lead), {start: startOfQuarter(period.end), end: endOfQuarter(period.end)})).length} Leads`],
            [<span><strong>Rentabel?</strong>{String.fromCharCode(8194)}(Y/N; ROI)</span>, `${typeof props.viable === 'boolean' ? props.viable ? "Y" : "N" : "?"}; ${typeof props.roi === 'number' ? props.roi + "%" : "..."}`],
            [<span><strong>LTV Mehrwert {format(period.start, 'MMM dd')} - {format(period.end, isSameMonth(period.start, period.end) ? 'dd' : 'MMM dd')} bei <span className={classNames({[classes.prognosis]: funnel.some(step => step.kpi.isPrognosis)})}>{Math.round(funnel.reduce((a, b) => a * b.kpi.value, 1) * 100).toString()}</span>% CNV Rate</strong></span>, props.crt && funnel[0].kpi.value ? `≈ €${8950}` : '...']
            ].map((stat, index) => (
              <div key={index}>
                <Typography color="textSecondary">{stat[0]}</Typography>
                <Typography>{stat[1]}</Typography>
              </div>
            ))}
        </div>

        <div className={classes.canvasContainer} style={{opacity: showCanvas ? 1 : 0}}>
          <canvas className={classes.canvas}></canvas>
          <div className={classes.canvasTextFields}>
            {canvas ? funnel.map((step, index) => (
              <div key={step.name} className={classes.canvasTextFieldContainer} style={{left: `calc(${canvas.width / funnel.length * (index + 0.5)}px - 1.85em`}}>
                <input
                  value={formatPercent(step.kpi.value) + (step.kpi.lastWasDot ? '.' : '') + '%'}
                  onChange={event => {changeStepCRT(step.name, event)}}
                  className={classNames(classes.canvasTextField, {[classes.prognosis]: step.kpi.isPrognosis})}
                />
                {step.kpi.isPrognosis ? (
                  <React.Fragment>
                    <Button onClick={() => {resetStepCRT(step.name)}}>
                      <RestoreIcon/>
                      zurück
                    </Button>
                    <div className={classes.canvasTextFieldPrognosisIndicator}>
                      <Typography>PROGNOSE</Typography>
                      <Typography>Sie haben diesen Wert zu Prognose-Zwecken verändert.</Typography>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            )) : null}
          </div>
        </div>

        <div className={classes.period}>
          <ToggleButtonGroup value={periodButtonsValue} exclusive onChange={changePeriod}>
            <ToggleButton classes={{selected: 'selected'}} value={1}>1 Mnt.</ToggleButton>
            <ToggleButton classes={{selected: 'selected'}} value={3}>3 Mnt.</ToggleButton>
            <ToggleButton classes={{selected: 'selected'}} value={6}>6 Mnt.</ToggleButton>
            <ToggleButton classes={{selected: 'selected'}} value={12}>1 Jhr.</ToggleButton>
            <ToggleButton classes={{selected: 'selected'}} value="custom" buttonRef={node => {periodButtonAnchor = node}}>
              benutzerdefiniert
              {periodButtonsShowCustom ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </ToggleButton>
          </ToggleButtonGroup>
          <Popover
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
            open={periodButtonsShowCustom}
            anchorEl={periodButtonAnchor}
            onClose={() => {setPeriodButtonsShowCustom(false)}}
          >
            <div className={classes.customPeriodContainer}>
              <DatePicker
                variant="inline"
                label="Start"
                value={period.start}
                onChange={start => {setPeriodWrapper({start})}}
                disableFuture
              />
              <Typography variant="caption" style={{margin: '0 28px'}}>bis</Typography>
              <DatePicker
                variant="inline"
                label="End"
                value={period.end}
                onChange={end => {setPeriodWrapper({end})}}
                disableFuture
                minDate={period.start}
              />
            </div>
          </Popover>
        </div>

        <div className={classes.metricsBoard}>
          <div className={classes.infoContainer}>
            <Typography component="h3">MASTER METRICS BOARD</Typography>
            <Typography>
              Hier können die letztendlichen Metriken der Rentabilität abgelesen werden, aufgeschlüsselt nach Schritt im Funnel, dessen Performance und daraus ergebenden Kosten.
            </Typography>
            <Collapse in={infoExpanded}>
              <Typography>
                Einführung von Nominal Ranges: Die Nominal Range (Abk.: "NR") ist die Spanne, in der sich der jeweilige Wert im Normalfall befinden sollte. Ist der tatsächliche Wert wesentlich geringer, deutet dies entweder darauf hin, dass der Wert ineffizienter ist als erwartet, oder darauf, dass die NR-Werte noch keine Zeit hatten, sich an Ihren Funnel anzupassen. Nominal Range-Werte sollten also mit der Zeit genauer werden. Der NR-Benchmark erlaubt Ihnen, ohne vorherige Erfahrung zu interpretieren, ob ein Faktor unterdurchschnittlich abschneidet und/oder die Rentabilität des Funnels gefährdet. Unterdurchschnittliche Werte sind dunkel-orange gefärbt
              </Typography>
            </Collapse>
            <Button onClick={toggleInfoExpanded}>{infoExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}</Button>
          </div>

          <FunnelTable funnel={funnel}/>
        </div>
      </React.Fragment>
    )
  }


  const classes = useStyles();
  return(
    <LoadingContainer
      noDataTitle="Wir haben noch nicht genügend Daten gesammelt."
      noDataSubtitle="Schauen Sie zu einem späteren Zeitpunkt wieder vorbei."
      errorTitle="Statistiken konnten nicht geladen werden"
      isLoading={!funnel && props.firestore !== null}
      hasData={Boolean(funnel && funnel.length && props.funnel.filter(step => step.leadsBefore && step.leadsBefore.length).length > 1)}
      getContent={getContent}
    />
  );
}

export default connect(({funnel}) => ({funnel}))(props => <Layout id="Statistics"><Statistics {...props}/></Layout>);
