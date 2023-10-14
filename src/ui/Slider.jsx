import { useState } from "react";
import styled, { css } from "styled-components";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdOutlineCircle,
  MdCircle,
} from "react-icons/md";

const StyledSlider = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  color: var(--color-neutral-50);
`;

const ImgContainer = styled.div`
  display: flex;
  transform: translateX(${(props) => -(props.slide * 100) + "%"});
  transition: all 1s ease;
`;

const Img = styled.img`
  width: 100%;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 3.5rem;
`;

const StyledMdArrowBackIos = styled(MdArrowBackIos)`
  margin-left: 10px;
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5px;
  font-size: 1.2rem;
  position: absolute;
  bottom: 1.3rem;
`;

const images = [
  "slider/nassim-boughazi-4frKet-PJss-unsplash.jpg",
  "slider/laura-chouette-9gzSVDpyxPg-unsplash.jpg",
  "slider/tamara-bellis-IwVRO3TLjLc-unsplash.jpg",
  "slider/tamara-bellis-nOnT17lKYz8-unsplash.jpg",
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <StyledSlider>
      <ImgContainer slide={currentSlide}>
        <Img src={images[0]} />
        <Img src={images[1]} />
        <Img src={images[2]} />
        <Img src={images[3]} />
      </ImgContainer>

      <BtnContainer>
        <div
          onClick={() =>
            setCurrentSlide((s) => (s === 0 ? images.length - 1 : s - 1))
          }
        >
          <StyledMdArrowBackIos />
        </div>
        <div
          onClick={() =>
            setCurrentSlide((s) => (s === images.length - 1 ? 0 : s + 1))
          }
        >
          <MdArrowForwardIos />
        </div>
      </BtnContainer>

      <Progress>
        {currentSlide === 0 ? <MdCircle /> : <MdOutlineCircle />}
        {currentSlide === 1 ? <MdCircle /> : <MdOutlineCircle />}
        {currentSlide === 2 ? <MdCircle /> : <MdOutlineCircle />}
        {currentSlide === 3 ? <MdCircle /> : <MdOutlineCircle />}
      </Progress>
    </StyledSlider>
  );
}

export default Slider;
