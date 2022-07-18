import { useState } from "react";
import { func } from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as Right } from 'assets/images/arrow_right.svg';
import { ReactComponent as Left } from 'assets/images/arrow_left.svg';
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";

const Slides = styled.div`
  position: relative;
  .left {
     left: -3%;
  }
  .right {
    right: -3%;
  }
  @media (max-width: 768px) {
    .left {
      left: 10%;
   }
   .right {
     right: 10%;
   }
  }
`;

const Arrow = styled.div`
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 50%;
  padding: 14px;
  position: absolute;
  top: 50%;
  box-shadow: 0px 1px 5px rgba(87, 85, 85, 0.24);
  z-index: 99;
  cursor: pointer;
  @media (max-width: 768px) {
    top: auto;
    bottom: -50px;
  }
`;

const Dots = styled.div`
  display: flex;
  position: absolute;
  bottom: 5%;
  left: 45%;
  div {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #C4C4C4;
    margin: 5px;
    overflow: hidden;
  }
  .active {
    background: red;
  }
  @media (max-width: 768px) {
    bottom: 2%;
    left: 40%;
  }
`;

export default function Slider({handleOnboardOff}) {
  const [current, setCurrent] = useState(0);

  const dots = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
  ];

  const length = dots.length;

  function nextSlide() {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }
  function prevSlide() {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }
  
  return (
    <Slides>
      {current > 0 &&  <Arrow className="left" onClick={prevSlide}><Left /></Arrow> }
      {current < 5 &&  <Arrow className="right" onClick={nextSlide}><Right /></Arrow>  }
     
      <>
        {current === 0 && <StepOne nextSlide={nextSlide} /> }
        {current === 1 && <StepTwo nextSlide={nextSlide} /> }
        {current === 2 && <StepThree nextSlide={nextSlide} handleOnboardOff={handleOnboardOff} /> }
        {current === 3 && <StepFour nextSlide={nextSlide} handleOnboardOff={handleOnboardOff} /> }
        {current === 4 && <StepFive nextSlide={nextSlide} handleOnboardOff={handleOnboardOff} /> }
        {current === 5 && <StepSix handleOnboardOff={handleOnboardOff} /> }
      </>
      <Dots>
        {dots.map((item) => (
          <div key={item.id} className={current === item.id ? 'active' : null}></div>
        ))}   
      </Dots>
   
    </Slides>
  );
}

Slider.propTypes = {
  handleOnboardOff: func
};