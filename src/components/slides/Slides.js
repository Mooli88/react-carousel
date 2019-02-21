import React, { Component } from 'react';
import dataService from '../../Data.service';
import Slide from './components/slide/Slide';
import './Slides.scss';
import Controllers from '../controllers/Controllers';
import Pointers from '../pointers/Pointers';
class Slides extends Component {
  slideTransition = {};
  playSlide = null;

  constructor(props) {
    super(props);

    this.state = {
      slides: [],
      currentSlideIndex: 0,
      isPlaying: false,
    };
  }

  getSlideIndex(step = 1) {
    const slidesAmount = this.state.slides.length;
    return (this.state.currentSlideIndex + step + slidesAmount) % slidesAmount;
  }

  togglePlay = play => {
    if (this.state.isPlaying !== play) {
      this.setState({
        isPlaying: play,
      });
    }

    if (!play) {
      clearTimeout(this.playSlide);
    }
  };

  nextSlide = () => {
    this.moveSlide();

    this.setState({
      isPlaying: false,
      currentSlideIndex: this.getSlideIndex(),
    });
  };

  previousSlide = () => {
    this.moveSlide(this.getSlideIndex(-1));

    this.setState({
      isPlaying: false,
      currentSlideIndex: this.getSlideIndex(-1),
    });
  };

  moveSlide(currentSlideIndex = this.getSlideIndex()) {
    const slideEl = document.querySelector('.slide');

    this.slideTransition = {
      transform: `translateX(-${slideEl.clientWidth * currentSlideIndex}px)`,
    };
  }

  play() {
    if (!this.state.isPlaying) {
      return;
    }

    const playSlide = setTimeout(() => {
      const currentSlideIndex = this.getSlideIndex();

      this.moveSlide(currentSlideIndex);
      this.setState({
        currentSlideIndex,
      });

      clearTimeout(playSlide);
    }, 1800);

    this.playSlide = playSlide;
  }

  onSelectPointer = i => {
    this.setState({
      currentSlideIndex: i,
    });
    this.moveSlide(i);
  };

  //hooks
  componentDidMount() {
    dataService.getSlides().then(slides => {
      this.setState({
        slides,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.play();
  }

  render() {
    const currentSlide = this.state.slides[this.state.currentSlideIndex];
    const { isPlaying } = this.state;
    const { togglePlay, nextSlide, previousSlide } = this;

    return (
      <div className="slides">
        <div className="slides-content columns" style={this.slideTransition}>
          {this.state.slides.map(slide => {
            return (
              <div key={slide.id} className="slide column is-full">
                <Slide content={slide} currentSlide={currentSlide.id} />
              </div>
            );
          })}
        </div>
        <div className="slides-controllers absolute absolute-bottom--stretch">
          <Pointers
            pointers={{
              amount: this.state.slides.length,
              onSelect: this.onSelectPointer,
              currentPointer: this.state.currentSlideIndex,
            }}
          />

          <Controllers
            controller={{
              isPlaying,
              togglePlay,
              nextSlide,
              previousSlide,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Slides;
