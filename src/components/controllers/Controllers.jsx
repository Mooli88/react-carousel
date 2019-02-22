import React from 'react';
import PropTypes from 'prop-types';
import './Controllers.scss';

export default function Controllers(props) {
  const { isPlaying, togglePlay, next, previous } = props.controller;

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

      <span className="icon control" onClick={previous}>
        <i className="fas fa-arrow-left" />
      </span>
      <span className="icon control" onClick={next}>
        <i className="fas fa-arrow-right" />
      </span>
    </div>
  );
}

Controllers.propTypes = {
  controller: PropTypes.shape({
    isPlaying: PropTypes.bool,
    togglePlay: PropTypes.func,
    next: PropTypes.func,
    previous: PropTypes.func,
  }).isRequired,
};
