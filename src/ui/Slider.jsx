import { useEffect, useState } from "react";
import styled from "styled-components";
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
  margin-bottom: 10rem;
`;

const ImgContainer = styled.div`
  display: flex;
  transform: translateX(${(props) => -(props.$slide * 100) + "%"});
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

  div {
    cursor: pointer;
  }
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

  div {
    cursor: pointer;
  }
`;

const images = [
  "slider/nassim-boughazi-4frKet-PJss-unsplash.jpg",
  "slider/laura-chouette-9gzSVDpyxPg-unsplash.jpg",
  "slider/tamara-bellis-IwVRO3TLjLc-unsplash.jpg",
  "slider/tamara-bellis-nOnT17lKYz8-unsplash.jpg",
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  function handleClick() {
    setCurrentSlide((s) => (s === images.length - 1 ? 0 : s + 1));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleClick();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledSlider>
      <ImgContainer $slide={currentSlide}>
        {images.map((img, i) => (
          <Img src={img} key={i} />
        ))}
      </ImgContainer>

      <BtnContainer>
        <div
          onClick={() =>
            setCurrentSlide((s) => (s === 0 ? images.length - 1 : s - 1))
          }
        >
          <StyledMdArrowBackIos />
        </div>
        <div onClick={() => handleClick()}>
          <MdArrowForwardIos />
        </div>
      </BtnContainer>

      <Progress>
        {images.map((_, i) => (
          <div onClick={() => setCurrentSlide(i)} key={i}>
            {i === currentSlide ? <MdCircle /> : <MdOutlineCircle />}
          </div>
        ))}
      </Progress>
    </StyledSlider>
  );
}

export default Slider;
