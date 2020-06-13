import React from 'react';
import {ReactReduxContext} from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';

// copied from https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/withRouter.js
export default function withStore(Component) {
  const C = props => {
    const {wrappedComponentRef, ...remainingProps} = props;
    return(
      <ReactReduxContext.Consumer>
        {({store}) => <Component store={store} {...remainingProps} ref={wrappedComponentRef}/>}
      </ReactReduxContext.Consumer>
    );
  };

  C.displayName = `withStore(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;

  return hoistStatics(C, Component);
};