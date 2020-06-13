import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Image(props) {
  const split = props.name.split('.');
  const name = split.slice(0, -1).join('.');
  const extension = '.' + split[split.length - 1];
  const mime = (() => {
    if(extension === 'png') {
      return 'image/png';
    }
    else if(extension === 'jpg' || extension === 'jpeg') {
      return 'image/jpeg';
    }
  })();

  const picture = (
    <picture className={classNames({[props.pictureClassName]: Boolean(props.pictureClassName)})}>
      {props.retina ? [
        <source key={0} type="image/webp" srcSet={require('../images/webp/' + name + '@1x.webp').default + ', ' + require('../images/webp/' + name + '@2x.webp').default + ' 2x'}/>,
        <source key={1} type={mime} srcSet={require('../images/compressed/' + name + '@1x' + extension).default + ', ' + require('../images/compressed/' + name + '@2x' + extension).default + ' 2x'}/>,
        <img key={2} className={props.className} src={require('../images/compressed/' + name + '@1x' + extension).default} alt={props.alt || ""} style={props.style || {}}/>
      ] : [
        <source key={3} type="image/webp" srcSet={require('../images/webp/' + name + '.webp').default}/>,
        <source key={4} type={mime} srcSet={require('../images/compressed/' + props.name).default}/>,
        <img key={5} className={props.className} src={require('../images/compressed/' + props.name).default} alt={props.alt || ""} style={props.style || {}}/>
      ]}
    </picture>
  );

  if(props.lazy && false) {
    const placeholder = require('../images/placeholders.json').default[props.name];
    return [
      <noscript key={6}>{picture}</noscript>,
      <picture key={7} className={classNames('lazy', {[props.pictureClassName]: Boolean(props.pictureClassName)})}>
        <source type="image/webp" data-src={require('../images/webp/' + name + '.webp').default}/>
        <source type={mime} data-src={irequire('../images/compressed/' + props.name).default}/>
        <img className={props.className} src={'data:image/svg+xml;base64,' + placeholder} data-src={require('../images/compressed/' + props.name).default} alt={props.alt || ""} style={props.style || {}}/>
      </picture>
    ];
  }
  return picture;
}

Image.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  pictureClassName: PropTypes.string,
  style: PropTypes.object,
  lazy: PropTypes.bool,
  retina: PropTypes.bool
};

export default Image;
