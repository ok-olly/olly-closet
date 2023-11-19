import styled, { css } from "styled-components";

const StyledButton = styled.button`
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color-neutral-950);

  background-color: ${(props) =>
    props.color === "green"
      ? css`var(--color-green-100)`
      : props.color === "red"
      ? css`var(--color-red-100)`
      : css`var(--color-yellow-100)`};

  padding: 0.5rem 1rem;
  border-radius: 45px;
  border: none;
  transition: all 0.3s ease 0s;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) =>
      props.color === "green"
        ? css`var(--color-green-600)`
        : props.color === "red"
        ? css`var(--color-red-600)`
        : css`var(--color-yellow-600)`};

    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    color: var(--color-neutral-0);
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }

  @media ${({ theme }) => theme.device.medium} {
    font-size: 1.2rem;
  }
`;

function Button({ children, onClick, color, type }) {
  return (
    <StyledButton color={color} onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
}

export default Button;
