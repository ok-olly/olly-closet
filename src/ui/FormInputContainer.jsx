import styled from "styled-components";

const InputContainer = styled.div`
  border-bottom: 1px solid var(--color-neutral-900);
  padding: 1rem;
  margin-bottom: 2rem;

  input {
    border: none;
    font-size: inherit;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`;

function FormInputContainer({ children }) {
  return <InputContainer>{children}</InputContainer>;
}

export default FormInputContainer;
