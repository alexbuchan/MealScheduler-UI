import React from 'react';
import BackwardArrow from '../../assets/images/svg/back.svg';
import ForwardArrow from '../../assets/images/svg/next.svg';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Carousel = ({ children, settings }) => {
  const displaySlides = () => {
    if (typeof(children) === 'array') {
      return <Slide index={ 0 }>{ children }</Slide>
    } else {
      return children.map((child, index) => {
        return <Slide key={ index } index={ index }>{ child }</Slide>
      });
    }
  }
  if (children) {
    return (
      <CarouselProvider
        { ...settings }
        className='carousel-slider-provider-wrapper'
      >
        <div className='carousel-slider-provider'>
          <ButtonBack className='buttonBack'>
            <BackwardArrow className='carousel-backward-arrow'/>
          </ButtonBack>
          <Slider className='container'>
            { displaySlides() }
          </Slider>
          <ButtonNext className='buttonNext'>
            <ForwardArrow className='carousel-forward-arrow'/>
          </ButtonNext>
        </div>
        
      </CarouselProvider>
    );
  }

  return null;
}
 
export default Carousel;