import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import red from '@material-ui/core/colors/red';
import StateButton from '../StateButton.jsx';

@connect((state) => ({
  isBrowser: state.isBrowser
}))
@withStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    fontFamily: 'Roboto, sans-serif',
    color: '#fff',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.primary.main,
    overflow: 'hidden',
    transition: 'background-color 0.7s',
    '&.hasError': {
      backgroundColor: red[900]
    }
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numDots: 0
    };
  }

  tick() {
    if(this.props.isBrowser) {
      if(this.state.numDots === 3) {
        this.setState({numDots: 0});
      }
      else {
        this.setState({numDots: this.state.numDots + 1});
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.error && this.props.error !== prevProps.error) {
      console.error(this.props.error);
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let dots = "";
    for(let i = 0; i < this.state.numDots; i ++) {
      dots += ".";
    }

    if(this.props.pastDelay) {
      return(
        <div id="Loading" className={className(this.props.classes.root, {hasError: this.props.error})}>
          {
            this.props.error ?
            <div className={this.props.classes.error}>
              <h1>{this.props.error.errorDescription || "Ein Fehler ist aufgetreten"}</h1>
              {
                this.props.error.errorSubDescription ?
                  <h2>{this.props.error.errorSubDescription}</h2>
                :
                null
              }
              {
                this.props.retryLabel && this.props.retryAction ?
                  <StateButton primary={false} label={this.props.retryLabel} style={{marginTop: 42}} onClick={this.props.retryAction}/>
                :
                null
              }
            </div>
            :
            <h1>Loading{dots}</h1>
            // <CircularProgress/>
          }
        </div>
      );
    }
    else {
      return null;
    }
  }
}