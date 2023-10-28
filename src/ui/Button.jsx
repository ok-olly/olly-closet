import styled, { css } from "styled-components";

const StyledButton = styled.button`
  text-transform: uppercase;
  letter-spacing: 1.5px;

  background-color: var(--color-neutral-0);
  padding: 0.5rem 1rem;
  border-radius: 45px;
  border: none;
  transition: all 0.3s ease 0s;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.color === "green"
        ? css`var(--color-green-600)`
        : props.color === "red"
        ? css`var(--color-red-600)`
        : css`var(--color-yellow-600)`};
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    color: #fff;
    transform: translateY(-4px);
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
