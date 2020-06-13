import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    borderTop: '1px solid #e1e1e1',
    '&:before': {
      display: 'none'
    },
    '&:last-of-type $summary': {
      borderBottom: '1px solid #e1e1e1'
    }
  },
  expanded: {
    margin: 0,
  },
  summary: {
    minHeight: 'unset',
    padding: 0,
    fontFamily: "'Gotham A', 'Gotham B', 'Roboto', sans-serif",
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.75,
    color: theme.palette.type === 'dark' ? theme.palette.grey[200] : 'rgb(41, 41, 41)',
    transition: 'none'
  },
  summaryExpanded: {
    minHeight: 'unset !important',
    '&$summaryContent': {
      margin: [[18, 0]]
    }
  },
  summaryContent: {
    margin: [[18, 0]]
  },
  expandIcon: {
    marginRight: -20,
    '& svg': {
      fontSize: 21
    }
  },
  details: {
    padding: 21,
    marginBottom: -1,
    fontSize: '1.125rem',
    lineHeight: 1.4,
    color: theme.palette.type === 'dark' ? theme.palette.grey[300] : '#4e4e4e',
    borderBottom: '1px solid #e1e1e1'
  },
  '@media (min-width: 576px)': {
    summary: {
      fontSize: '0.9375rem'
    },
    details: {
      fontSize: '1rem'
    }
  }
}));

function Collapsable(props) {
  const [expanded, setExpanded] = React.useState(Boolean(props.defaultExpanded));

  function toggleExpansion(event, expanded) {
    setExpanded(expanded);
  }

  const classes = useStyles();
  const customClasses = props.customClasses || {};

  return(
    <ExpansionPanel
      id={props.id}
      expanded={expanded || Boolean(props.expanded) || Boolean(props.alwaysExpanded)}
      onChange={props.onChange ? props.onChange : toggleExpansion}
      elevation={0}
      square
      classes={{root: classNames(classes.root, customClasses.root), expanded: classNames(classes.expanded, customClasses.expanded)}}
    >
      <ExpansionPanelSummary classes={{root: classNames(classes.summary, customClasses.summary), expanded: classNames(classes.summaryExpanded, customClasses.summaryExpanded), content: classNames(classes.summaryContent, customClasses.summaryContent), expandIcon: classNames(classes.expandIcon, customClasses.expandIcon)}} expandIcon={expanded ? <RemoveIcon/> : <AddIcon/>}>{props.title}</ExpansionPanelSummary>
      <ExpansionPanelDetails className={classNames(classes.details, customClasses.details)}>{props.children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

Collapsable.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  alwaysExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  onChange: PropTypes.func,
  customClasses: PropTypes.exact({
    root: PropTypes.string,
    expanded: PropTypes.string,
    summary: PropTypes.string,
    summaryExpanded: PropTypes.string,
    summaryContent: PropTypes.string,
    expandIcon: PropTypes.string,
    details: PropTypes.string
  })
};

export default Collapsable;
