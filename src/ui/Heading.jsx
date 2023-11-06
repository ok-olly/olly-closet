import styled, { css } from "styled-components";

const Heading = styled.h1`
  // OLLY'S CLOSET
  ${(props) =>
    props.as === "h1" &&
    css`
      font-family: "Oswald", sans-serif;
      font-size: 3.5rem;
      text-transform: uppercase;
      text-align: center;
    `}

  // 여성, 남성, 마이페이지, 장바구니
  ${(props) =>
    props.as === "h2" &&
    css`
      font-weight: 600;
      font-size: 3rem;
      text-align: center;
      margin: 4rem 0;
    `}
    
    // BOTTEGA VENETA
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.8rem;
      font-weight: 500;
      text-transform: uppercase;
    `}
    
    // new season, trending
    ${(props) =>
    props.as === "h4" &&
    css`
      color: var(--color-neutral-500);
      font-size: 1.5rem;
      font-weight: 300;
    `}

    // 상세 정보, 배송 안내
    ${(props) =>
    props.as === "h5" &&
    css`
      font-weight: 400;
      text-decoration: underline;
    `}
`;

export default Heading;
