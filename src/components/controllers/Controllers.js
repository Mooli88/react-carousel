import React from 'react';
import './Controllers.scss';

export default function Controllers(props) {
  const { isPlaying, togglePlay, nextSlide, previousSlide } = props.controller;

  return (
    <div className="controllers">
      <span
        className={'icon control ' + (isPlaying ? 'playing' : '')}
        onClick={() => togglePlay(true)}
      >
        <i className="fas fa-play" />
      </span>
      <span className="icon control" onClick={() => togglePlay(false)}>
        <i className="fas fa-pause" />
      </span>

      <span className="icon control" onClick={previousSlide}>
        <i className="fas fa-arrow-left" />
      </span>
      <span className="icon control" onClick={nextSlide}>
        <i className="fas fa-arrow-right" />
      </span>
    </div>
  );
}
