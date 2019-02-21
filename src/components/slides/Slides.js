import React, { Component } from 'react';
import dataService from '../../Data.service';
import Slide from './components/slide/Slide';
import './Slides.scss';
import Controllers from '../controllers/Controllers';

class Slides extends Component {
  slideTransition = {};
  playSlide = null;

  constructor() {
    super();

    this.state = {
      slides: [],
      currentSlide: 0,
      isPlaying: false
    };
  }

  getSlide(step = 1) {
    const slidesAmount = this.state.slides.length;
    return (
      (this.state.currentSlide + step + slidesAmount) % slidesAmount
    );
  }

  togglePlay = play => {
    if (this.state.isPlaying !== play) {
      this.setState({
        isPlaying: play
      });
    }

    if (!play) {
      clearTimeout(this.playSlide);
    }
  };

  nextSlide = () => {
    this.moveSlide();

    this.setState({
      currentSlide: this.getSlide()
    });
  };

  previousSlide = () => {
    this.moveSlide(this.getSlide(-1));

    this.setState({
      currentSlide: this.getSlide(-1)
    });
  };

  moveSlide(currentSlide = this.getSlide()) {
    const slideEl = document.querySelector('.slide');

    this.slideTransition = {
      transform: `translateX(-${slideEl.clientWidth *
        currentSlide}px)`
    };
  }

  play() {
    if (!this.state.isPlaying) {
      return;
    }

    const playSlide = setTimeout(() => {
      const currentSlide = this.getSlide();

      this.moveSlide(currentSlide);
      this.setState({
        currentSlide
      });

      clearTimeout(playSlide);
    }, 1800);

    this.playSlide = playSlide;
  }

  //hooks
  componentDidMount() {
    dataService.getSlides().then(slides => {
      this.setState({
        slides
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.play();
  }

  render() {
    const currentSlide = this.state.slides[this.state.currentSlide];
    const { isPlaying } = this.state;
    const { togglePlay, nextSlide, previousSlide } = this;

    return (
      <div className="slides">
        <div
          className="slides-content columns"
          style={this.slideTransition}
        >
          {this.state.slides.map(slide => {
            return (
              <div key={slide.id} className="slide column is-full">
                <Slide
                  content={slide}
                  currentSlide={currentSlide.id}
                />
              </div>
            );
          })}
        </div>
        <div className="slides-controllers">
          <Controllers
            controller={{
              isPlaying,
              togglePlay,
              nextSlide,
              previousSlide
            }}
          />
        </div>
      </div>
    );
  }
}

export default Slides;
