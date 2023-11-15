import styled, { css } from "styled-components";
import { ImLinkedin2, ImGithub } from "react-icons/im";

const StyledFooter = styled.footer`
  margin-top: 10rem;

  @media ${({ theme }) => theme.device.small} {
    margin-top: 6rem;
    background-color: var(--color-slate-200);
  }
`;

const Nav = styled.nav`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media ${({ theme }) => theme.device.small} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 2rem 6rem;
    margin: 0 auto;
  }
`;

const Ul = styled.ul`
  display: flex;
  gap: 2rem;

  ${(props) =>
    props.type === "uppercase" &&
    css`
      text-transform: uppercase;
    `}

  ${(props) =>
    props.type === "gray" &&
    css`
      color: var(--color-neutral-400);
      font-size: 1.3rem;
    `};

  @media ${({ theme }) => theme.device.medium} {
    font-size: 1.4rem;
  }

  @media ${({ theme }) => theme.device.small} {
    flex-direction: column;
    gap: 0.2rem;
    color: var(--color-slate-900);
  }
`;

const Hr = styled.hr`
  color: var(--color-neutral-300);
  width: 100%;

  @media ${({ theme }) => theme.device.small} {
    display: none;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <Nav>
        <Ul type="uppercase">
          <li>company</li>
          <li>agreement</li>
          <li>privacy policy</li>
          <li>help</li>
          <li>partnership</li>
          <li>
            <a
              href="https://www.linkedin.com/in/jeongok-olivia-lee/"
              target="_blank"
            >
              <ImLinkedin2 />
            </a>
          </li>
          <li>
            <a href="https://github.com/ok-olly/olly-closet" target="_blank">
              <ImGithub />
            </a>
          </li>
        </Ul>

        <Hr />

        <Ul type="gray">
          <li>상호명: Olivia</li>
          <li>이메일: jeongoklee0108@gmail.com</li>
          <li>대표: 이정옥</li>
          <li>개인정보책임자: Jeongok Lee</li>
        </Ul>
      </Nav>
    </StyledFooter>
  );
}

export default Footer;
