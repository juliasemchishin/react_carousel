import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselType {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselType> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}: CarouselType) => {
  const [index, setIndex] = useState(0);
  // console.log('index', index);

  const maxIndex = Math.max(0, images.length - frameSize);
  const nextIndex = Math.min(maxIndex, index + step);
  // const prevIndex = Math.max(0, index - step);
  // console.log('maxIndex', maxIndex);
  // console.log('nextIndex', nextIndex);
  // console.log('prevIndex', prevIndex);

  const nextSlide = () => {
    setIndex(prev => {
      if (maxIndex === nextIndex) {
        return prev + 1;
      }

      return prev + step;
    });
  };

  const prevSlide = () => {
    setIndex(prev => {
      if (index === 1) {
        return prev - 1;
      }

      return prev - step;
    });
  };

  return (
    <div>
      <div className="Carousel__inputs">
        <label htmlFor="itemId">Item width</label>
        <input type="number" value={itemWidth} id="itemId" />
        <label htmlFor="frameId">Frame size</label>
        <input type="number" value={frameSize} id="frameId" />
        <label htmlFor="stepId">Step</label>
        <input type="number" value={step} id="stepId" />
      </div>

      <div className="Carousel__wrapper">
        <button
          disabled={index === 0}
          type="button"
          onClick={prevSlide}
          className="button"
        >
          <img
            src="/img/right-arrow.png"
            alt=""
            className="button__arrow button__arrow__rotate"
          />
        </button>

        <div className="Carousel container__list">
          <ul
            className="Carousel__list container__list__wrapper"
            style={{
              transform: `translateX(-${index * itemWidth}px)`,
              animationDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image: string) => (
              <li key={image}>
                <img
                  width={itemWidth}
                  src={image}
                  alt=""
                  className="image carousel__item"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          disabled={index === maxIndex}
          type="button"
          onClick={nextSlide}
          data-cy="next"
          className="button"
        >
          <img src="/img/right-arrow.png" alt="" className="button__arrow" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
