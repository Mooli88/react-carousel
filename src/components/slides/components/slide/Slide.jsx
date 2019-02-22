import React from 'react';
import PropTypes from 'prop-types';
import './Slide.scss';

export default function Slide(props) {
  const { context, bg } = props.content;
  // const { currentSlide } = props;

  // if (currentSlide !== id) {
  //   return null;
  // }

  return (
    <div className="slide" style={{ backgroundImage: 'url(' + bg + ')' }}>
      <p className="context">{context}</p>
    </div>
  );
}

Slide.propTypes = {
  content: PropTypes.shape({
    context: PropTypes.string,
    bg: PropTypes.string,
  }).isRequired,
};
