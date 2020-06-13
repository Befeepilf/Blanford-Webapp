import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  root: {
    position: ({mobile}) => mobile ? 'relative' : null,
    minHeight: ({mobile}) => mobile ? 35 : 64,
    marginLeft: ({mobile}) => mobile ? 0 : 84,
    borderBottom: ({mobile}) => mobile ? '1px solid #747474' : null,
    overflow: ({mobile}) => mobile ? 'visible' : 'hidden'
  },
  flexContainer: {
    height: '100%'
  },
  scrollable: {
    position: ({mobile}) => mobile ? 'unset' : null
  },
  indicator: {
    maxWidth: 112,
    height: ({mobile}) => mobile ? 1 : 2,
    bottom: ({mobile}) => mobile ? -1 : 0,
    marginLeft: ({mobile}) => mobile ? 0 : 24,
    backgroundColor: theme.palette.text.secondary
  },
  tab: {
    minHeight: '100%',
    maxHeight: '100%',
    fontFamily: ({mobile}) => mobile ? ['Roboto', 'sans-serif'] : ['Gotham A', 'Gotham B', 'sans-serif'],
    fontSize: '0.875rem',
    fontWeight: 400,
    textTransform: ({mobile}) => mobile ? 'none' : 'uppercase'
  },
  tabWrapper: {
    flexDirection: 'row',
    '& > *:first-child': {
      margin: [[0, 7, 0, 0], '!important'],
      fontSize: '1rem'
    }
  }
}));
function CustomNavBar(props) {
  const classes = useStyles({mobile: props.mobile});
  return(
    <Tabs variant="scrollable" scrollButtons="auto" value={props.activeTab} onChange={props.onChange} classes={{root: classes.root, flexContainer: classes.flexContainer, scrollable: classes.scrollable, indicator: classes.indicator}}>
      {props.tabs.map(tab => (
        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} classes={{root: classNames(classes.tab, tab.className), wrapper: classes.tabWrapper}}/>
      ))}
    </Tabs>
  );
}

CustomNavBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    className: PropTypes.string
  })).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  mobile: PropTypes.bool
};

export default connect(({ui}) => ui.customNavBar)(CustomNavBar);
