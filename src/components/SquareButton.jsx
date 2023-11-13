import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border: 1px solid var(--color-slate-700);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: inherit;
  font-weight: 600;
  transition: all 0.3s ease 0s;

  background-color: ${(props) =>
    props.color === "white"
      ? css`var(--color-neutral-0)`
      : css`var(--color-slate-700)`};

  color: ${(props) =>
    props.color === "white"
      ? css`var(--color-slate-700)`
      : css`var(--color-neutral-0)`};

  &:hover {
    background-color: var(--color-slate-300);
    color: var(--color-slate-900);
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

function SquareButton({ children, onClick, color, type }) {
  return (
    <StyledButton color={color} onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
}

export default SquareButton;
