import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../Image.jsx';
import '../../styles/Homepage/Banner.scss';

function Banner(props) {
  return(
    <section className={classNames('banner', props.className, {overlay: props.overlay})}>
      <Image name={props.bgImgName} className="bg"/>
      <div className="container">
        <h2 className={classNames({dark: props.darkTitle})}>
          {typeof props.title === 'string' ?
            props.title
          :
          [<span key={0} className="long">{props.title.long}</span>, <span key={1} className="short">{props.title.short}</span>]}
        </h2>
        {props.children}
      </div>
    </section>
  );
}

Banner.propTypes = {
  bgImgName: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.exact({
      long: PropTypes.string.isRequired,
      short: PropTypes.string.isRequired
    })
  ]),
  overlay: PropTypes.bool,
  darkTitle: PropTypes.bool,
  className: PropTypes.string
};

export default Banner;
