import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import deLocale from 'date-fns/locale/de';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfDay from 'date-fns/startOfDay';
import isEqual from 'date-fns/isEqual';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';
import getHours from 'date-fns/getHours';
import setHours from 'date-fns/setHours';
import addMinutes from 'date-fns/addMinutes';
import setMinutes from 'date-fns/setMinutes';
import getMinutes from 'date-fns/getMinutes';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import addMonths from 'date-fns/addMonths';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const useTimePickerStyles = makeStyles(theme => {
  return {
    root: {
      gridColumn: '1 / span 6',
      display: 'flex',
      alignItems: 'center',
      padding: [[0, 21]],
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.4)' : 'rgba(80, 80, 80, 0.2)',
      '&:not(.active)': {
        opacity: 0
      }
    },
    sliderContainer: {
      flex: 5,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      height: 21
    },
    sliderThumb: {
      zIndex: 1,
      background: 'none'
    },
    sliderThumbLabel: {
      top: -23
    },
    sliderRail: {
      height: 3,
      boxShadow: `0px 0px 21px rgba(${parseInt(theme.palette.primary.main.substr(1, 2), 16)}, ${parseInt(theme.palette.primary.main.substr(3, 2), 16)}, ${parseInt(theme.palette.primary.main.substr(5, 2), 16)}, 0.7)`,
      opacity: 0.6
    },
    sliderTrack: {
      display: 'none'
    },
    sliderMark: {
      display: 'none'
    },
    busyTimeIndicator: {
      position: 'absolute',
      height: 23,
      top: 0.1,
      background: `linear-gradient(rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 10px, ${theme.palette.type === 'dark' ? '#4e0000' : 'rgba(200,200,200,0.9)'} 10px, ${theme.palette.type === 'dark' ? '#4e0000' : 'rgba(200,200,200,0.9)'} 13px, transparent 13px, transparent 23px)`
    },
    tooltip: {
      top: '-10px !important',
      fontSize: '0.875rem',
      '&.inline': {
        top: '-36px !important'
      }
    }
  }
});

function TimePicker(props) {
  const [busyTimes, setBusyTimes] = React.useState(getBusyMinutes());
  const [defaultTime, setDefaultTime] = React.useState(getDefaultTime(busyTimes));
  const [time, setTime] = React.useState(defaultTime);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

  React.useEffect(() => {
    const newBusyTimes = getBusyMinutes();
    setDefaultTime(getDefaultTime(newBusyTimes));
    setBusyTimes(newBusyTimes);
  }, [props.day, props.busyData]);

  function toggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  function getBusyMinutes() {
    let past;
    const today = startOfDay(new Date());
    if(isEqual(today, props.day)) {
      past = differenceInMinutes(addMinutes(new Date(), 30), today);
    }

    const busyTimes = (props.busyData || []).map((entry) => [
      differenceInMinutes(entry.start, startOfDay(entry.start)),
      differenceInMinutes(entry.end, startOfDay(entry.end))
    ]);

    if(past) {
      busyTimes.push([0, past]);
    }

    // merge overlapping intervals
    let i = 0;
    let j = 1;
    let foundAllOverlaps = false;
    while(!foundAllOverlaps) {
      foundAllOverlaps = true;
      while(i < busyTimes.length) {
        while(j < busyTimes.length) {
          let remove = false;
          if(busyTimes[i][0] <= busyTimes[j][1] && busyTimes[i][1] >= busyTimes[j][1]) {
            busyTimes[j][1] = busyTimes[i][1];
            remove = true;
          }
          if(busyTimes[i][1] >= busyTimes[j][0] && busyTimes[i][0] <= busyTimes[j][0]) {
            busyTimes[j][0] = busyTimes[i][0];
            remove = true;
          }

          if(remove) {
            busyTimes.splice(i, 1);
            foundAllOverlaps = false;
          }
          else {
            j++;
          }
        }
        i++;
        j = i + 1;
      }
      i = 0;
      j = 1;
    }

    return busyTimes;
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.day && !props.day || !prevProps.day && props.day || (prevProps.day && props.day && !isEqual(prevProps.day, props.day)) || JSON.stringify(prevProps.busyData) !== JSON.stringify(props.busyData)) {
  //     const busyTimes = getBusyMinutes();
  //     const defaultTime = getDefaultTime(busyTimes);
  //     setState({busyTimes, defaultTime});
  //   }
  // }

  function getDefaultTime(busyTimes) {
    let defaultTime = 720;
    let findDefaultTime = true;
    while(findDefaultTime) {
      const interval = findInterval(defaultTime, busyTimes);
      if(interval) {
        defaultTime = Math.round((Math.random() > 0.5 ? interval[1] + 5 : interval[0] - 5) / 5) * 5;
      }
      else {
        findDefaultTime = false;
      }
    }
    return defaultTime;
  }

  function findInterval(time, busyTimes) {
    return busyTimes.find((interval) => time >= interval[0] && time <= interval[1]);
  }

  function formatTime(time) {
    const timeInHours = time / 60;
    let hours = Math.floor(timeInHours);
    let minutes = Math.round((timeInHours - hours) * 60).toString();
    hours = hours.toString();

    if(minutes.length < 2) {
      minutes = '0' +  minutes;
    }
    if(hours.length < 2) {
      hours = '0' + hours;
    }

    return `${hours}:${minutes}`;
  }

  function onTimeChangeEnd(event, value) {
    props.onChange(value);
  }


  const classes = useTimePickerStyles();
  const sliderMarks = [];
  for(let m = 0; m < 1440; m += 30) {
    if(!findInterval(m, busyTimes)) {
      sliderMarks.push({value: m});
    }
  }

  return(
    <div className={classNames(classes.root, {active: props.show})} style={{gridRow: props.gridRow}}>
      <div className={classes.sliderContainer}>
        <Slider
          min={0}
          max={1439}
          step={null}
          marks={sliderMarks}
          defaultValue={defaultTime}
          valueLabelDisplay="on"
          getAriaValueText={formatTime}
          valueLabelFormat={formatTime}
          onChangeCommitted={onTimeChangeEnd}
          classes={{track: classes.sliderTrack, rail: classes.sliderRail, thumb: classes.sliderThumb, valueLabel: classes.sliderThumbLabel, mark: classes.sliderMark}}
        />
        {busyTimes.map((interval, index) => {
          const duration = interval[1] - interval[0];
          return(
            <Tooltip key={index} open={duration > 480 || isTooltipOpen} onOpen={toggleTooltip} onClose={toggleTooltip} title="Hier haben wir leider keine Zeit." classes={{popper: classNames(classes.tooltip, {inline: duration > 480})}}>
              <div
                className={classes.busyTimeIndicator}
                style={{left: (interval[0] / 1439 * 100) + '%', width: ((interval[1] - interval[0]) / 1439 * 100) + '%'}}
              ></div>
            </Tooltip>
          );
        })}
        <div className={classes.scale}>{}</div>
      </div>
    </div>
  );
}



const useCalendarWidgetStyles = makeStyles(theme => ({
  root: {
    maxWidth: 651,
    minWidth: 560,
    '&.loading': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: [[2, 14]],
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.3)' : 'rgba(80, 80, 80, 0.3)',
    '& svg': {
      fontSize: 22
    }
  },
  body: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridAutoRows: '1fr',
    // https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
    '&::before': {
      content: '""',
      gridRow: '1 / 1',
      gridColumn: '1 / 1',
      width: 0,
      paddingBottom: '70%'
    }
  },
  day: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.5)' : 'rgba(80, 80, 80, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.1s, opacity 0.5s',
    '&:first-child': {
      gridRow: '1 / 1',
      gridColumn: '1 / 1'
    },
    '&:not(.busy):not(.past):hover': {
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.4)' : 'rgba(80, 80, 80, 0.2)'
    },
    '&:not(.busy):not(.past).isPadding': {
      opacity: 0.4
    },
    '&.active': {
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 80, 80, 0.4)' : 'rgba(80, 80, 80, 0.2)',
      opacity: 1
    },
    '&:not(.busy):not(.past).fade': {
      opacity: 0.4
    },
    '&.busy, &.past': {
      opacity: 0.2,
      cursor: 'auto'
    },
    '&.busy': {
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(80, 0, 0, 0.6)' : 'rgba(80, 0, 0, 0.6)'
    }
  }
}));

function CalendarWidget(props) {
  const [monthStart, setMonthStart] = React.useState(startOfMonth(new Date()));
  const [monthEnd, setMonthEnd] = React.useState(endOfMonth(new Date()));
  const [monthDate, setMonthDate] = React.useState(new Date());
  const [busyData, setBusyData] = React.useState();
  const [selectedBusyData, setSelectedBusyData] = React.useState();

  React.useEffect(() => {
    setSelectedBusyData(props.date ? getBusyEntries(startOfDay(props.date)) : null);
  }, [props.busyData, props.date]);

  function changeMonth(amount) {
    const newMonthDate = addMonths(monthDate, amount);
    setMonthStart(startOfMonth(newMonthDate));
    setMonthEnd(endOfMonth(newMonthDate));
    setMonthDate(newMonthDate);
    setSelectedBusyData(null);
  }

  function selectDay(day, event) {
    if(!event.currentTarget.classList.contains('busy') && !event.currentTarget.classList.contains('past')) {
      if(event.currentTarget.classList.contains('isPadding')) {
        changeMonth(event.currentTarget.classList.contains('paddingBefore') ? -1 : 1);
      }
      props.onChange(day);
    }
  }

  function onTimeChange(time) {
    props.onChange(addMinutes(startOfDay(props.date), time));
  }

  function getBusyEntries(date) {
    const busyEntries = [];
    props.busyData.forEach(entry => {
      if(entry.days && entry.days.includes(getDay(date))) {
        busyEntries.push({start: setMinutes(setHours(date, getHours(entry.start)), getMinutes(entry.start)), end: setMinutes(setHours(date, getHours(entry.end)), getMinutes(entry.end))});
      }
      else if(isEqual(startOfDay(entry.start), date) && isEqual(startOfDay(entry.end), date)) {
        busyEntries.push(entry);
      }
    });
    return busyEntries;
  }

  function isBusy(day) {
    const busyEntries = getBusyEntries(day);
    if(busyEntries.length) {
      return busyEntries.reduce((a, b) => a + differenceInMinutes(b.end, b.start), 0) > 1410;
    }
    return false;
  }

  function closeTimePicker() {
    props.onChange(null);
  }

  // componentDidUpdate(prevProps) {
  //   if(JSON.stringify(prevProps.busyData) !== JSON.stringify(props.busyData) || prevProps.date && !props.date || !prevProps.date && props.date || (prevProps.date && props.date && !isEqual(startOfDay(prevProps.date), startOfDay(props.date)))) {
  //     setState({selectedBusyData: props.date ? getBusyEntries(startOfDay(props.date)) : null});
  //   }
  // }


  const classes = useCalendarWidgetStyles();

  const daysInMonth = getDaysInMonth(monthDate);
  const paddingDays = 36 - daysInMonth;
  const paddingDaysBefore = Math.floor(paddingDays / 2);
  const paddingDaysAfter = paddingDays - paddingDaysBefore;

  let selectedDayIndex;

  return(
      <div className={classNames(classes.root, props.className, {loading: !props.busyData})}>
        {props.busyData ? (
          <React.Fragment>
            <header className={classes.header}>
              <IconButton onClick={() => {changeMonth(-1)}} disabled={isSameMonth(monthDate, new Date())}><ArrowBackIos/></IconButton>
              <Typography>{format(monthDate, 'MMMM uuuu', {locale: deLocale})}</Typography>
              <IconButton onClick={() => {changeMonth(1)}}><ArrowForwardIos/></IconButton>
            </header>
            <div className={classes.body}>
              {eachDayOfInterval({start: addDays(monthStart, -paddingDaysBefore), end: addDays(monthEnd, paddingDaysAfter)}).map((day, index) => {
                const active = isEqual(startOfDay(props.date), day);
                const paddingBefore = index < paddingDaysBefore;
                const paddingAfter = index >= daysInMonth + paddingDaysBefore;

                if(active) {
                  selectedDayIndex = index;
                }

                return(
                  <div
                    key={day.getTime()}
                    className={classNames(classes.day, {
                        isPadding: paddingBefore || paddingAfter,
                        paddingBefore,
                        paddingAfter,
                        active,
                        fade: props.date && !active,
                      busy: isBusy(day),
                      past: isBefore(day, startOfDay(new Date()))
                    })}
                    onClick={(event) => {selectDay(day, event)}}
                  >
                    <Typography color="textSecondary">{format(day, 'eee', {locale: deLocale})}</Typography>
                    <Typography>{format(day, 'dd')}</Typography>
                  </div>
                );
              })}

              <TimePicker
                show={props.date ? isSameMonth(props.date, monthDate) && isSameYear(props.date, monthDate) : false}
                gridRow={selectedDayIndex ? Math.floor(selectedDayIndex / 6) + 2 : null}
                busyData={selectedBusyData}
                day={props.date ? startOfDay(props.date) : null}
                onChange={onTimeChange}
              />
            </div>
          </React.Fragment>
        )
        : <CircularProgress/>}
      </div>
  );
}

export default connect(({busyData}) => ({
  busyData: (busyData || []).map(entry => Object.assign(entry, {
    start: new Date(entry.start),
    end: new Date(entry.end)
  }))
}))(CalendarWidget);
