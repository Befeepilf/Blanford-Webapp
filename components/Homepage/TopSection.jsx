import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Image from '../Image.jsx';
import '../../styles/Homepage/TopSection.scss';

function TopSection(props) {
  return(
    <section className="TopSection">
      <Image name={props.bgImgName} className="bg"/>
      <div className="container">
        <div>
          <h2>{props.title}</h2>
          <div>{props.children}</div>
        </div>
        <div>
          <div>
            {props.bottomItems.map((item, index) => (
              <div key={index}>
                {item.icon}
                {item.label}
              </div>
            ))}
            {props.ctaLabel ?
              <button className="cta" onClick={() => {
                document.querySelector('section.signup').scrollIntoView({behavior: 'smooth'});
                if(typeof props.onCtaClick === 'function') {
                  props.onCtaClick();
                }
              }}>{props.ctaLabel}</button>
            :
              props.bottomRight
              }
          </div>
          <IconButton onClick={() => {
            document.getElementsByTagName('section')[1].scrollIntoView({behavior: 'smooth'});
            if(props.onScrollButtonClick) {
              props.onScrollButtonClick();
            }
          }} aria-label="Herunterscrollen"><ExpandMoreIcon className="bounce"/></IconButton>
        </div>
      </div>
    </section>
  );
}

TopSection.propTypes = {
  bgImgName: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  bottomItems: PropTypes.arrayOf(PropTypes.exact({
    icon: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired
  })),
  bottomRight: PropTypes.node,
  ctaLabel: PropTypes.string,
  onCtaClick: PropTypes.func,
  onScrollButtonClick: PropTypes.func
};

export default TopSection;
