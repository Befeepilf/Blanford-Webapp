import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

@withStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
export default class LoadableLoading extends React.Component {
  componentDidUpdate(prevProps) {
    if(this.props.error && this.props.error !== prevProps.error) {
      console.error(this.props.error);
    }
  }

  render() {
      return(
        <div id="LoadableLoading" className={this.props.classes.main}>
          {
            this.props.error ?
              <div className={this.props.classes.error}>
                {this.props.error.errorDescription || "Ein Fehler ist aufgetreten"}
                <Button onClick={this.props.retry}>Erneut versuchen</Button>
              </div>
            :
            <CircularProgress/>
          }
        </div>
      );
  }
}