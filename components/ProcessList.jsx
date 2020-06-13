import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProcessList.scss';

function ProcessList(props) {
  const length = props.steps.length;
  return(
    <ol className="process">
      {props.steps.map((step, index) => (
        <li key={index}>
          {typeof step === 'string' ?
            step
          :
          [(step.title ? <strong key={0}>{step.title}:</strong> : null), step.text]}
        </li>
      ))}
    </ol>
  );
}

ProcessList.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.exact({
      title: PropTypes.string,
      text: PropTypes.string.isRequired
    }),
    PropTypes.string
  ])).isRequired
};

export default ProcessList;
