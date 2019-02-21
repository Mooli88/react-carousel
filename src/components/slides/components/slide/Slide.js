import React from 'react';
import './Slide.scss';

export default function Slide(props) {
  const { context, bg } = props.content;
  // const { currentSlide } = props;

  // if (currentSlide !== id) {
  //   return null;
  // }

  return (
    <div
      className="slide"
      style={{ backgroundImage: 'url(' + bg + ')' }}
    >
      <p className="context">{context}</p>
    </div>
  );
}
